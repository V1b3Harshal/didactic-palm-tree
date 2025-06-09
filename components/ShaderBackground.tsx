// components/ShaderBackground.tsx
"use client";

import React, { useRef, useEffect } from "react";

type ShaderBackgroundProps = {
  onReady?: () => void;
};

export const ShaderBackground: React.FC<ShaderBackgroundProps> = ({
  onReady,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vertex shader (WebGL2 / GLSL ES 3.00)
  const vsSource = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

  // Full fragment shader with linesPerGroup = 8
  const fsSource = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
out vec4 fragColor;

const float overallSpeed     = 0.3;
const float gridSmoothWidth  = 0.015;
const float scale            = 5.0;
const float lineSpeed        = 1.2 * overallSpeed;
const float lineAmplitude    = 0.8;
const float lineFrequency    = 0.25;
const float warpSpeed        = 0.25 * overallSpeed;
const float warpFrequency    = 0.4;
const float warpAmplitude    = 0.8;
const float offsetFrequency  = 0.6;
const float offsetSpeed      = 1.1 * overallSpeed;
const float minOffsetSpread  = 0.5;
const float maxOffsetSpread  = 1.8;
const int   linesPerGroup    = 8;

#define drawSmoothLine(pos, halfW, t) smoothstep(halfW, 0.0, abs(pos - (t)))
#define drawCrispLine(pos, halfW, t)  smoothstep(halfW + gridSmoothWidth, halfW, abs(pos - (t)))

float random(float t) {
  return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
}

float getPlasmaY(float x, float fade, float offset) {
  return random(x * lineFrequency + uTime * lineSpeed) * fade * lineAmplitude + offset;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 uv = fragCoord / uResolution;
  vec2 space = (fragCoord - uResolution * 0.5) / uResolution.x * 2.0 * scale;

  float horizontalFade = 1.0 - (cos(uv.x * 6.28318) * 0.5 + 0.5);

  // Warp distortion
  space.y += random(space.x * warpFrequency + uTime * warpSpeed)
             * warpAmplitude * (0.5 + horizontalFade);
  space.x += random(space.y * warpFrequency + uTime * warpSpeed + 2.0)
             * warpAmplitude * horizontalFade;

  vec4 lines = vec4(0.0);

  for (int l = 0; l < linesPerGroup; l++) {
    float normIndex  = float(l) / float(linesPerGroup);
    float offsetTime = uTime * offsetSpeed;
    float offsetPos  = float(l) + space.x * offsetFrequency;
    float randBase   = random(offsetPos + offsetTime) * 0.5 + 0.5;

    float halfW = mix(0.01, 0.15, randBase * horizontalFade) * 0.5;
    float offset = random(offsetPos + offsetTime * (1.0 + normIndex))
                   * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);

    float linePos = getPlasmaY(space.x, horizontalFade, offset);
    float thick   = drawSmoothLine(linePos, halfW, space.y) / 3.0;
    float crisp   = drawCrispLine(linePos, halfW * 0.2, space.y);
    float baseLine= thick + crisp;

    float dist  = abs(space.y - linePos);
    float glowR = halfW * 4.0;
    float glow  = clamp((glowR - dist) / glowR, 0.0, 1.0);
    glow = pow(glow, 1.5);

    // cycle color per line
    vec4 col;
    float m = mod(float(l), 3.0);
    if (m < 0.5) {
      col = vec4(1.0, 0.2, 0.5, 1.0);
    } else if (m < 1.5) {
      col = vec4(0.2, 0.8, 1.0, 1.0);
    } else {
      col = vec4(0.7, 0.2, 1.0, 1.0);
    }

    lines += baseLine * col * randBase * 0.8;
    lines += glow     * col * randBase * 0.4;
  }

  fragColor = lines;
}
`;

  // compile a shader of given type
  const loadShader = (
    gl: WebGL2RenderingContext,
    type: number,
    source: string
  ): WebGLShader => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Shader compile error");
    }
    return shader;
  };

  // link vertex + fragment into a program
  const initShaderProgram = (
    gl: WebGL2RenderingContext,
    vs: string,
    fs: string
  ): WebGLProgram => {
    const vShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    const program = gl.createProgram()!;
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Program link error");
    }
    return program;
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.warn("WebGL2 not supported, skipping shader");
      onReady?.();
      return;
    }

    // initialize shader program
    const program = initShaderProgram(gl, vsSource, fsSource);
    const locs = {
      position:    gl.getAttribLocation(program, "aPosition"),
      resolution:  gl.getUniformLocation(program, "uResolution")!,
      time:        gl.getUniformLocation(program, "uTime")!,
    };

    // set up VAO for a full-screen quad
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(locs.position);
    gl.vertexAttribPointer(locs.position, 2, gl.FLOAT, false, 0, 0);
    gl.bindVertexArray(null);

    // handle resize with DPR clamp
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    // pause when off-screen
    let isVisible = true;
    const obs = new IntersectionObserver(entries => {
      isVisible = entries[0]?.isIntersecting ?? true;
    });
    obs.observe(canvas);

    // render loop at 30 FPS, and call onReady after ~1s
    const targetFPS = 30;
    let then = performance.now();
    const start = performance.now();
    let readyCalled = false;
    let rafId: number;

    const renderFrame = () => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(locs.resolution, canvas.width, canvas.height);
      gl.uniform1f(locs.time, (performance.now() - start) / 1000);
      gl.bindVertexArray(vao);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      const delta = now - then;
      if (delta < 1000 / targetFPS) return;
      then = now - (delta % (1000 / targetFPS));

      if (!isVisible) return;
      renderFrame();

      if (!readyCalled && now - start > 1000) {
        readyCalled = true;
        onReady?.();
      }
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      obs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [onReady]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
};
