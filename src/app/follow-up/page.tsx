import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { followUpPlans } from "@/data/content";
import WeekStars from "@/components/WeekStars";

export const metadata: Metadata = {
  title: "7-day plan | Ask for the Fire",
  description:
    "What to do the three days and the week after you ask Jesus for the Holy Spirit.",
};

export default function FollowUpPage() {
  const { threeDay, sevenDay } = followUpPlans;

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="px-5 pb-28 pt-32 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-2xl">
          <header className="animate-fade-up text-center">
            <p className="kicker">After your session</p>
            <h1 className="mt-6 font-display text-6xl font-medium leading-[0.95] text-bone sm:text-7xl">
              Keep <span className="italic text-gold-light">asking.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-ash">
              Ten quiet minutes a day for three days, then one verse a day for a
              week.
            </p>
          </header>

          <section className="mt-24">
            <p className="kicker">The first three days</p>
            <div className="mt-6 divide-y divide-bone/[0.07] border-t border-bone/[0.07]">
              {threeDay.map((day) => (
                <article
                  key={day.day}
                  className="grid gap-x-8 py-12 sm:grid-cols-[4.5rem_1fr]"
                >
                  <span className="font-display text-6xl italic leading-none text-gold/80">
                    {day.day}
                  </span>
                  <div className="mt-4 sm:mt-0">
                    <h2 className="font-display text-3xl font-medium text-bone">
                      {day.title}
                    </h2>
                    <blockquote className="mt-5 font-display text-2xl leading-snug text-bone/85">
                      &ldquo;{day.scripture.text}&rdquo;
                      <cite className="mt-2 block font-sans text-xs not-italic uppercase tracking-[0.2em] text-smoke">
                        {day.scripture.ref}
                      </cite>
                    </blockquote>
                    <p className="mt-6 leading-relaxed text-ash">
                      {day.action}
                    </p>
                    <p className="prayer-text mt-6 whitespace-pre-line border-l border-gold/30 pl-5 font-display text-lg italic text-gold-light/90">
                      {day.prayer}
                    </p>
                    <p className="mt-6 text-sm text-smoke">{day.reflection}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <p className="kicker">The week after</p>
            <div className="mt-10">
              <WeekStars days={sevenDay} />
            </div>
          </section>

          <section className="mt-28 text-center">
            <h2 className="font-display text-4xl font-medium leading-tight text-bone sm:text-5xl">
              Then walk someone{" "}
              <span className="italic text-gold-light">else</span> through it.
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[17px] leading-relaxed text-ash">
              Leader Mode coaches you through it the way Erik does it in person.
            </p>
            <Link
              href="/guide"
              className="mt-9 inline-flex items-center rounded-full bg-bone px-8 py-4 text-sm font-semibold text-ink shadow-[0_0_60px_-12px_rgb(var(--gold)/0.8)] transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
            >
              Open Leader Mode
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
