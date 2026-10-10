"use client";
import { useEffect, useRef, useState } from "react";

export interface FlameLevels {
  agent: number;
  user: number;
}

/** Where the fire is in the story. Every field is eased toward, never jumped. */
export interface FlameScene {
  /** Overall size and brightness, 0 (a spark) to 1 (full). */
  intensity: number;
  /** How many tongues, 1 to 7. Fractional values grow the newest one in. */
  count: number;
  /** Horizontal centre, -0.5 (left edge) to 0.5 (right edge). */
  x: number;
  /** How far apart the tongues sit, as a fraction of the screen height. */
  spread: number;
}

interface FlameProps {
  /** Read every frame, so voice levels never cause a React render. */
  getLevels?: () => FlameLevels;
  /** Read every frame; the scroll story drives this on the landing page. */
  getScene?: () => FlameScene;
  /** A fixed scene, for server-rendered pages that can't pass a function. */
  scene?: FlameScene;
  /** Resting intensity when there is no scene and nobody is speaking. */
  idle?: number;
  /** Seconds for the spark to catch on first paint. 0 skips the intro. */
  ignite?: number;
  className?: string;
}

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// One shared fbm field, sampled once per pixel, then shaped into up to seven
// tongues. Sampling the noise per tongue would cost 7x on phones for no
// visible difference, since neighbouring tongues are far apart.
const FRAGMENT = `
precision highp float;
uniform vec2 res;
uniform float t;
uniform float agent;
uniform float user;
uniform float intensity;
uniform float count;
uniform float cx;
uniform float spread;

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

float tongue(vec2 q, float h, float width, float n1, float n2) {
  float sway = (n1 - 0.5) * 0.22 * q.y;
  float taper = width * (1.25 - q.y / h);
  float shape = 1.0 - abs(q.x + sway) / max(taper, 0.001);
  shape -= q.y / h * 0.85;
  shape += (n1 - 0.5) * 1.6 * (q.y + 0.1) + (n2 - 0.5) * 0.7 * (q.y + 0.2);
  return smoothstep(0.0, 0.35, shape);
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / res.y;
  vec2 q = vec2((uv.x - 0.5 - cx) * aspect, uv.y);

  float lift = intensity + agent * 0.6;
  float speed = 0.9 + agent * 0.9;
  float n1 = fbm(vec2(q.x * 4.5, q.y * 3.2 - t * speed));
  float n2 = fbm(vec2(q.x * 10.0 + 3.1, q.y * 7.0 - t * speed * 1.8));

  float body = 0.0;
  float glow = 0.0;
  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    float present = clamp(count - fi, 0.0, 1.0);
    if (present <= 0.0) break;
    // Centre-out order 0, +1, -1, +2, -2 ..., so new tongues appear at the edges.
    float side = mod(fi, 2.0) < 0.5 ? -1.0 : 1.0;
    float slot = ceil(fi / 2.0) * side;
    float centre = slot * spread;
    float scale = i == 0 ? 1.0 : mix(0.6, 0.85, hash(vec2(fi, 3.0)));
    float h = (0.38 + lift * 0.75) * scale * present;
    float width = (0.16 + user * 0.16 + agent * 0.05) * (i == 0 ? 1.0 : 0.72);
    vec2 local = vec2(q.x - centre, q.y);
    body = max(body, tongue(local, max(h, 0.001), width, n1, n2) * present);
    glow += exp(-length(vec2(local.x * 1.3, (local.y - 0.08) * 0.9)) * (3.2 - lift * 1.6)) * present * scale;
  }
  glow = min(glow, 1.4);

  float heat = clamp(body * (0.45 + n2 * 0.55) * (1.0 - q.y * 0.5) + glow * (0.12 + lift * 0.25), 0.0, 1.45);
  heat *= smoothstep(0.0, 0.08, intensity + agent);

  vec3 deep = vec3(0.30, 0.07, 0.02);
  vec3 ember = vec3(0.91, 0.42, 0.13);
  vec3 gold = vec3(1.0, 0.78, 0.45);
  vec3 white = vec3(1.0, 0.95, 0.86);
  vec3 col = mix(deep, ember, smoothstep(0.05, 0.55, heat));
  col = mix(col, gold, smoothstep(0.55, 0.95, heat));
  col = mix(col, white, smoothstep(1.0, 1.35, heat));

  float alpha = clamp(smoothstep(0.05, 0.4, heat) + glow * 0.25 * intensity, 0.0, 1.0);
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

const DEFAULT_SCENE: FlameScene = {
  intensity: 0.25,
  count: 1,
  x: 0,
  spread: 0.3,
};

export default function Flame({
  getLevels,
  getScene,
  scene,
  idle = 0.25,
  ignite = 0,
  className = "",
}: FlameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // A canvas whose WebGL never started paints white on some browsers, so a
  // failed start swaps in a plain glow instead (seen headless, 2026-10-10).
  const [failed, setFailed] = useState(false);
  const levelsRef = useRef(getLevels);
  const sceneRef = useRef(getScene);
  levelsRef.current = getLevels;
  sceneRef.current = getScene ?? (scene ? () => scene : undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) {
      setFailed(true);
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
    if (!vs || !fs || !program) {
      setFailed(true);
      return;
    }
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

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uniforms = {
      res: u("res"),
      t: u("t"),
      agent: u("agent"),
      user: u("user"),
      intensity: u("intensity"),
      count: u("count"),
      cx: u("cx"),
      spread: u("spread"),
    };

    // Capped at 1.5x: the field is soft, so full retina resolution costs GPU
    // on phones without making it look any sharper.
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const igniting = ignite > 0 && !reduced;
    let agent = 0;
    let user = 0;
    const first = sceneRef.current?.() ?? { ...DEFAULT_SCENE, intensity: idle };
    const eased: FlameScene = {
      ...first,
      intensity: igniting ? 0 : first.intensity,
    };
    let frame = 0;
    let visible = true;
    const start = performance.now();

    const draw = () => {
      const elapsed = (performance.now() - start) / 1000;
      const levels = levelsRef.current?.() ?? { agent: 0, user: 0 };
      const target = sceneRef.current?.() ?? {
        ...DEFAULT_SCENE,
        intensity: idle,
      };

      // The spark catching: intensity sits under a rising ceiling for the
      // first `ignite` seconds, so the page opens on an ember, not a bonfire.
      const ceiling = igniting
        ? Math.min(1, Math.pow(elapsed / ignite, 1.6))
        : 1;

      // Rise fast, fall slow, like a fire catching and settling.
      agent += (levels.agent - agent) * (levels.agent > agent ? 0.25 : 0.04);
      user += (levels.user - user) * (levels.user > user ? 0.2 : 0.03);
      const k = reduced ? 1 : 0.06;
      eased.intensity +=
        (Math.min(target.intensity, ceiling) - eased.intensity) * k;
      eased.count += (target.count - eased.count) * (reduced ? 1 : 0.045);
      eased.x += (target.x - eased.x) * k;
      eased.spread += (target.spread - eased.spread) * k;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uniforms.res, canvas.width, canvas.height);
      gl.uniform1f(uniforms.t, reduced ? 4 : elapsed);
      gl.uniform1f(uniforms.agent, Math.min(agent, 1));
      gl.uniform1f(uniforms.user, Math.min(user, 1));
      gl.uniform1f(uniforms.intensity, eased.intensity);
      gl.uniform1f(uniforms.count, Math.max(1, Math.min(7, eased.count)));
      gl.uniform1f(uniforms.cx, eased.x);
      gl.uniform1f(uniforms.spread, eased.spread);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced && visible) frame = requestAnimationFrame(draw);
    };

    // Off screen, the loop stops; it restarts when the canvas comes back.
    const io = new IntersectionObserver(([entry]) => {
      const now = entry?.isIntersecting ?? true;
      if (now && !visible && !reduced) frame = requestAnimationFrame(draw);
      visible = now;
    });
    io.observe(canvas);
    draw();

    // Reduced motion draws one still frame per scroll instead of a loop.
    const onScroll = () => {
      if (reduced) requestAnimationFrame(draw);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [idle, ignite]);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={`h-full w-full animate-breathe bg-[radial-gradient(38%_55%_at_50%_100%,rgb(var(--ember)/0.6),rgb(var(--ember-deep)/0.25)_55%,transparent_75%)] ${className}`}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
    />
  );
}
