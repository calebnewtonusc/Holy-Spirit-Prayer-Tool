import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Session from "@/components/Session";

export const metadata: Metadata = {
  title: "Lead a friend | Ask for the Fire",
  description: "A voice coach for walking a friend through asking Jesus for the Holy Spirit.",
};

const CAUTIONS = [
  "Never feed them syllables or repeat sounds at them.",
  "Don't fill the silence while they pray. Give it real time.",
  "Never grade whether their experience counted.",
  "Point them to Jesus, not to you and not to an outcome.",
];

export default function GuidePage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="kicker">Leader Mode</p>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-bone sm:text-6xl">
              Walk a friend through it.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ash">
              A coach built from how Erik leads this in person. Prep with it beforehand, or keep it on speaker while you
              pray together.
            </p>
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-bone/[0.08] bg-coal/70 px-6 py-14 shadow-[0_40px_120px_-40px_rgb(var(--ember)/0.45)] sm:px-10">
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <Session mode="guide" />
            </div>
          </div>

          <div className="mt-14 rounded-3xl border border-ember/25 bg-ember/[0.06] p-7 sm:p-9">
            <p className="kicker">Four things to never do</p>
            <ul className="mt-5 space-y-3">
              {CAUTIONS.map((c) => (
                <li key={c} className="flex items-start gap-3 text-bone/90">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-center text-sm text-ash">
            Afterward, send your friend the{" "}
            <Link href="/follow-up" className="font-medium text-ember-light underline decoration-ember-light/30 underline-offset-4 transition hover:decoration-ember-light">
              7-day plan
            </Link>{" "}
            and check in on day three.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
