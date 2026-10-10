import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { fears } from "@/data/content";

export const metadata: Metadata = {
  title: "Questions | Ask for the Fire",
  description: "The questions people ask Erik Fish most before asking for the Holy Spirit, answered plainly.",
};

export default function QuestionsPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 pb-28 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-2xl">
          <p className="kicker">Nervous is normal</p>
          <h1 className="mt-6 font-display text-5xl font-normal tracking-[-0.03em] text-bone sm:text-6xl">
            The questions people ask first.
          </h1>
          <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ash">
            These are the ones Erik hears most. The guide answers them in the moment too, so ask it anything.
          </p>
          <div className="mt-14 divide-y divide-bone/[0.08] border-y border-bone/[0.08]">
            {fears.map((fear) => (
              <details key={fear.question} className="group">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-lg text-bone transition hover:text-ember-light [&::-webkit-details-marker]:hidden">
                  {fear.question}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-bone/15 text-ash transition-transform duration-300 group-open:rotate-45 group-hover:border-ember-light group-hover:text-ember-light">
                    +
                  </span>
                </summary>
                <p className="max-w-xl pb-6 leading-relaxed text-ash">{fear.response}</p>
              </details>
            ))}
          </div>
          <div className="mt-14 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/journey"
              className="rounded-full bg-bone px-7 py-3.5 text-center text-sm font-semibold text-ink shadow-[0_0_60px_-12px_rgb(var(--ember)/0.9)] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
            >
              Start praying
            </Link>
            <Link
              href="/"
              className="rounded-full border border-bone/15 px-6 py-3.5 text-center text-sm font-semibold text-bone transition hover:border-bone/40 hover:bg-bone/5"
            >
              Back to the story
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
