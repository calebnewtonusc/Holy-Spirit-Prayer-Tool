"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Flame, { type FlameLevels, type FlameScene } from "./Flame";

/**
 * The home page story: one session, played on one device, advanced by scroll.
 * The guide's lines are from a real test conversation with the live agent
 * (2026-10-10), trimmed to fit, so the page shows the product as itself.
 */
interface Beat {
  big: string;
  small: string;
  time: string;
  status: string;
  /** What the guide is saying on the device. */
  guide?: string;
  /** What the person says back, shown as their bubble. */
  you?: string;
  /** The fire inside the device for this beat. */
  fire: FlameScene;
  /** Whose voice is moving the fire. */
  speaking: "guide" | "you" | "none";
}

const BEATS: Beat[] = [
  {
    big: "It starts with a question.",
    small:
      "The guide checks you're somewhere quiet, then asks where you are with Jesus.",
    time: "0:06",
    status: "Guide speaking",
    guide:
      "Hey, I'm glad you're here. Are you somewhere quiet where you can pray out loud for a few minutes?",
    fire: { intensity: 0.16, count: 1, x: 0, spread: 0.3 },
    speaking: "guide",
  },
  {
    big: "Then the one Erik asks everyone.",
    small:
      "If Jesus had gifts to help you, would you want them? Your yes is where it begins.",
    time: "2:14",
    status: "Guide speaking",
    guide:
      "If Jesus had gifts that would help you in your life and make you a more powerful witness for Him, would you want them?",
    you: "Yes. I would.",
    fire: { intensity: 0.24, count: 1, x: 0, spread: 0.3 },
    speaking: "guide",
  },
  {
    big: "Scripture, read slowly.",
    small:
      "Luke 11, Acts 2 and 1 Corinthians 14, out loud, with room to ask anything.",
    time: "4:40",
    status: "Guide speaking",
    guide:
      "How much more will your Father in heaven give the Holy Spirit to those who ask him. What do you notice in that?",
    fire: { intensity: 0.32, count: 1, x: 0, spread: 0.3 },
    speaking: "guide",
  },
  {
    big: "Say the fear out loud.",
    small:
      "Faking it, nothing happening, feeling weird. Each one gets a kind, honest answer.",
    time: "7:02",
    status: "Guide speaking",
    you: "What if I'm just making it up?",
    guide:
      "Caring about that shows a sincere heart. Your part is to yield. His part is the gift.",
    fire: { intensity: 0.28, count: 1, x: 0, spread: 0.3 },
    speaking: "guide",
  },
  {
    big: "You ask, one phrase at a time.",
    small:
      "A short prayer you repeat in your own voice, asking your Father for the Holy Spirit.",
    time: "10:51",
    status: "Listening",
    guide: "Jesus, I want the power of Your Holy Spirit in my life.",
    you: "Jesus, I want the power of Your Holy Spirit in my life.",
    fire: { intensity: 0.4, count: 1, x: 0, spread: 0.3 },
    speaking: "you",
  },
  {
    big: "Then the guide goes quiet.",
    small:
      "You stop praying in English and let whatever comes, come. It waits with you as long as it takes.",
    time: "12:30",
    status: "Praying",
    guide: "Keep going. The guide is waiting with you.",
    fire: { intensity: 0.72, count: 1, x: 0, spread: 0.3 },
    speaking: "you",
  },
  {
    big: "And you don't keep it to yourself.",
    small:
      "It ends with what to do tomorrow, and who you could walk through this next.",
    time: "18:44",
    status: "Session complete",
    guide: "Who are two or three people you could tell about this?",
    fire: { intensity: 0.42, count: 3, x: 0, spread: 0.22 },
    speaking: "none",
  },
];
const N_BEATS = BEATS.length;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export default function StoryScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;
    let visible = false;

    const target = () => {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      return clamp(-rect.top / Math.max(1, total));
    };

    // One followed progress value for the whole scene; reduced motion follows exactly.
    const frame = () => {
      const goal = target();
      progress.current = reduced
        ? goal
        : progress.current + (goal - progress.current) * 0.14;
      const b = Math.min(N_BEATS - 1, Math.floor(progress.current * N_BEATS));
      setBeat((prev) => (prev === b ? prev : b));
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      cancelAnimationFrame(raf);
      if (visible) {
        progress.current = target();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(section);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  // The fire blends between neighbouring beats on the same progress value.
  const getScene = useCallback((): FlameScene => {
    const p = progress.current * N_BEATS - 0.5;
    const i = Math.max(0, Math.min(N_BEATS - 1, Math.floor(p)));
    const j = Math.min(N_BEATS - 1, i + 1);
    const t = clamp(p - i);
    const a = BEATS[i].fire;
    const b = BEATS[j].fire;
    return {
      intensity: mix(a.intensity, b.intensity, t),
      count: mix(a.count, b.count, t),
      x: 0,
      spread: mix(a.spread, b.spread, t),
    };
  }, []);

  // A stand-in for a voice: a slow uneven pulse on whoever is talking.
  const beatRef = useRef(beat);
  beatRef.current = beat;
  const getLevels = useCallback((): FlameLevels => {
    const now = performance.now() / 1000;
    const pulse = clamp(
      0.28 + Math.sin(now * 5.1) * 0.16 + Math.sin(now * 8.3 + 1.3) * 0.12,
    );
    const who = BEATS[beatRef.current].speaking;
    return {
      agent: who === "guide" ? pulse : 0,
      user: who === "you" ? pulse * 1.2 : 0,
    };
  }, []);

  const current = BEATS[beat];

  return (
    <section
      ref={sectionRef}
      className="relative h-[760svh]"
      aria-label="What happens in a session"
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-4 pt-14 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 md:grid-cols-2 md:gap-10">
          <div className="order-2 md:order-1">
            <p className="font-mono text-xs tabular-nums text-smoke">
              {String(beat + 1).padStart(2, "0")} /{" "}
              {String(N_BEATS).padStart(2, "0")}
            </p>
            <div className="relative mt-4 min-h-[9rem] sm:min-h-[11rem]">
              {BEATS.map((b, i) => (
                <div
                  key={b.big}
                  aria-hidden={i !== beat}
                  className={`absolute inset-0 transition-[opacity,transform] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === beat
                      ? "translate-y-0 opacity-100"
                      : i < beat
                        ? "-translate-y-4 opacity-0"
                        : "translate-y-4 opacity-0"
                  }`}
                >
                  <h2 className="max-w-lg font-display text-[clamp(1.9rem,4.4vw,3.25rem)] font-normal leading-[1.05] tracking-[-0.03em] text-bone">
                    {b.big}
                  </h2>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ash sm:text-[17px]">
                    {b.small}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-1.5" aria-hidden="true">
              {BEATS.map((b, i) => (
                <span
                  key={b.big}
                  className="h-1 w-6 overflow-hidden rounded-full bg-bone/10"
                >
                  <span
                    className={`block h-full w-full origin-left rounded-full bg-ember-light transition-transform duration-300 ${
                      i <= beat ? "scale-x-100" : "scale-x-0"
                    } ${i < beat ? "opacity-50" : ""}`}
                  />
                </span>
              ))}
            </div>
            <p className="mt-8 hidden max-w-sm text-xs leading-relaxed text-smoke md:block">
              The guide&apos;s lines are from a real test session, shortened to
              fit.
            </p>
          </div>

          <div className="order-1 mx-auto md:order-2">
            <Device beat={current} getScene={getScene} getLevels={getLevels} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface DeviceProps {
  beat: Beat;
  getScene: () => FlameScene;
  getLevels: () => FlameLevels;
}

function Device({ beat, getScene, getLevels }: DeviceProps) {
  const praying = beat.status === "Praying";
  return (
    <div className="relative h-[min(50svh,600px)] w-[min(74vw,320px)] overflow-hidden rounded-[2.25rem] border border-bone/[0.12] bg-ink shadow-[0_40px_120px_-30px_rgb(var(--ember)/0.55),inset_0_1px_0_rgb(var(--bone)/0.06)] md:h-[min(72svh,600px)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%]">
        <Flame getScene={getScene} getLevels={getLevels} />
      </div>
      <div className="relative flex items-center justify-between px-5 pt-5">
        <span className="rounded-full border border-ember/25 bg-ember/10 px-2.5 py-0.5 text-[11px] font-medium text-ember-light">
          Guided prayer
        </span>
        <span className="font-mono text-[11px] tabular-nums text-ash">
          {beat.time}
        </span>
      </div>
      <div className="relative px-5 pt-6">
        {beat.you && (
          <p
            key={`you-${beat.time}`}
            className="ml-auto w-fit max-w-[85%] animate-fade-up rounded-lg bg-bone/[0.08] px-3.5 py-2 text-[13px] leading-snug text-bone/80"
          >
            {beat.you}
          </p>
        )}
        {beat.guide && (
          <p
            key={`guide-${beat.time}`}
            className={`mt-4 animate-fade-up font-display leading-snug [animation-delay:150ms] ${
              praying
                ? "text-[16px] text-ash"
                : "text-[17px] text-bone sm:text-[19px]"
            }`}
          >
            {beat.guide}
          </p>
        )}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2.5 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-5 pb-5 pt-12"
        aria-hidden="true"
      >
        <p className="text-[12px] font-medium text-bone/80">{beat.status}</p>
        <div className="flex gap-2">
          <span className="rounded-full border border-bone/15 bg-ink/50 px-4 py-2 text-[12px] font-medium text-bone backdrop-blur-md">
            Mute
          </span>
          <span className="rounded-full bg-bone px-4 py-2 text-[12px] font-semibold text-ink">
            End session
          </span>
        </div>
      </div>
    </div>
  );
}
