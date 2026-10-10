"use client";
import { useCallback, useEffect, useRef } from "react";
import Flame, { type FlameScene } from "./Flame";

interface Stop extends FlameScene {
  /** Page y, in px, where this chapter's scene is fully in effect. */
  at: number;
}

const read = (el: HTMLElement, key: string, fallback: number) => {
  const value = Number(el.dataset[key]);
  return Number.isFinite(value) ? value : fallback;
};

/**
 * One fire behind the whole page. Each chapter marked with data-flame-* says
 * what the fire should be while it's on screen, and scrolling blends between
 * neighbours, so the story is told by one object changing state.
 */
export default function StoryFlame() {
  const stops = useRef<Stop[]>([]);
  const narrow = useRef(false);

  useEffect(() => {
    const measure = () => {
      narrow.current = window.innerWidth < 768;
      stops.current = Array.from(
        document.querySelectorAll<HTMLElement>("[data-flame]"),
      ).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          at: rect.top + window.scrollY + rect.height / 2,
          intensity: read(el, "flameIntensity", 0.25),
          count: read(el, "flameCount", 1),
          x: read(el, "flameX", 0),
          spread: read(el, "flameSpread", 0.3),
        };
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const getScene = useCallback((): FlameScene => {
    const list = stops.current;
    if (!list.length) return { intensity: 0.2, count: 1, x: 0, spread: 0.3 };
    const y = window.scrollY + window.innerHeight / 2;
    let scene: FlameScene = list[0];
    if (y >= list[list.length - 1].at) scene = list[list.length - 1];
    for (let i = 0; i < list.length - 1; i++) {
      const a = list[i];
      const b = list[i + 1];
      if (y >= a.at && y < b.at) {
        const raw = (y - a.at) / (b.at - a.at);
        const t = raw * raw * (3 - 2 * raw);
        scene = {
          intensity: a.intensity + (b.intensity - a.intensity) * t,
          count: a.count + (b.count - a.count) * t,
          x: a.x + (b.x - a.x) * t,
          spread: a.spread + (b.spread - a.spread) * t,
        };
        break;
      }
    }
    // On a phone the text sits right over the fire, so it stays centred, lower
    // and closer together.
    if (narrow.current) {
      return {
        ...scene,
        x: 0,
        intensity: scene.intensity * 0.75,
        spread: scene.spread * 0.55,
      };
    }
    return scene;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[62svh] md:h-[72svh]"
    >
      <Flame getScene={getScene} ignite={2.2} />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}
