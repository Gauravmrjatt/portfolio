"use client";

import { useEffect, useRef, useState } from "react";
import { mat4, vec3 } from "gl-matrix";

/* ================================
   SHADERS
================================ */

const VERT = `#version 300 es
in vec3 aPosition;
in vec2 aUv;
in mat4 aInstanceMatrix;

uniform mat4 uView;
uniform mat4 uProjection;

out vec2 vUv;

void main() {
  vUv = aUv;
  gl_Position = uProjection * uView * aInstanceMatrix * vec4(aPosition, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform sampler2D uTexture;
uniform float uAlpha;

in vec2 vUv;
out vec4 outColor;

void main() {
  vec4 color = texture(uTexture, vUv);
  outColor = vec4(color.rgb, color.a * uAlpha);
}
`;

/* ================================
   HELPERS
================================ */

function shader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw gl.getShaderInfoLog(s);
  return s;
}

function program(gl, v, f) {
  const p = gl.createProgram();
  gl.attachShader(p, shader(gl, gl.VERTEX_SHADER, v));
  gl.attachShader(p, shader(gl, gl.FRAGMENT_SHADER, f));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw gl.getProgramInfoLog(p);
  return p;
}

/* ================================
   GEOMETRY
================================ */

function createCardGeometry(gl) {
  const vertices = new Float32Array([
    -0.6, -0.8, 0,  0, 0,
     0.6, -0.8, 0,  1, 0,
     0.6,  0.8, 0,  1, 1,
    -0.6,  0.8, 0,  0, 1,
  ]);

  const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 20, 0);

  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 20, 12);

  const ebo = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ebo);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

  return { vao, count: indices.length };
}

/* ================================
   MAIN COMPONENT
================================ */

export default function InfiniteCardMenu({ items }) {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const DPR = Math.min(2, window.devicePixelRatio);
    canvas.width = canvas.clientWidth * DPR;
    canvas.height = canvas.clientHeight * DPR;
    gl.viewport(0, 0, canvas.width, canvas.height);

    const prog = program(gl, VERT, FRAG);
    gl.useProgram(prog);

    const geo = createCardGeometry(gl);

    const view = mat4.create();
    const proj = mat4.create();
    mat4.lookAt(view, [0, 0, 6], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(proj, Math.PI / 4, canvas.width / canvas.height, 0.1, 100);

    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "uView"), false, view);
    gl.uniformMatrix4fv(gl.getUniformLocation(prog, "uProjection"), false, proj);

    /* TEXTURE ATLAS (simple) */
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = items[0].image;
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    };

    const matrices = items.map((_, i) => {
      const m = mat4.create();
      mat4.translate(m, m, [0, (i - active) * 2.2, 0]);
      return m;
    });

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(matrices.flat()), gl.DYNAMIC_DRAW);

    for (let i = 0; i < 4; i++) {
      gl.enableVertexAttribArray(2 + i);
      gl.vertexAttribPointer(2 + i, 4, gl.FLOAT, false, 64, i * 16);
      gl.vertexAttribDivisor(2 + i, 1);
    }

    function render() {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.bindVertexArray(geo.vao);
      gl.drawElementsInstanced(gl.TRIANGLES, geo.count, gl.UNSIGNED_SHORT, 0, items.length);
      requestAnimationFrame(render);
    }

    render();
  }, [items, active]);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* UI Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-3 h-3 rounded-full ${i === active ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
