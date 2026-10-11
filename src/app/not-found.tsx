import Link from "next/link";
import Nav from "@/components/Nav";
import Halo from "@/components/Halo";

export default function NotFound() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Nav />
      <main className="relative isolate flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <Halo className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(110vw,620px)] -translate-x-1/2 -translate-y-1/2 opacity-40" />
        <p className="kicker">Page not found</p>
        <h1 className="mt-6 font-display text-6xl font-medium text-bone sm:text-7xl">Nothing here.</h1>
        <p className="mt-5 max-w-sm text-[17px] text-ash">That link doesn&apos;t lead anywhere. The guide is one tap away.</p>
        <Link
          href="/journey"
          className="mt-9 rounded-full bg-bone px-8 py-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
        >
          Start praying
        </Link>
      </main>
    </div>
  );
}
