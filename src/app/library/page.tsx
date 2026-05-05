"use client";

import { useEffect, useState } from "react";
import { useA } from "@/lib/providers";
import { CIVS, type Civ } from "@/data/civilizations";
import { Radar } from "@/components/Radar";

export default function LibraryPage() {
  const { tr, lang } = useA();
  const [primary, setPrimary] = useState<string>("rome");
  const [compare, setCompare] = useState<string | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const a = p.get("a"); const b = p.get("b");
    if (a && CIVS.find((c) => c.id === a)) setPrimary(a);
    if (b && CIVS.find((c) => c.id === b)) setCompare(b);
  }, []);
  useEffect(() => {
    const p = new URLSearchParams();
    p.set("a", primary);
    if (compare) p.set("b", compare);
    window.history.replaceState({}, "", `${window.location.pathname}?${p.toString()}`);
  }, [primary, compare]);

  const a = CIVS.find((c) => c.id === primary)!;
  const b = compare ? CIVS.find((c) => c.id === compare) ?? null : null;

  return (
    <main className="container-a py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("libraryEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("libraryTitle")}</h1>
        <p className="lede max-w-2xl">{tr("librarySubtitle")}</p>
      </header>

      {/* Selectors */}
      <div className="card mb-8 grid gap-6 md:grid-cols-2">
        <div>
          <div className="eyebrow mb-2">primary</div>
          <div className="flex flex-wrap gap-2">
            {CIVS.map((c) => (
              <button
                key={c.id}
                onClick={() => setPrimary(c.id)}
                className={`pill ${primary === c.id ? "active" : ""}`}
              >
                {lang === "zh" ? c.zh : c.en}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-2 text-verdigris">compare</div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCompare(null)}
              className={`pill ${!compare ? "border-bone text-bone" : ""}`}
            >
              ✕ none
            </button>
            {CIVS.filter((c) => c.id !== primary).map((c) => (
              <button
                key={c.id}
                onClick={() => setCompare(c.id)}
                className={`pill ${compare === c.id ? "active border-verdigris bg-verdigris/10 text-verdigris" : ""}`}
                style={compare === c.id ? { borderColor: "#82A09C", color: "#82A09C", background: "rgba(130, 160, 156, 0.1)" } : {}}
              >
                {lang === "zh" ? c.zh : c.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="card !p-6">
          <Radar
            values={a.values}
            compareValues={b?.values}
            size={460}
            primaryLabel={lang === "zh" ? a.zh : a.en}
            compareLabel={b ? (lang === "zh" ? b.zh : b.en) : undefined}
          />
        </div>

        <div className="space-y-6">
          <CivProfile civ={a} accent="terracotta" />
          {b && <CivProfile civ={b} accent="verdigris" />}
        </div>
      </div>
    </main>
  );
}

function CivProfile({ civ, accent }: { civ: Civ; accent: "terracotta" | "verdigris" }) {
  const { lang } = useA();
  const colorCls = accent === "terracotta" ? "text-terracotta" : "text-verdigris";
  return (
    <article className="card">
      <div className={`font-mono text-[10px] uppercase tracking-[0.18em] ${colorCls}`}>
        {civ.era}
      </div>
      <h2 className="display-2 mt-1 mb-4">{lang === "zh" ? civ.zh : civ.en}</h2>
      <p className="prose-body mb-5">{lang === "zh" ? civ.noteZh : civ.noteEn}</p>
      <div className="hairline mb-4" />
      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-rust mb-2">
        {lang === "en" ? "End mechanism" : "终结机制"}
      </div>
      <p className="prose-body italic">{lang === "zh" ? civ.collapseZh : civ.collapseEn}</p>
    </article>
  );
}
