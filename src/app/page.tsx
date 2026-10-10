import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StoryFlame from "@/components/StoryFlame";
import Reveal from "@/components/Reveal";
import { erikHookQuestion, fears } from "@/data/content";

// The page is one story told by the fire behind it. Each chapter's data-flame-*
// says what the fire is doing while you read it:
//   hero      a spark catches
//   question  a small steady flame beside Erik's question: desire
//   promise   it rises behind Luke 11:13: the Father gives
//   session   it stands beside the four steps: a concrete path
//   fears     it settles low: nothing here is forced
//   pentecost it divides and rests on each of them: Acts 2:3
//   multiply  it keeps spreading: you walk the next person through it
//   ready     back to one flame, yours
const STEPS = [
  {
    n: "1",
    title: "Hear what Jesus promised",
    body: "Luke 11, Acts 2 and 1 Corinthians 14, read slowly and out loud, with room to ask anything.",
  },
  {
    n: "2",
    title: "Say the fear out loud",
    body: "Faking it, nothing happening, feeling weird. The guide has heard all of them and answers kindly.",
  },
  {
    n: "3",
    title: "Ask",
    body: "A short prayer, phrase by phrase, asking your Father for the Holy Spirit and His gifts.",
  },
  {
    n: "4",
    title: "Pray with your spirit",
    body: "You stop praying in English and let whatever comes, come. The guide goes quiet and waits with you.",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StoryFlame />
      <Nav />

      <section
        data-flame
        data-flame-intensity="0.2"
        className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 pb-72 pt-24 text-center sm:px-6 sm:pb-56 sm:pt-28"
      >
        <p className="kicker animate-fade-up [animation-delay:900ms]">
          A voice guide from Erik Fish&apos;s teaching
        </p>
        <h1 className="mt-7 max-w-5xl animate-fade-up font-display text-[clamp(3.4rem,11.5vw,9rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-bone [animation-delay:1100ms]">
          Ask for <span className="text-ember-light">the fire.</span>
        </h1>
        <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-ash [animation-delay:1300ms] sm:text-xl">
          Talk out loud with a calm guide as you ask Jesus for the baptism of
          the Holy Spirit, including praying in tongues for the first time.
        </p>
        <div className="mt-10 flex w-full max-w-md animate-fade-up flex-col gap-3 [animation-delay:1500ms] sm:max-w-none sm:flex-row sm:justify-center">
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
        <p className="mt-5 animate-fade-in text-sm text-smoke [animation-delay:1800ms]">
          Free. About twenty minutes. Scripture first, no pressure.
        </p>
        <a
          href="#question"
          aria-label="Scroll to the story"
          className="absolute bottom-6 left-1/2 hidden h-12 w-12 -translate-x-1/2 animate-fade-in place-items-center rounded-full text-ash transition hover:bg-bone/5 hover:text-ember-light [animation-delay:2400ms] sm:grid"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 animate-bounce"
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

      <section
        id="question"
        data-flame
        data-flame-intensity="0.3"
        data-flame-x="0.3"
        className="relative flex min-h-[100svh] items-center px-4 py-28 sm:px-6"
      >
        <Reveal className="mx-auto w-full max-w-6xl">
          <figure className="max-w-3xl">
            <p className="kicker">The first thing Erik asks</p>
            <blockquote className="mt-8 font-display text-[clamp(1.7rem,4.2vw,3.1rem)] font-medium leading-[1.15] tracking-[-0.02em] text-bone">
              &ldquo;{erikHookQuestion}&rdquo;
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3 text-sm text-ash">
              <span className="h-px w-10 bg-ember" />
              Erik Fish, disciple-maker and author of{" "}
              <em className="not-italic text-bone">Pocket Disciple</em>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section
        data-flame
        data-flame-intensity="0.5"
        className="relative flex min-h-[110svh] items-start justify-center px-4 pt-[18svh] text-center sm:px-6"
      >
        <Reveal className="max-w-4xl">
          <p className="kicker">Luke 11:13</p>
          <p className="mt-8 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-bone">
            How much more will your Father in heaven give the Holy Spirit to
            those who <span className="text-ember-light">ask him.</span>
          </p>
        </Reveal>
      </section>

      <section
        data-flame
        data-flame-intensity="0.34"
        data-flame-x="-0.3"
        className="relative flex min-h-[100svh] items-center px-4 py-28 sm:px-6"
      >
        <div className="mx-auto grid w-full max-w-6xl md:grid-cols-2">
          <div className="hidden md:block" />
          <Reveal>
            <p className="kicker">What happens in the session</p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              The path Erik walks people through, in your room.
            </h2>
            <ol className="mt-10 space-y-2">
              {STEPS.map((step) => (
                <li
                  key={step.n}
                  className="group flex gap-5 rounded-lg border border-transparent bg-ink/50 p-5 backdrop-blur-md transition hover:border-bone/10 hover:bg-coal/80"
                >
                  <span className="font-display text-3xl font-semibold leading-none text-ember/80 transition group-hover:text-ember-light">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-semibold text-bone">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ash">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section
        data-flame
        data-flame-intensity="0.1"
        className="relative px-4 py-32 sm:px-6"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="kicker">Nervous is normal</p>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              Nothing here is forced.
            </h2>
            <p className="mt-4 max-w-md text-ash">
              It won&apos;t push a result, shame your pace, or replace your
              church. These are the questions people ask Erik most, and the
              guide answers them in the moment too.
            </p>
          </Reveal>
          <Reveal className="divide-y divide-bone/[0.08] rounded-lg border border-bone/[0.08] bg-ink/60 px-6 backdrop-blur-xl sm:px-8">
            {fears.map((fear) => (
              <details key={fear.question} className="group py-2">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 py-3 text-left text-lg font-medium text-bone transition hover:text-ember-light [&::-webkit-details-marker]:hidden">
                  {fear.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-bone/15 text-ash transition duration-300 group-open:rotate-45 group-open:border-ember-light group-open:text-ember-light group-hover:border-ember-light group-hover:text-ember-light">
                    +
                  </span>
                </summary>
                <p className="pb-4 pt-1 max-w-2xl leading-relaxed text-ash">
                  {fear.response}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <section
        data-flame
        data-flame-intensity="0.42"
        data-flame-count="5"
        data-flame-spread="0.32"
        className="relative flex min-h-[110svh] items-start justify-center px-4 pt-[16svh] text-center sm:px-6"
      >
        <Reveal className="max-w-3xl">
          <p className="kicker">Acts 2:3</p>
          <p className="mt-8 font-display text-[clamp(2rem,5.2vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            Tongues of fire separated and came to rest on{" "}
            <span className="text-ember-light">each of them.</span>
          </p>
        </Reveal>
      </section>

      <section
        data-flame
        data-flame-intensity="0.36"
        data-flame-count="7"
        data-flame-spread="0.42"
        className="relative flex min-h-[90svh] items-start px-4 pt-[10svh] sm:px-6"
      >
        <Reveal className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-xl border border-ember/20 bg-ink/70 p-8 backdrop-blur-xl sm:p-14">
          <p className="kicker">Leader Mode</p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
            Then you walk the next person through it.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">
            A coach in your ear for your friend&apos;s turn: what to say, when
            to stay quiet, what to do if nothing seems to happen, and how to
            follow up all week.
          </p>
          <Link
            href="/guide"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-ember-light active:translate-y-0 active:scale-[0.98]"
          >
            Open Leader Mode
            <span
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </Reveal>
      </section>

      <section
        data-flame
        data-flame-intensity="0.3"
        className="relative flex min-h-[90svh] items-start justify-center px-4 pt-[14svh] text-center sm:px-6"
      >
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-5xl font-semibold tracking-[-0.03em] text-bone sm:text-7xl">
            Your turn.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-ash">
            Find a quiet room. Your Father loves it when His kids ask.
          </p>
          <Link
            href="/journey"
            className="mt-10 inline-flex rounded-full bg-bone px-9 py-4 text-base font-semibold text-ink shadow-[0_0_70px_-12px_rgb(var(--ember)/0.9)] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
          >
            I&apos;m ready
          </Link>
        </Reveal>
      </section>

      <div className="relative bg-ink">
        <Footer />
      </div>
    </div>
  );
}
