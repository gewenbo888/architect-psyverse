"use client";

import Link from "next/link";
import { useA } from "@/lib/providers";

export function Nav() {
  const { tr, lang, setLang } = useA();
  return (
    <header className="sticky top-0 z-30 border-b border-smoke/40 bg-ink/85 backdrop-blur">
      <div className="container-a flex h-16 items-center justify-between">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-xl tracking-tight">{tr("brand")}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-terracotta">⌘</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {[
            { href: "/model", k: "navModel" as const },
            { href: "/library", k: "navLibrary" as const },
            { href: "/levers", k: "navLevers" as const },
            { href: "/collapse", k: "navCollapse" as const },
            { href: "/simulator", k: "navSimulator" as const },
          ].map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone transition-colors hover:text-terracotta"
            >
              {tr(it.k)}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setLang(lang === "en" ? "zh" : "en")}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-bone transition-colors hover:text-terracotta"
          aria-label="Toggle language"
        >
          {tr("langToggle")}
        </button>
      </div>
    </header>
  );
}
