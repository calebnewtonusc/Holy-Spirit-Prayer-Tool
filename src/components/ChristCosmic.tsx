import Image from "next/image";
import Reveal from "@/components/Reveal";

// Erik's Christ Cosmic booklet, the version of the story he reads to seekers
// at Burning Man and festivals. The guide tells the good news in its words, so
// the site shows where those words come from and hands over the booklet.
export const CHRIST_COSMIC_PDF =
  "https://christcosmic.org/wp-content/uploads/2026/08/N119291-SCM-Christ-Cosmic-Ceremony-Booklet-PROOF.pdf";
export const CHRIST_COSMIC_SITE = "https://christcosmic.org/";

const BREATHS = [
  {
    word: "Breathe",
    verse:
      "In the beginning God created... And He breathed life into the humans He had made.",
    ref: "Genesis 2:7",
    response: ["Thank you for life.", "I am loved."],
  },
  {
    word: "Release",
    verse:
      "Come to Me, all who are weary and carry heavy burdens. Learn from Me, and I will give you rest.",
    ref: "Matthew 11:28",
    response: ["Christ, I come.", "I let it go."],
  },
  {
    word: "Listen",
    verse: "My sheep listen to my voice; I know them and they follow me.",
    ref: "John 10:27",
    response: ["Christ the Savior.", "I am listening."],
  },
];

export default function ChristCosmic() {
  return (
    <section
      id="christ-cosmic"
      className="relative isolate overflow-hidden px-4 pb-[46vh] pt-28 sm:px-6 sm:pb-[52vh] sm:pt-36"
    >
      {/* On a phone the art keeps its own shape at the bottom; stretched to
          the whole section it zoomed in until the camp lights went soft. */}
      <div className="absolute inset-x-0 bottom-0 -z-20 aspect-[1004/1457] sm:inset-0 sm:aspect-auto">
        <Image
          src="/christ-cosmic/playa.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-80"
        />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-ink to-transparent sm:hidden" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[45%] bg-gradient-to-b from-ink via-ink/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-ink to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <Reveal>
          <p className="font-cosmic text-sm font-semibold uppercase tracking-[0.32em] text-gold">
            Christ Cosmic
          </p>
          <p className="mt-3 max-w-md font-cosmic text-lg uppercase leading-snug tracking-[0.12em] text-bone/70">
            A contemplative invitation for seekers, mystics, burners, wanderers,
            and lovers of wonder.
          </p>
          <h2 className="mt-9 font-cosmic text-[clamp(2.6rem,6.4vw,5rem)] font-medium italic leading-[1.02] tracking-[-0.01em] text-gold-light [text-shadow:0_0_40px_rgb(var(--gold)/0.35)]">
            Come follow Me.
            <br />
            Come into the Light.
            <br />
            Come home.
          </h2>
          <p className="mt-8 max-w-lg text-[17px] leading-relaxed text-bone/80">
            Erik wrote Christ Cosmic for festival nights and Burning Man: the
            story of Jesus told under the stars, from the first Love that made
            us to the Light that returned. When someone talking to the guide is
            still searching, it tells them the story in these words.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={CHRIST_COSMIC_PDF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-night shadow-[0_0_60px_-10px_rgb(var(--gold)/0.8)] transition hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_0_80px_-6px_rgb(var(--gold))] active:translate-y-0 active:scale-[0.98]"
            >
              Read the booklet
              <span className="text-xs font-medium opacity-70">PDF</span>
            </a>
            <a
              href={CHRIST_COSMIC_SITE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-gold/30 bg-night/40 px-7 py-3.5 text-sm font-semibold text-gold-light backdrop-blur-md transition hover:-translate-y-0.5 hover:border-gold/60 hover:bg-night/70 active:translate-y-0"
            >
              christcosmic.org
            </a>
          </div>
        </Reveal>

        <Reveal className="mx-auto w-full max-w-[19rem] sm:max-w-xs">
          <a
            href={CHRIST_COSMIC_PDF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the Christ Cosmic booklet as a PDF"
            className="group block rotate-[2.5deg] transition duration-500 hover:-translate-y-2 hover:rotate-0"
          >
            <span className="relative block overflow-hidden rounded-xl border border-gold/25 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9),0_0_90px_-30px_rgb(var(--gold)/0.7)] transition duration-500 group-hover:shadow-[0_40px_90px_-20px_rgb(0_0_0/0.9),0_0_110px_-20px_rgb(var(--gold)/0.9)]">
              <Image
                src="/christ-cosmic/cover.webp"
                alt="Christ Cosmic booklet cover: Jesus under the Milky Way above a desert campfire circle"
                width={720}
                height={1029}
                sizes="(min-width: 640px) 320px, 76vw"
                className="h-auto w-full"
              />
            </span>
          </a>
        </Reveal>
      </div>

      <div className="mx-auto mt-28 max-w-6xl sm:mt-36">
        <Reveal className="text-center">
          <p className="font-cosmic text-sm font-semibold uppercase tracking-[0.32em] text-gold">
            Three-step breath ceremony
          </p>
          <p className="mt-4 font-cosmic text-3xl font-medium text-bone sm:text-4xl">
            Sit in stillness. Breathe. Listen.
          </p>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ash">
            The guide opens your prayer time with these three breaths.
          </p>
        </Reveal>
        <div className="mt-14 grid divide-y divide-gold/15 border-y border-gold/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {BREATHS.map((breath, i) => (
            <Reveal key={breath.word}>
              <div className="flex h-full flex-col px-2 py-10 md:px-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-gold/50 font-cosmic text-base text-gold">
                    {i + 1}
                  </span>
                  <span className="font-cosmic text-xl font-semibold uppercase tracking-[0.2em] text-gold">
                    {breath.word}
                  </span>
                </div>
                <p className="mt-6 flex-1 font-cosmic text-xl leading-snug text-bone/90">
                  &ldquo;{breath.verse}&rdquo;
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.18em] text-smoke">
                  {breath.ref}
                </p>
                <div className="mt-7 font-cosmic text-2xl italic leading-tight text-gold-light">
                  {breath.response.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20 text-center">
          <p className="mx-auto max-w-2xl font-cosmic text-[clamp(1.7rem,3.6vw,2.6rem)] font-medium leading-tight text-bone">
            The Christ who walked among humanity{" "}
            <span className="italic text-gold-light">
              still walks among us.
            </span>
          </p>
          <p className="mt-4 text-sm text-ash">
            He is not far away. He is with you. You are loved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
