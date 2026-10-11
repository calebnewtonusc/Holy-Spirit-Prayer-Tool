import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Session from "@/components/Session";
import Halo from "@/components/Halo";

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
      <main className="overflow-x-clip px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="kicker">Leader Mode</p>
            <h1 className="mt-5 font-display text-5xl font-normal tracking-[-0.01em] text-bone sm:text-6xl">
              Walk a friend through it.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ash">
              A coach built from how Erik leads this in person. Prep with it beforehand, or keep it on speaker while you
              pray together.
            </p>
          </div>

          <div className="relative isolate mt-10 px-2 py-24 sm:py-28">
            <Halo className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(112vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-35" />
            <div className="relative">
              <Session mode="guide" />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="kicker">While they pray</p>
            <ol className="mt-8 divide-y divide-bone/[0.07] border-y border-bone/[0.07] text-left">
              {CAUTIONS.map((c, i) => (
                <li key={c} className="flex gap-6 py-5 font-display text-xl leading-snug text-bone/90">
                  <span className="w-6 shrink-0 italic text-gold">{i + 1}</span>
                  {c}
                </li>
              ))}
            </ol>
          </div>

          <p className="mt-10 text-center text-sm text-ash">
            Afterward, send your friend the{" "}
            <Link href="/follow-up" className="font-medium text-gold-light underline decoration-gold-light/30 underline-offset-4 transition hover:decoration-gold-light">
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
