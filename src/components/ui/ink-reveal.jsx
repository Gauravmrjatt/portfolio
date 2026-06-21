"use client"
import { useEffect, useRef, useCallback } from "react"

export default function InkReveal({
  mode = "ink",
  maskColor = [0, 0, 0],
  inkColor = [0, 0, 0],
  brushSize = 128,
  lifetime = 600,
  rStart = 10,
  rVary = 0.25,
  stampStep = 12,
  maxStamps = 100,
  segments = 48,
  wobble = [0.06, 0.03, 0.02],
  opacity = 0.35,
  className,
  style
}) {
  const canvasRef = useRef(null)
  const stampsRef = useRef([])
  const runningRef = useRef(false)
  const lastPosRef = useRef(null)
  const dimsRef = useRef({ w: 0, h: 0 })
  const parentRef = useRef(null)
  const throttleRef = useRef(0)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    parentRef.current = parent
    if (!parent) return

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const rect = parent.getBoundingClientRect()
    const w = rect.width
    const h = rect.height
    dimsRef.current = { w, h }
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    if (mode === "reveal") {
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = `rgb(${maskColor[0]},${maskColor[1]},${maskColor[2]})`
      ctx.fillRect(0, 0, w, h)
    }
  }, [mode, maskColor])

  const paintInk = useCallback(
    (ctx, x, y, r, seed, alpha) => {
      if (mode === "reveal") {
        const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
        g.addColorStop(0, `rgba(0,0,0,${0.95 * alpha})`)
        g.addColorStop(0.5, `rgba(0,0,0,${0.88 * alpha})`)
        g.addColorStop(1, `rgba(0,0,0,${0 * alpha})`)
        ctx.fillStyle = g
      } else {
        const [r2, g, b] = inkColor
        const gd = ctx.createRadialGradient(x, y, 0, x, y, r)
        gd.addColorStop(0, `rgba(${r2},${g},${b},${0.5 * alpha})`)
        gd.addColorStop(0.5, `rgba(${r2},${g},${b},${0.25 * alpha})`)
        gd.addColorStop(1, `rgba(${r2},${g},${b},${0})`)
        ctx.fillStyle = gd
      }

      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7)
        const px = x + Math.cos(a) * r * wob
        const py = y + Math.sin(a) * r * wob
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    },
    [segments, wobble, mode, inkColor]
  )

  const addStamp = useCallback(
    (x, y) => {
      const stamps = stampsRef.current
      if (stamps.length >= maxStamps) stamps.shift()
      stamps.push({
        x, y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary)
      })
    },
    [brushSize, rVary, maxStamps]
  )

  const stampAlong = useCallback(
    (x, y) => {
      const last = lastPosRef.current
      if (!last) {
        addStamp(x, y)
      } else {
        const dx = x - last.x
        const dy = y - last.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / stampStep))
        for (let i = 1; i <= steps; i++) {
          addStamp(last.x + (dx * i) / steps, last.y + (dy * i) / steps)
        }
      }
      lastPosRef.current = { x, y }
    },
    [addStamp, stampStep]
  )

  const loop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const { w, h } = dimsRef.current
    const now = performance.now()
    const stamps = stampsRef.current

    if (mode === "reveal") {
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = `rgb(${maskColor[0]},${maskColor[1]},${maskColor[2]})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "destination-out"
    } else {
      ctx.clearRect(0, 0, w, h)
    }

    for (let i = stamps.length - 1; i >= 0; i--) {
      const t = (now - stamps[i].born) / lifetime
      if (t >= 1) {
        stamps.splice(i, 1)
        continue
      }
      const ease = 1 - Math.pow(1 - t, 3)
      const r = rStart + (stamps[i].rmax - rStart) * ease
      const a = mode === "reveal" ? (1 - t * t) : (1 - t) * opacity
      paintInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, a)
    }

    if (stamps.length) {
      requestAnimationFrame(loop)
    } else {
      runningRef.current = false
    }
  }, [paintInk, mode, maskColor, lifetime, rStart, opacity])

  const startLoop = useCallback(() => {
    if (!runningRef.current) {
      runningRef.current = true
      requestAnimationFrame(loop)
    }
  }, [loop])

  useEffect(() => {
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [resize])

  const handleMouseMove = useCallback((x, y) => {
    const now = Date.now()
    if (now - throttleRef.current < 20) return
    throttleRef.current = now
    const parent = parentRef.current
    if (!parent) return
    const rect = parent.getBoundingClientRect()
    const rx = x - rect.left
    const ry = y - rect.top
    if (rx < 0 || rx > rect.width || ry < 0 || ry > rect.height) return
    lastPosRef.current = { x: rx, y: ry }
    stampAlong(rx, ry)
    startLoop()
  }, [stampAlong, startLoop])

  useEffect(() => {
    const onMouseMove = e => handleMouseMove(e.clientX, e.clientY)
    const onTouchMove = e => {
      const t = e.touches[0]
      if (t) handleMouseMove(t.clientX, t.clientY)
    }
    const onMouseEnter = e => handleMouseMove(e.clientX, e.clientY)
    const onTouchStart = e => {
      const t = e.touches[0]
      if (t) handleMouseMove(t.clientX, t.clientY)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("touchmove", onTouchMove, { passive: true })
    document.addEventListener("mouseenter", onMouseEnter)
    document.addEventListener("touchstart", onTouchStart, { passive: true })
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("touchmove", onTouchMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("touchstart", onTouchStart)
    }
  }, [handleMouseMove])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        cursor: mode === "reveal" ? undefined : "none",
        ...style
      }}
    />
  )
}
