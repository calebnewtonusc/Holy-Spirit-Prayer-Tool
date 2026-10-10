import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Flame from "@/components/Flame";
import { erikHookQuestion, fears } from "@/data/content";

const STEPS = [
  {
    n: "1",
    title: "Hear what Jesus promised",
    body: "Luke 11, Acts 2, 1 Corinthians 14, read slowly, out loud, with room to ask questions.",
  },
  {
    n: "2",
    title: "Say the fear out loud",
    body: "Faking it, nothing happening, feeling weird. The guide has heard all of them and answers kindly.",
  },
  {
    n: "3",
    title: "Ask",
    body: "A simple prayer, phrase by phrase, asking your Father for the Holy Spirit and His gifts.",
  },
  {
    n: "4",
    title: "Pray with your spirit",
    body: "You stop praying in English and let whatever comes, come. The guide goes quiet and waits with you.",
  },
];

const SCRIPTURE = [
  {
    ref: "Luke 11:13",
    text: "How much more will your Father in heaven give the Holy Spirit to those who ask him!",
  },
  {
    ref: "Acts 2:3-4",
    text: "They saw what seemed to be tongues of fire that separated and came to rest on each of them.",
  },
  {
    ref: "1 Corinthians 14:15",
    text: "I will pray with my spirit, but I will also pray with my understanding.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      <section className="relative isolate flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 pb-52 pt-28 text-center sm:px-6">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[48svh] opacity-90 sm:h-[70svh]">
          <Flame idle={0.18} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

        <p className="animate-fade-up text-xs font-medium uppercase tracking-[0.25em] text-ember-light">
          A voice guide from Erik Fish&apos;s teaching
        </p>
        <h1 className="mt-6 max-w-4xl animate-fade-up font-display text-[clamp(3.25rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-bone [animation-delay:80ms]">
          Ask for the fire.
        </h1>
        <p className="mt-7 max-w-xl animate-fade-up text-lg leading-relaxed text-ash [animation-delay:160ms] sm:text-xl">
          Talk out loud with a calm guide as you ask Jesus for the baptism of
          the Holy Spirit, including praying in tongues for the first time.
          Scripture first. No hype, no pressure.
        </p>
        <div className="mt-10 flex w-full max-w-md animate-fade-up flex-col gap-3 [animation-delay:240ms] sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/journey"
            className="rounded-full bg-bone px-8 py-4 text-base font-semibold text-ink shadow-[0_0_70px_-12px_rgb(var(--ember)/0.9)] transition hover:bg-white hover:shadow-[0_0_90px_-8px_rgb(var(--ember))] active:scale-[0.98]"
          >
            Start praying
          </Link>
          <Link
            href="/guide"
            className="rounded-full border border-bone/15 bg-ink/40 px-8 py-4 text-base font-semibold text-bone backdrop-blur-md transition hover:border-bone/35 hover:bg-ink/60"
          >
            Lead a friend through it
          </Link>
        </div>
        <p className="mt-5 animate-fade-in text-sm text-smoke [animation-delay:400ms]">
          Free. About twenty minutes. Bring headphones.
        </p>
      </section>

      <section className="px-4 py-28 sm:px-6 sm:py-36">
        <figure className="mx-auto max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-smoke">
            The question Erik asks first
          </p>
          <blockquote className="mt-6 font-display text-[clamp(1.6rem,4vw,2.9rem)] font-medium leading-[1.18] tracking-[-0.02em] text-bone">
            &ldquo;{erikHookQuestion}&rdquo;
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3 text-sm text-ash">
            <span className="h-px w-10 bg-ember" />
            Erik Fish, disciple-maker and author of{" "}
            <em className="not-italic text-bone">Pocket Disciple</em>
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-bone/[0.06] bg-coal/60 px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-xl font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
            What happens in the session.
          </h2>
          <p className="mt-4 max-w-xl text-ash">
            It&apos;s the same path Erik walks people through in person, at your
            pace, in your room.
          </p>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-bone/[0.07] bg-bone/[0.07] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <li
                key={step.n}
                className="group bg-coal p-7 transition hover:bg-char"
              >
                <span className="font-display text-5xl font-semibold text-ember/80 transition group-hover:text-ember-light">
                  {step.n}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-bone">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-24 sm:px-6 sm:py-32">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {SCRIPTURE.map((s) => (
            <figure
              key={s.ref}
              className="border-l border-ember/50 pl-6 transition hover:border-ember-light"
            >
              <blockquote className="scripture-text text-xl leading-snug text-bone sm:text-2xl">
                &ldquo;{s.text}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-medium text-ember-light">
                {s.ref}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
              If you&apos;re nervous, good. Everyone is.
            </h2>
            <p className="mt-4 max-w-md text-ash">
              These are the questions people ask Erik most. The guide answers
              them in the moment too.
            </p>
          </div>
          <div className="divide-y divide-bone/[0.08] border-y border-bone/[0.08]">
            {fears.map((fear) => (
              <details key={fear.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-medium text-bone transition hover:text-ember-light [&::-webkit-details-marker]:hidden">
                  {fear.question}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-bone/15 text-ash transition group-open:rotate-45 group-hover:border-ember-light group-hover:text-ember-light">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-ash">
                  {fear.response}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-28 sm:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-ember/20 bg-gradient-to-br from-ember-deep/40 via-coal to-coal p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/25 blur-3xl" />
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-ember-light">
            Leader Mode
          </p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold tracking-tight text-bone sm:text-5xl">
            Then walk someone else through it.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">
            A coach in your ear for when it&apos;s your turn: what to say, when
            to stay quiet, what to do if nothing seems to happen, and how to
            follow up all week.
          </p>
          <Link
            href="/guide"
            className="mt-9 inline-flex rounded-full bg-ember px-7 py-3.5 text-sm font-semibold text-ink transition hover:bg-ember-light active:scale-[0.98]"
          >
            Open Leader Mode
          </Link>
        </div>
      </section>

      <section className="px-4 pb-32 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <ul className="grid gap-3 text-left sm:grid-cols-2">
            {[
              "It won't force a result.",
              "It won't shame your pace.",
              "It won't replace your church.",
              "It will keep pointing you to Jesus.",
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 rounded-2xl border border-bone/[0.07] bg-coal/50 px-5 py-4 text-bone transition hover:border-bone/15"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                {line}
              </li>
            ))}
          </ul>
          <h2 className="mt-24 font-display text-5xl font-semibold tracking-tight text-bone sm:text-6xl">
            Ready?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-ash">
            Find somewhere quiet. Your Father loves it when His kids ask.
          </p>
          <Link
            href="/journey"
            className="mt-9 inline-flex rounded-full bg-bone px-9 py-4 text-base font-semibold text-ink shadow-[0_0_70px_-12px_rgb(var(--ember)/0.9)] transition hover:bg-white active:scale-[0.98]"
          >
            Start praying
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
