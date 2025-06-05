// components/ShaderBackground.tsx
import React, { useEffect, useRef } from "react";

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vertex shader: draws a full‐screen quad
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader: only glowing, moving lines on a transparent background
  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    // Speed / scale constants
    const float overallSpeed    = 0.3;
    const float gridSmoothWidth = 0.015;
    const float scale          = 5.0;
    const float lineSpeed      = 1.2 * overallSpeed;
    const float lineAmplitude  = 0.8;
    const float lineFrequency  = 0.25;
    const float warpSpeed      = 0.25 * overallSpeed;
    const float warpFrequency  = 0.4;
    const float warpAmplitude  = 0.8;
    const float offsetFrequency = 0.6;
    const float offsetSpeed     = 1.1 * overallSpeed;
    const float minOffsetSpread = 0.5;
    const float maxOffsetSpread = 1.8;
    const int   linesPerGroup   = 12;

    // Helpers to draw smooth/crisp line segments
    #define drawSmoothLine(pos, halfW, t) \
      smoothstep(halfW, 0.0, abs(pos - (t)))

    #define drawCrispLine(pos, halfW, t) \
      smoothstep(halfW + gridSmoothWidth, halfW, abs(pos - (t)))

    // Simple pseudo‐random function
    float random(float t) {
      return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
    }

    // Compute a wavy “plasma” Y‐position for each line
    float getPlasmaY(float x, float fade, float offset) {
      return random(x * lineFrequency + iTime * lineSpeed)
             * fade * lineAmplitude
             + offset;
    }

    void main() {
      vec2 fragCoord = gl_FragCoord.xy;
      vec2 uv        = fragCoord.xy / iResolution.xy;
      // Map pixel to “space” for the waves
      vec2 space = (fragCoord - iResolution.xy / 2.0)
                   / iResolution.x * 2.0 * scale;

      // Horizontal fade factor (stronger in middle, fades toward edges)
      float horizontalFade = 1.0 - (cos(uv.x * 6.28318) * 0.5 + 0.5);

      // Warp the grid over time
      space.y += random(space.x * warpFrequency + iTime * warpSpeed)
                 * warpAmplitude * (0.5 + horizontalFade);
      space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0)
                 * warpAmplitude * horizontalFade;


      vec4 lines = vec4(0.0);

      for (int l = 0; l < linesPerGroup; l++) {
        float normIndex  = float(l) / float(linesPerGroup);
        float offsetTime = iTime * offsetSpeed;
        float offsetPos  = float(l) + space.x * offsetFrequency;
        float randBase   = random(offsetPos + offsetTime) * 0.5 + 0.5;

        // Choose half‐width between 0.01 and 0.15 based on randomness & fade
        float halfW = mix(0.01, 0.15, randBase * horizontalFade) * 0.5;

        // Each line has its own vertical offset
        float offset = random(offsetPos + offsetTime * (1.0 + normIndex))
                       * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);

        // Determine Y‐position of the line
        float linePos = getPlasmaY(space.x, horizontalFade, offset);

        // Draw the smooth “thick” stripe and a small crisp center line
        float thick  = drawSmoothLine(linePos, halfW, space.y) / 3.0;
        float crisp  = drawCrispLine(linePos, halfW * 0.2, space.y);
        float baseLine = thick + crisp;

        // Glow calculation: a soft gradient around the line
        float dist     = abs(space.y - linePos);
        float glowR    = halfW * 4.0;
        float glow     = clamp((glowR - dist) / glowR, 0.0, 1.0);
        glow = pow(glow, 1.5);

        // Pick a neon‐style color variant (pink, cyan, or purple)
        vec4 col;
        float m = mod(float(l), 3.0);
        if (m < 0.5) {
          col = vec4(1.0, 0.2, 0.5, 1.0);  // bright pink
        } else if (m < 1.5) {
          col = vec4(0.2, 0.8, 1.0, 1.0);  // cyan‐blue
        } else {
          col = vec4(0.7, 0.2, 1.0, 1.0);  // purple
        }

        // Accumulate the main line (stronger alpha)…
        lines += baseLine * col * randBase * 0.8;
        // …plus the glow ring (softer alpha)
        lines += glow     * col * randBase * 0.4;
      }

      // Output just the lines (alpha may be <1 where nothing is drawn)
      gl_FragColor = lines;
    }
  `;

  // Compile a shader (vertex or fragment)
  const loadShader = (
    gl: WebGLRenderingContext,
    type: number,
    source: string
  ): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  // Link vertex + fragment into a WebGL program
  const initShaderProgram = (
    gl: WebGLRenderingContext,
    vs: string,
    fs: string
  ): WebGLProgram | null => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported.");
      return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    // Create a buffer for the full‐screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, "iResolution"),
        time: gl.getUniformLocation(shaderProgram, "iTime"),
      },
    };

    // Resize canvas to fill the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let startTime = Date.now();
    let animationId: number;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      // Clear with fully transparent background
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      // Upload uniforms
      gl.uniform2f(
        programInfo.uniformLocations.resolution,
        canvas.width,
        canvas.height
      );
      gl.uniform1f(programInfo.uniformLocations.time, currentTime);

      // Bind the vertex buffer
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      // Draw the full‐screen quad (two triangles)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
};

export default ShaderBackground;
