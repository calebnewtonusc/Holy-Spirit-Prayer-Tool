"use client";
import { useEffect, useState } from "react";

interface Day {
  day: number;
  title: string;
  scripture: { ref: string; text: string };
}

// The week after a session as seven stars on an arc. One day shows at a time;
// it moves on by itself every few seconds until someone picks a star.
const ADVANCE_MS = 6000;

export default function WeekStars({ days }: { days: Day[] }) {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") setActive((a) => (a + 1) % days.length);
    }, ADVANCE_MS);
    return () => clearInterval(timer);
  }, [held, days.length]);

  const pick = (i: number) => {
    setHeld(true);
    setActive(i);
  };
  const current = days[active];

  return (
    <div>
      <div className="relative mx-auto aspect-[7/2] w-full max-w-xl">
        <svg viewBox="0 0 700 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M40 170 Q350 -10 660 170" fill="none" stroke="rgb(var(--gold) / 0.25)" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
        {days.map((d, i) => {
          const t = i / (days.length - 1);
          const x = 40 + 620 * t;
          const y = 170 - 4 * 90 * t * (1 - t);
          const on = i === active;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => pick(i)}
              aria-label={`Day ${d.day}: ${d.title}`}
              aria-pressed={on}
              className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
              style={{ left: `${(x / 700) * 100}%`, top: `${(y / 200) * 100}%` }}
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  on
                    ? "h-3.5 w-3.5 bg-gold-light shadow-[0_0_24px_6px_rgb(var(--gold)/0.6)]"
                    : "h-1.5 w-1.5 bg-bone/60 group-hover:h-2.5 group-hover:w-2.5 group-hover:bg-gold-light group-focus-visible:bg-gold-light"
                }`}
              />
            </button>
          );
        })}
      </div>
      <div key={current.day} className="mx-auto mt-8 max-w-lg animate-fade-up text-center" aria-live="polite">
        <p className="font-display text-lg italic text-gold">
          Day {current.day}, {current.title}
        </p>
        <p className="mt-4 font-display text-3xl leading-snug text-bone">&ldquo;{current.scripture.text}&rdquo;</p>
        <p className="mt-3 text-xs uppercase tracking-[0.2em] text-smoke">{current.scripture.ref}</p>
      </div>
    </div>
  );
}
