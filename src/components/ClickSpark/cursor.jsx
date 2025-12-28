"use client"
import React, { useState, useEffect, useRef } from "react"

export const Cursor = ({ size = 60 }) => {
  const cursorRef = useRef(null)
  const requestRef = useRef()
  const previousPos = useRef({ x: -size, y: -size }) // start off-screen

  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: -size, y: -size })
  const [isClicked, setIsClicked] = useState(false)

  // Animation loop for smooth cursor follow
  const animate = () => {
    if (!cursorRef.current) return

    const currentX = previousPos.current.x
    const currentY = previousPos.current.y
    const targetX = position.x - size / 2
    const targetY = position.y - size / 2

    const deltaX = (targetX - currentX) * 0.35
    const deltaY = (targetY - currentY) * 0.35

    const newX = currentX + deltaX
    const newY = currentY + deltaY

    previousPos.current = { x: newX, y: newY }

    // Apply scale animation on click
    const scale = isClicked ? 0.7 : 1
    cursorRef.current.style.transform = `translate(${newX}px, ${newY}px) scale(${scale})`

    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const handleMouseMove = e => {
      setVisible(true)
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => {
      setIsClicked(true)
    }

    const handleMouseUp = () => {
      setIsClicked(false)
    }

    const handleMouseEnter = () => {
      setVisible(true)
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)

    document.body.style.cursor = "none" // hide native cursor

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      )
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      )
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      document.body.style.cursor = "auto" // restore native cursor
    }
  }, [animate, isClicked])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none rounded-full bg-white mix-blend-difference z-50 transition-all duration-150"
      style={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0
      }}
      aria-hidden="true"
    />
  )
}

export default Cursor
