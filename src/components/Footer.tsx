import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-bone/[0.06] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="text-center md:text-left">
            <p className="text-sm text-ash">
              From the teaching of{" "}
              <a
                href="https://erikfish.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-bone underline decoration-bone/20 underline-offset-4 transition hover:text-ember-light hover:decoration-ember-light"
              >
                Erik Fish
              </a>
              . Built by{" "}
              <a
                href="https://calebnewton.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-bone underline decoration-bone/20 underline-offset-4 transition hover:text-ember-light hover:decoration-ember-light"
              >
                Caleb Newton
              </a>
              .
            </p>
            <p className="mt-1.5 text-xs text-smoke">A free ministry tool. Take it to your campus, your small group, your friends.</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-ash">
            <Link href="/journey" className="transition hover:text-bone">Pray</Link>
            <Link href="/guide" className="transition hover:text-bone">Lead a friend</Link>
            <Link href="/follow-up" className="transition hover:text-bone">7-day plan</Link>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-2xl border-t border-bone/[0.06] pt-8 text-center text-xs leading-relaxed text-smoke">
          The guide is an AI voice built from Erik&apos;s teaching. It points you to Jesus, Scripture and your church, and
          it doesn&apos;t replace any of them. If you&apos;re in crisis, call or text 988 in the US, or reach someone you
          trust right now. Scripture quotations from the NIV.
        </p>
      </div>
    </footer>
  );
}
