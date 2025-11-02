import React, { useEffect, useRef } from "react";

/**
 * FluidGradientBackground
 * A GPU-accelerated, wave-like animated background using a WebGL fragment shader.
 * Colors: deep slate (#1C2125) and hot pink (#F84B76)
 * - Subtle motion like fabric or aurora
 * - Top-right kept relatively dark for a logo overlay
 * - Fills parent, preserves 16:9 framing nicely
 * - No dependencies beyond React
 *
 * Usage:
 * <div className="relative w-full h-screen">
 *   <FluidGradientBackground/>
 *   <div className="absolute top-4 right-4 text-white">LOGO</div>
 * </div>
 */

export default function FluidGradientBackground({ className = "", speed = 0.08 }) {
  const [webglSupported, setWebglSupported] = React.useState(true);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const startRef = useRef(performance.now());
  const glRef = useRef(null);
  const programRef = useRef(null);
  const uniformLocsRef = useRef({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Size canvas to parent
    const resize = () => {
      const parent = canvas.parentElement || document.body;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      // Render at device pixel ratio for crispness
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      const gl = glRef.current;
      if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const gl = canvas.getContext("webgl", { antialias: false, depth: false, stencil: false, premultipliedAlpha: false });
    if (!gl) {
      console.error("WebGL not supported, falling back to CSS animation");
      setWebglSupported(false);
      return;
    }
    console.log("WebGL context created successfully");
    glRef.current = gl;

    // Vertex shader (full-screen triangle)
    const vs = `
      attribute vec2 position;
      void main(){
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader
    // - Multi-octave fbm noise advected slowly over time to simulate fabric/aurora
    // - Keeps top-right darker with a vignette-like mask that preserves logo space
    const fs = `
      precision highp float;
      uniform vec2 u_res;
      uniform float u_time; // seconds

      // Palette
      const vec3 SLATE = vec3(0x1C, 0x21, 0x25) / 255.0; // #1C2125
      const vec3 BLUE  = vec3(0x1B, 0x2A, 0x5C) / 255.0; // #1B2A5C
      const vec3 PINK  = vec3(0xF8, 0x4B, 0x76) / 255.0; // #F84B76

      // 2D hash/noise helpers
      float hash(vec2 p){
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return fract(sin(p.x+p.y)*43758.5453123);
      }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
      }
      float fbm(vec2 p){
        float t = 0.0;
        float amp = 0.5;
        for(int i=0;i<5;i++){
          t += amp * noise(p);
          p *= 2.0;
          amp *= 0.55;
        }
        return t;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / u_res.xy; // 0..1
        // preserve aspect for nicer flow direction
        vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / u_res.y; // center, scale by height

        // Subtle drift fields for gentle, slow motion
        float t = u_time * 0.15; // slower global speed for subtle motion
        float n1 = fbm(p*1.2 + vec2(t*0.3, -t*0.2));
        float n2 = fbm(p*2.1 + vec2(-t*0.15, t*0.25));
        float flow = smoothstep(0.25, 0.8, n1*0.6 + n2*0.5);

        // Subtle banding to evoke gentle fabric folds
        float bands = 0.5 + 0.5*sin(6.28318*(p.y*0.35 + n1*0.15 - t*0.08));
        float intensity = mix(flow, bands, 0.3);

        // Blend palette with blue and pink
        vec3 base = SLATE;
        
        // Create a mix between blue and pink based on position and time
        float colorMix = 0.5 + 0.5 * sin(t * 0.3 + p.x * 2.0 + p.y * 1.5);
        vec3 accent = mix(BLUE, PINK, colorMix);
        
        vec3 col = mix(base, accent, intensity * 0.9);

        // Gentle vignette to keep edges calm
        float vign = smoothstep(1.2, 0.35, length(p*vec2(1.2,1.0)));
        col *= mix(0.88, 1.0, vign);

        // Keep top-right corner darker/clean for a logo
        vec2 q = uv; // 0..1
        float cornerMask = smoothstep(0.9, 0.6, length(max(vec2(0.0), q - vec2(0.8, 0.1))));
        // cornerMask ~0 near the corner -> darken
        col = mix(col*0.40, col, cornerMask);

        // Gentle bloom feeling without over-saturation
        col = pow(col, vec3(0.95));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const createShader = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, createShader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, createShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    // Full-screen triangle
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([
      -1, -1, 3, -1, -1, 3,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const u_res = gl.getUniformLocation(prog, "u_res");
    const u_time = gl.getUniformLocation(prog, "u_time");
    uniformLocsRef.current = { u_res, u_time };

    const render = () => {
      const now = performance.now();
      const tSec = (now - startRef.current) / 1000;
      const { u_res, u_time } = uniformLocsRef.current;
      gl.uniform2f(u_res, canvas.width, canvas.height);
      gl.uniform1f(u_time, tSec * speed / 0.08); // respect speed prop
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafRef.current = requestAnimationFrame(render);
    };
    
    console.log("Starting animation render loop");

    resize();
    window.addEventListener("resize", resize);
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      try { gl.deleteProgram(prog); } catch {}
    };
  }, [speed]);

  if (!webglSupported) {
    return (
      <div className={`pointer-events-none absolute inset-0 ${className}`}>
        {/* CSS Fallback Animation */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: `
              linear-gradient(
                45deg,
                #1C2125 0%,
                #2A3441 25%,
                #F84B76 50%,
                #1C2125 75%,
                #2A3441 100%
              )
            `,
            backgroundSize: '400% 400%',
            animation: 'gradientShift 8s ease-in-out infinite',
          }}
        />
        <style jsx>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {/* 16:9 framing helper so the flow looks composed on ultra-wide or tall screens */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 block w-full h-full" 
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
}
