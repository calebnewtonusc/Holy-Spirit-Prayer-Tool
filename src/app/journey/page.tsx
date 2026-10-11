import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Session from "@/components/Session";
import Halo from "@/components/Halo";

export const metadata: Metadata = {
  title: "Pray | Ask for the Fire",
  description: "A voice-guided session asking Jesus for the baptism of the Holy Spirit.",
};


export default function JourneyPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="overflow-x-clip px-4 pb-24 pt-28 sm:px-6 sm:pt-36">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <p className="kicker">Guided prayer</p>
            <h1 className="mt-5 font-display text-5xl font-normal tracking-[-0.01em] text-bone sm:text-6xl">
              Come as you are.
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ash">
              You&apos;ll talk out loud, and the guide talks back. When it&apos;s time to pray, it goes quiet and lets
              you.
            </p>
          </div>

          <div className="relative isolate mt-10 px-2 py-24 sm:py-28">
            <Halo className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(112vw,640px)] -translate-x-1/2 -translate-y-1/2 opacity-35" />
            <div className="relative">
              <Session mode="journey" />
            </div>
          </div>

          <div className="mx-auto mt-4 max-w-xl text-center">
            <p className="kicker">What happens</p>
            <p className="mt-6 font-display text-2xl leading-snug text-bone/90">
              The guide checks you&apos;re somewhere quiet and asks where you are with Jesus. It reads His promise in
              Luke 11, Pentecost in Acts 2 and Paul on praying with your spirit, and answers anything you&apos;re
              afraid of. Then you ask your Father for the Holy Spirit, phrase by phrase, and stop praying in English
              while the guide waits quietly. It ends with how to keep going, and who to tell.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
