import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScriptureCard from "@/components/ScriptureCard";
import { followUpPlans } from "@/data/content";

export default function FollowUpPage() {
  const { threeDay, sevenDay } = followUpPlans;

  return (
    <div className="min-h-screen">
      <Nav />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">

          {/* ── Header ─────────────────────────────────────────────── */}
          <div className="text-center mb-16 animate-fade-up">
            <p className="kicker mb-5">
              After your session
            </p>
            <h1 className="mb-5 font-display text-5xl font-normal tracking-[-0.03em] text-bone md:text-6xl">
              Keep going.
            </h1>
            <p className="text-lg text-ash leading-relaxed max-w-lg mx-auto">
              The session was a beginning, not a conclusion. Return daily.
              Continuation matters more than spectacle.
            </p>
          </div>

          {/* ── 3-Day Plan ──────────────────────────────────────────── */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl font-normal tracking-[-0.02em] text-bone sm:text-3xl">
                3-Day Plan
              </h2>
              <span className="text-xs font-semibold text-ash bg-coal px-3 py-1.5 rounded-full">
                Recommended after your first session
              </span>
            </div>

            <div className="space-y-6">
              {threeDay.map((day) => (
                <div
                  key={day.day}
                  className="border border-bone/10 rounded-2xl overflow-hidden"
                >
                  {/* Day header */}
                  <div className="bg-coal px-7 py-4 flex items-center gap-4">
                    <span className="text-xs font-bold text-smoke">
                      Day {day.day}
                    </span>
                    <h3 className="text-base font-semibold text-bone">
                      {day.title}
                    </h3>
                  </div>

                  <div className="p-7 space-y-6">
                    {/* Scripture */}
                    <ScriptureCard
                      reference={day.scripture.ref}
                      text={day.scripture.text}
                      variant="minimal"
                    />

                    {/* Action */}
                    <div>
                      <p className="text-xs font-bold text-smoke mb-2">
                        Today&apos;s Action
                      </p>
                      <p className="text-sm text-bone/80 leading-relaxed">
                        {day.action}
                      </p>
                    </div>

                    {/* Prayer */}
                    <div className="bg-ember/10 rounded-xl p-5">
                      <p className="text-xs font-bold text-ember-light mb-3">
                        Suggested Prayer
                      </p>
                      <p className="prayer-text text-sm text-bone/80 whitespace-pre-line leading-loose">
                        {day.prayer}
                      </p>
                    </div>

                    {/* Reflection */}
                    <div>
                      <p className="text-xs font-bold text-smoke mb-2">
                        Reflect
                      </p>
                      <p className="text-sm text-ash italic">
                        {day.reflection}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Divider ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-5 mb-14">
            <div className="flex-1 h-px bg-bone/10" />
            <span className="text-xs text-smoke">
              Going deeper
            </span>
            <div className="flex-1 h-px bg-bone/10" />
          </div>

          {/* ── 7-Day Plan ──────────────────────────────────────────── */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl font-normal tracking-[-0.02em] text-bone sm:text-3xl">
                7-Day Plan
              </h2>
              <span className="text-xs font-semibold text-ash bg-coal px-3 py-1.5 rounded-full">
                For sustained growth
              </span>
            </div>

            <div className="space-y-3">
              {sevenDay.map((day) => (
                <div
                  key={day.day}
                  className="bg-coal rounded-2xl px-7 py-5"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 text-center">
                      <span className="block text-xs font-bold text-smoke">
                        Day
                      </span>
                      <span className="block font-display text-2xl font-normal leading-tight text-bone">
                        {day.day}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <h3 className="text-base font-semibold text-bone">
                          {day.title}
                        </h3>
                        <span className="text-xs text-ember-light font-medium">
                          {day.theme}
                        </span>
                      </div>
                      <p className="scripture-text text-sm text-ash leading-relaxed">
                        &ldquo;{day.scripture.text}&rdquo;
                        <span className="not-italic font-semibold text-ember-light ml-2">{day.scripture.ref}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Multiplication CTA ──────────────────────────────────── */}
          <div className="bg-char border border-ember/20 rounded-2xl p-10 text-center text-bone">
            <h3 className="mb-4 font-display text-2xl font-normal tracking-[-0.02em]">
              Walk someone else through it.
            </h3>
            <p className="text-smoke text-base leading-relaxed mb-8 max-w-sm mx-auto">
              The greatest blessing is sharing with others what you&apos;ve received
              from God. Guide Mode gives you a step-by-step process, just like
              Erik Fish does it.
            </p>
            <a
              href="/guide"
              className="inline-flex items-center justify-center px-8 py-4 bg-bone text-ink text-sm font-semibold rounded-full hover:bg-coal transition-colors"
            >
              Open Guide Mode
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
