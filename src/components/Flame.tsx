"use client";
import { useEffect, useRef } from "react";

export interface FlameLevels {
  agent: number;
  user: number;
}

interface FlameProps {
  /** Read every frame, so voice levels never cause a React render. */
  getLevels?: () => FlameLevels;
  /** Resting intensity when nobody is speaking, 0 to 1. */
  idle?: number;
  className?: string;
}

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// A rising fbm field shaped into a flame column. The agent's voice lifts and
// brightens it; the user's voice widens the base, so when someone prays the
// fire visibly answers them.
const FRAGMENT = `
precision highp float;
uniform vec2 res;
uniform float t;
uniform float agent;
uniform float user;
uniform float idle;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 0.17; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / res.y;
  vec2 q = vec2((uv.x - 0.5) * aspect, uv.y);

  float lift = idle + agent * 0.6;
  float h = 0.38 + lift * 0.75;
  float width = 0.16 + user * 0.16 + agent * 0.05;

  float speed = 0.9 + agent * 0.9;
  float n1 = fbm(vec2(q.x * 4.5, q.y * 3.2 - t * speed));
  float n2 = fbm(vec2(q.x * 10.0 + 3.1, q.y * 7.0 - t * speed * 1.8));
  float sway = (n1 - 0.5) * 0.22 * q.y;

  // Tongue shape: wide at the base, narrowing upward, torn apart by noise.
  float taper = width * (1.25 - q.y / h);
  float shape = 1.0 - abs(q.x + sway) / max(taper, 0.001);
  shape -= q.y / h * 0.85;
  shape += (n1 - 0.5) * 1.6 * (q.y + 0.1) + (n2 - 0.5) * 0.7 * (q.y + 0.2);
  float body = smoothstep(0.0, 0.35, shape);

  float glow = exp(-length(vec2(q.x * 1.3, (q.y - 0.08) * 0.9)) * (3.2 - lift * 1.6));
  float heat = clamp(body * (0.45 + n2 * 0.55) * (1.0 - q.y / h * 0.5) + glow * (0.12 + lift * 0.25), 0.0, 1.45);

  vec3 deep = vec3(0.30, 0.07, 0.02);
  vec3 ember = vec3(0.91, 0.42, 0.13);
  vec3 gold = vec3(1.0, 0.78, 0.45);
  vec3 white = vec3(1.0, 0.95, 0.86);
  vec3 col = mix(deep, ember, smoothstep(0.05, 0.55, heat));
  col = mix(col, gold, smoothstep(0.55, 0.95, heat));
  col = mix(col, white, smoothstep(1.0, 1.35, heat));

  float alpha = clamp(smoothstep(0.05, 0.4, heat) + glow * 0.25, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

export default function Flame({
  getLevels,
  idle = 0.25,
  className = "",
}: FlameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const levelsRef = useRef(getLevels);
  levelsRef.current = getLevels;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("flame shader:", gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };
    const vs = compile(gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const uRes = gl.getUniformLocation(program, "res");
    const uT = gl.getUniformLocation(program, "t");
    const uAgent = gl.getUniformLocation(program, "agent");
    const uUser = gl.getUniformLocation(program, "user");
    const uIdle = gl.getUniformLocation(program, "idle");

    // Capped at 1.5x: the field is soft, so full retina resolution costs GPU
    // on phones without making it look any sharper.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let agent = 0;
    let user = 0;
    let frame = 0;
    const start = performance.now();

    const draw = () => {
      const levels = levelsRef.current?.() ?? { agent: 0, user: 0 };
      // Rise fast, fall slow, like a fire catching and settling.
      agent += (levels.agent - agent) * (levels.agent > agent ? 0.25 : 0.04);
      user += (levels.user - user) * (levels.user > user ? 0.2 : 0.03);
      const t = reduced ? 0 : (performance.now() - start) / 1000;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uT, t);
      gl.uniform1f(uAgent, Math.min(agent, 1));
      gl.uniform1f(uUser, Math.min(user, 1));
      gl.uniform1f(uIdle, idle);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [idle]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full data-[fallback=true]:bg-[radial-gradient(40%_50%_at_50%_100%,rgb(var(--ember)/0.55),transparent_70%)] ${className}`}
    />
  );
}
