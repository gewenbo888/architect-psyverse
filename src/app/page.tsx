"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useA } from "@/lib/providers";

export default function Home() {
  const { tr } = useA();
  const heroCanvas = useRef<HTMLCanvasElement>(null);

  // Decorative: a slowly rotating heptagon (7 axes) lattice
  useEffect(() => {
    const c = heroCanvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    let raf = 0;
    let t = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const r = c.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      t += 0.002;
      const cx = r.width * 0.7;
      const cy = r.height * 0.5;
      const maxR = Math.min(r.width, r.height) * 0.32;

      // 5 concentric heptagons
      for (let g = 1; g <= 5; g++) {
        const rad = (maxR * g) / 5;
        ctx.strokeStyle = `rgba(201, 146, 109, ${0.05 + g * 0.02})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        for (let i = 0; i <= 7; i++) {
          const a = (i / 7) * Math.PI * 2 + t;
          const x = cx + Math.cos(a) * rad;
          const y = cy + Math.sin(a) * rad;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // Spokes
      ctx.strokeStyle = "rgba(201, 146, 109, 0.15)";
      ctx.lineWidth = 0.7;
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2 + t;
        const x = cx + Math.cos(a) * maxR;
        const y = cy + Math.sin(a) * maxR;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.stroke();
        // dot at end
        ctx.fillStyle = "rgba(201, 146, 109, 0.5)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <canvas ref={heroCanvas} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 50% 50% at 30% 50%, rgba(14,15,18,0) 0%, rgba(14,15,18,0.7) 70%, rgba(14,15,18,1) 100%)" }}
          aria-hidden="true"
        />
        <div className="container-a relative py-24 md:py-40">
          <div className="max-w-4xl animate-slow-in">
            <div className="eyebrow mb-6">{tr("heroEyebrow")}</div>
            <h1 className="display-1 mb-8">{tr("heroTitle")}</h1>
            <p className="lede max-w-3xl">{tr("heroSubtitle")}</p>
            <div className="mt-12 flex flex-wrap gap-3">
              <Link href="/model" className="btn-primary">{tr("heroCta")} →</Link>
              <a href="#premise" className="btn-ghost">{tr("heroSecondary")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* PREMISES */}
      <section id="premise" className="border-t border-smoke/40 py-24 md:py-32">
        <div className="container-a">
          <div className="eyebrow mb-3">{tr("premiseEyebrow")}</div>
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-3">
            <Premise n="I" titleK="premise1Title" bodyK="premise1Body" />
            <Premise n="II" titleK="premise2Title" bodyK="premise2Body" />
            <Premise n="III" titleK="premise3Title" bodyK="premise3Body" />
          </div>
        </div>
      </section>

      {/* MODULE INDEX */}
      <section className="border-t border-smoke/40 py-24 md:py-32">
        <div className="container-a">
          <div className="eyebrow mb-3">{tr("modIndexEyebrow")}</div>
          <h2 className="display-2 mb-12 max-w-3xl">{tr("modIndexTitle")}</h2>

          <div className="grid gap-px bg-smoke/40 md:grid-cols-2">
            <Mod href="/model" n="I" titleK="cardModelTitle" descK="cardModelDesc" />
            <Mod href="/library" n="II" titleK="cardLibraryTitle" descK="cardLibraryDesc" />
            <Mod href="/levers" n="III" titleK="cardLeversTitle" descK="cardLeversDesc" />
            <Mod href="/collapse" n="IV" titleK="cardCollapseTitle" descK="cardCollapseDesc" rust />
            <Mod href="/simulator" n="V" titleK="cardSimulatorTitle" descK="cardSimulatorDesc" span />
          </div>
        </div>
      </section>
    </main>
  );
}

function Premise({ n, titleK, bodyK }: { n: string; titleK: any; bodyK: any }) {
  const { tr } = useA();
  return (
    <div>
      <div className="font-mono text-sm tracking-[0.2em] text-terracotta">{n}</div>
      <h3 className="display-3 mt-4 mb-5">{tr(titleK)}</h3>
      <p className="prose-body">{tr(bodyK)}</p>
    </div>
  );
}

function Mod({
  href, n, titleK, descK, rust, span,
}: {
  href: string; n: string; titleK: any; descK: any; rust?: boolean; span?: boolean;
}) {
  const { tr } = useA();
  const color = rust ? "text-rust" : "text-terracotta";
  const hover = rust ? "group-hover:text-rust" : "group-hover:text-terracotta";
  return (
    <Link
      href={href}
      className={`group bg-ink p-10 transition-colors hover:bg-ink2 md:p-12 ${span ? "md:col-span-2" : ""}`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`font-mono text-xs tracking-[0.2em] ${color}`}>{n}</span>
        <span className="font-mono text-xs tracking-[0.18em] text-bone transition-colors group-hover:text-paper">→</span>
      </div>
      <h3 className={`display-2 mt-4 transition-colors ${hover}`}>{tr(titleK)}</h3>
      <p className="prose-body mt-4 max-w-md">{tr(descK)}</p>
    </Link>
  );
}
