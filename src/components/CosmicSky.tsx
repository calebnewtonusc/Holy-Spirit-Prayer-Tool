"use client";
import { useEffect, useRef } from "react";

// The Christ Cosmic night behind every page: a star field turning slowly
// around a pole above the screen, the Milky Way band from the booklet cover,
// and now and then a shooting star. It sits under the fire (z -10).
//
// Star count scales with screen area and caps at 1400, and the canvas renders
// at most 1.5x device pixels: a phone at 3x pushed the frame over budget.
const MAX_STARS = 1400;
const AREA_PER_STAR = 1100;
const MAX_DPR = 1.5;
// One full turn of the sky in this many seconds. Slow enough to read as
// stillness, fast enough to notice after a minute of prayer.
const TURN_SECONDS = 1800;

interface Star {
  r: number;
  a: number;
  size: number;
  depth: number;
  phase: number;
  speed: number;
  hue: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

function makeStars(radius: number, count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const depth = Math.random();
    stars.push({
      r: Math.sqrt(Math.random()) * radius,
      a: Math.random() * Math.PI * 2,
      size: 0.35 + depth * depth * 1.5,
      depth,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 1.4,
      hue: Math.random(),
    });
  }
  return stars;
}

// The band is painted once to its own canvas, then turned with the stars.
// Soft glows are drawn as squashed circles so their edges fall to zero; an
// ellipse clipped out of a round gradient left hard fog-shaped seams.
function makeBand(size: number): HTMLCanvasElement {
  const band = document.createElement("canvas");
  band.width = size;
  band.height = size;
  const g = band.getContext("2d");
  if (!g) return band;
  const c = size / 2;
  g.translate(c, c);
  g.rotate(-0.55);
  g.globalCompositeOperation = "lighter";
  const glows: [number, number, string][] = [
    [-0.36, 0.2, "110 80 210"],
    [-0.12, 0.24, "190 90 200"],
    [0.14, 0.2, "80 110 220"],
    [0.38, 0.18, "220 140 110"],
  ];
  for (const [x, r, rgb] of glows) {
    g.save();
    g.translate(x * size, 0);
    g.scale(1, 0.22);
    const grad = g.createRadialGradient(0, 0, 0, 0, 0, r * size);
    grad.addColorStop(0, `rgb(${rgb} / 0.09)`);
    grad.addColorStop(1, `rgb(${rgb} / 0)`);
    g.fillStyle = grad;
    g.beginPath();
    g.arc(0, 0, r * size, 0, Math.PI * 2);
    g.fill();
    g.restore();
  }
  const gauss = () => (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
  for (let i = 0; i < 9000; i++) {
    const t = Math.random() - 0.5;
    const along = t * size * 1.15;
    const across = gauss() * size * 0.055 * (1 - Math.abs(t));
    const hue = t < -0.15 ? "200 170 255" : t < 0.1 ? "255 190 235" : t < 0.3 ? "180 200 255" : "255 220 190";
    const big = Math.random() < 0.04;
    g.fillStyle = `rgb(${hue} / ${big ? 0.5 : 0.08 + Math.random() * 0.28})`;
    const d = big ? 1.6 : 0.7 + Math.random() * 0.6;
    g.fillRect(along, across, d, d);
  }
  return band;
}

export default function CosmicSky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let radius = 0;
    let stars: Star[] = [];
    let band: HTMLCanvasElement | null = null;
    let meteor: Meteor | null = null;
    let nextMeteor = 6;
    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const widthChanged = window.innerWidth !== w;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      // iOS resizes the viewport as the address bar slides; reseeding then
      // would make the whole sky jump mid-scroll.
      if (!widthChanged && stars.length) return;
      radius = Math.hypot(w, h * 1.4);
      stars = makeStars(
        radius,
        Math.min(MAX_STARS, Math.round((w * h) / AREA_PER_STAR) + 200),
      );
      band = makeBand(Math.round(radius * 1.6));
    };

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      elapsed += dt;
      const turn = reduced ? 0 : (elapsed / TURN_SECONDS) * Math.PI * 2;
      const scroll = window.scrollY;
      const px = w * 0.5;
      const py = -h * 0.35;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (band) {
        ctx.save();
        ctx.translate(px, py - scroll * 0.02);
        ctx.rotate(turn + 0.9);
        ctx.globalAlpha = 0.85;
        ctx.drawImage(band, -band.width / 2, -band.height / 2 + radius * 0.45);
        ctx.restore();
      }

      for (const s of stars) {
        const a = s.a + turn;
        const x = px + Math.cos(a) * s.r;
        const y = py + Math.sin(a) * s.r - scroll * (0.01 + s.depth * 0.05);
        if (x < -4 || x > w + 4 || y < -4 || y > h + 4) continue;
        const tw = reduced
          ? 0.8
          : 0.55 + 0.45 * Math.sin(elapsed * s.speed + s.phase);
        const alpha = (0.25 + s.depth * 0.75) * tw;
        ctx.fillStyle =
          s.hue < 0.12
            ? `rgb(255 214 160 / ${alpha})`
            : s.hue < 0.24
              ? `rgb(190 205 255 / ${alpha})`
              : `rgb(255 255 255 / ${alpha})`;
        if (s.size > 1.3) {
          ctx.beginPath();
          ctx.arc(x, y, s.size * 0.7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgb(255 240 220 / ${alpha * 0.12})`;
          ctx.beginPath();
          ctx.arc(x, y, s.size * 2.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, s.size, s.size);
        }
      }

      if (!reduced) {
        nextMeteor -= dt;
        if (!meteor && nextMeteor <= 0) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          meteor = {
            x: w * (0.2 + Math.random() * 0.6),
            y: h * Math.random() * 0.35,
            vx: dir * (420 + Math.random() * 260),
            vy: 160 + Math.random() * 120,
            life: 1,
          };
          nextMeteor = 9 + Math.random() * 16;
        }
        if (meteor) {
          const m = meteor;
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          m.life -= dt * 1.1;
          const tail = ctx.createLinearGradient(
            m.x,
            m.y,
            m.x - m.vx * 0.22,
            m.y - m.vy * 0.22,
          );
          tail.addColorStop(
            0,
            `rgb(255 236 200 / ${Math.max(m.life, 0) * 0.9})`,
          );
          tail.addColorStop(1, "rgb(255 236 200 / 0)");
          ctx.strokeStyle = tail;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(m.x - m.vx * 0.22, m.y - m.vy * 0.22);
          ctx.stroke();
          if (m.life <= 0) meteor = null;
        }
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (document.visibilityState === "visible") {
        last = performance.now();
        raf = requestAnimationFrame(draw);
      }
    };
    const onResize = () => {
      resize();
      if (reduced) draw(performance.now());
    };
    const onScroll = () => {
      if (reduced) draw(performance.now());
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-20 h-full w-full"
    />
  );
}
