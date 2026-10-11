"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/journey", label: "Pray" },
  { href: "/guide", label: "Lead a friend" },
  { href: "/follow-up", label: "7-day plan" },
  { href: "/#christ-cosmic", label: "Christ Cosmic" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-40 border-b border-bone/[0.05] bg-ink/35 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-bone">
          <span className="relative h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_14px_2px_rgb(var(--gold)/0.7)] transition group-hover:scale-125" />
          Ask for the Fire
        </Link>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {LINKS.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition sm:px-4 sm:text-sm ${
                  active ? "bg-bone text-ink" : "text-ash hover:bg-bone/[0.07] hover:text-bone"
                } ${link.href === "/follow-up" || link.href.startsWith("/#") ? "hidden md:block" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
