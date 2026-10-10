import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Session from "@/components/Session";

export const metadata: Metadata = {
  title: "Pray | Ask for the Fire",
  description: "A voice-guided session asking Jesus for the baptism of the Holy Spirit.",
};

const EXPECT = [
  ["Settle in", "The guide checks you're somewhere quiet and asks where you are with Jesus."],
  ["Scripture", "Jesus' promise in Luke 11, Pentecost in Acts 2, and Paul on praying with your spirit."],
  ["Questions", "Anything you're afraid of or unsure about, said out loud and answered."],
  ["The prayer", "You ask your Father for the Holy Spirit, phrase by phrase."],
  ["Practice", "You stop praying in English and let whatever comes, come. The guide waits quietly."],
  ["What next", "How to keep going daily, and who to tell."],
] as const;

export default function JourneyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-ember-light">Guided prayer</p>
            <h1 className="mt-5 font-display text-5xl font-semibold tracking-[-0.03em] text-bone sm:text-6xl">
              Come as you are.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ash">
              You&apos;ll talk out loud, and the guide talks back. When it&apos;s time to pray, it goes quiet and lets
              you.
            </p>
          </div>

          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-bone/[0.08] bg-coal/70 px-6 py-14 shadow-[0_40px_120px_-40px_rgb(var(--ember)/0.45)] sm:px-10">
            <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[120%] -translate-x-1/2 rounded-full bg-ember/20 blur-3xl" />
            <div className="relative">
              <Session mode="journey" />
            </div>
          </div>

          <ol className="mt-16 space-y-1">
            {EXPECT.map(([title, body], i) => (
              <li key={title} className="flex gap-5 rounded-2xl px-4 py-4 transition hover:bg-bone/[0.03]">
                <span className="w-6 shrink-0 pt-0.5 font-display text-sm font-semibold tabular-nums text-ember-light">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-medium text-bone">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ash">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </div>
  );
}
