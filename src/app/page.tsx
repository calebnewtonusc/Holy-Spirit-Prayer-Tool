import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Flame from "@/components/Flame";
import StoryScene from "@/components/StoryScene";
import Reveal from "@/components/Reveal";
import ChristCosmic from "@/components/ChristCosmic";
import Halo from "@/components/Halo";

// Reader: a Christian, often a student, who heard about this from a friend or
// from Erik and is curious and a little nervous. Their questions, in order,
// and the screen that answers each:
//   What is this?               hero, one line
//   What actually happens?      the pinned session, played on the device
//   Will it be weird or fake?   beats 4 and 6, and the questions page
//   Can I share it?             the Pentecost screen and Leader Mode
//   I know a seeker, not a      Christ Cosmic, Erik's booklet and its
//   Christian. What then?       breath ceremony
//   Can I start now?            the last screen
export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Nav />

      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-48 pt-24 text-center sm:px-6 sm:pb-56">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46svh] sm:h-[58svh]">
          <Flame idle={0.2} ignite={2.2} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-ink to-transparent" />

        <Halo className="absolute left-1/2 top-[44%] -z-10 aspect-square w-[min(118vw,860px)] -translate-x-1/2 -translate-y-1/2 animate-fade-in opacity-40 [animation-delay:400ms] [animation-duration:2.4s]" />
        <p className="kicker max-w-[19rem] animate-fade-up leading-relaxed [animation-delay:900ms] sm:max-w-none">
          A voice guide from Erik Fish&apos;s teaching
        </p>
        <h1 className="mt-7 max-w-5xl animate-fade-up font-display text-[clamp(3.8rem,12vw,9.5rem)] font-medium leading-[0.9] tracking-[-0.01em] text-bone [animation-delay:1100ms]">
          Ask for <span className="italic text-gold-light [text-shadow:0_0_50px_rgb(var(--gold)/0.45)]">the fire.</span>
        </h1>
        <p className="mt-6 max-w-lg animate-fade-up text-[17px] leading-relaxed text-ash [animation-delay:1300ms] sm:text-lg">
          Talk out loud with a calm guide as you ask Jesus for the baptism of
          the Holy Spirit.
        </p>
        <div className="mt-9 flex w-full max-w-md animate-fade-up flex-col gap-3 [animation-delay:1500ms] sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/journey"
            className="rounded-full bg-bone px-8 py-4 text-base font-semibold text-ink shadow-[0_0_70px_-12px_rgb(var(--ember)/0.9)] transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_90px_-8px_rgb(var(--ember))] active:translate-y-0 active:scale-[0.98]"
          >
            Start praying
          </Link>
          <Link
            href="/guide"
            className="rounded-full border border-bone/15 bg-ink/40 px-8 py-4 text-base font-semibold text-bone backdrop-blur-md transition hover:-translate-y-0.5 hover:border-bone/35 hover:bg-ink/60 active:translate-y-0"
          >
            Lead a friend through it
          </Link>
        </div>
        <a
          href="#session"
          className="absolute bottom-6 left-1/2 flex min-h-12 -translate-x-1/2 animate-fade-in items-center gap-2 rounded-full px-4 text-sm text-ash transition hover:bg-bone/5 hover:text-bone [animation-delay:2400ms]"
        >
          See what happens
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>

      <div id="session">
        <StoryScene />
      </div>

      <section className="relative isolate overflow-hidden px-4 pb-24 pt-28 text-center sm:px-6 sm:pt-36">
        <Reveal className="mx-auto max-w-3xl">
          <p className="kicker">Acts 2:3</p>
          <p className="mt-7 font-display text-[clamp(2rem,5.4vw,4.2rem)] font-normal leading-[1.04] tracking-[-0.01em] text-bone">
            Tongues of fire came to rest on{" "}
            <span className="text-ember-light">each of them.</span>
          </p>
        </Reveal>
        <div className="pointer-events-none relative mx-auto mt-10 h-[38svh] max-w-5xl sm:h-[44svh]">
          <Flame
            idle={0.4}
            scene={{ intensity: 0.4, count: 7, x: 0, spread: 0.26 }}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-ink to-transparent" />
        </div>
        <Reveal className="relative mx-auto -mt-6 max-w-xl">
          <h2 className="font-display text-3xl font-normal tracking-[-0.01em] text-bone sm:text-4xl">
            Then you walk the next person through it.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-ash">
            Leader Mode coaches you through your friend&apos;s turn: what to
            say, when to stay quiet, and how to follow up all week.
          </p>
          <Link
            href="/guide"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-ember-light active:translate-y-0 active:scale-[0.98]"
          >
            Open Leader Mode
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </Reveal>
      </section>

      <ChristCosmic />

      <section className="px-4 pb-32 pt-16 sm:px-6">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-start justify-between gap-8 border-t border-bone/[0.08] pt-14 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-4xl font-normal tracking-[-0.01em] text-bone sm:text-5xl">
              Your turn.
            </h2>
            <p className="mt-3 max-w-sm text-[17px] text-ash">
              Find a quiet room. Your Father loves it when His kids ask.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/questions"
              className="rounded-full border border-bone/15 px-6 py-3.5 text-sm font-semibold text-bone transition hover:border-bone/40 hover:bg-bone/5"
            >
              Questions first
            </Link>
            <Link
              href="/journey"
              className="rounded-full bg-bone px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_0_60px_-12px_rgb(var(--ember)/0.9)] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
            >
              I&apos;m ready
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
