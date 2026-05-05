"use client";

import { useEffect, useRef, useState } from "react";
import { useA } from "@/lib/providers";
import { AXIS_ORDER, AXIS_LABEL_KEY, type AxisKey, CIVS } from "@/data/civilizations";

const DEFAULT_VALUES: Record<AxisKey, number> = {
  population: 50, governance: 50, economy: 50, resources: 50,
  military: 50, information: 50, culture: 50,
};

interface Frame {
  year: number;
  population: number; // index, starts 100
  gdp: number;       // index, starts 100
  instability: number; // 0-100
  shock?: string;
}

const TOTAL_YEARS = 200;

function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function simulate(values: Record<AxisKey, number>, seed: number): Frame[] {
  const rng = mulberry32(seed);
  const frames: Frame[] = [];
  let pop = 100;
  let gdp = 100;
  let instability = 0;

  // Compute "growth rate" and "fragility" from the input values
  // Rough heuristics — emphasize the structural patterns from /collapse
  const v = values;

  // Per-tick growth fueled by economy × resources × institutions
  const growthBase = ((v.economy / 100) * 0.6 + (v.resources / 100) * 0.4) * 0.04;
  // Damped by complexity ceiling: more pop + more economy → harder to add the next layer
  const ceilingCost = (v.economy / 100) * 0.5 + (pop / 100) * 0.3;

  // Fragility — propensity to be hurt by shocks
  const fragility =
    0.4 +
    (Math.abs(v.governance - 50) / 100) * 0.2 + // extremes more fragile
    ((100 - v.information) / 100) * 0.25 +
    ((100 - v.culture) / 100) * 0.2;

  // Resource ceiling — hard cap on long-run population
  const resourceCap = (v.resources / 100) * 200; // up to 2x base

  for (let year = 1; year <= TOTAL_YEARS; year++) {
    // Random shocks (weighted)
    let shock: string | undefined;
    let shockMagnitude = 0;
    const r = rng();
    if (year > 5) {
      if (r < 0.02) { shock = "war"; shockMagnitude = 12; }
      else if (r < 0.035) { shock = "plague"; shockMagnitude = 18; }
      else if (r < 0.05) { shock = "climate"; shockMagnitude = 10; }
      else if (r < 0.06) { shock = "financial"; shockMagnitude = 14; }
    }

    // Growth this year
    const ceilingPenalty = pop > resourceCap ? (pop - resourceCap) / 200 : 0;
    const ageDrag = year * 0.0001; // slight decline as institutions calcify
    const growth = growthBase * (1 - ageDrag) - ceilingPenalty;
    pop = Math.max(0, pop * (1 + growth - shockMagnitude * fragility * 0.01));
    gdp = Math.max(0, gdp * (1 + growth * 1.2 - shockMagnitude * fragility * 0.012 - ageDrag));

    // Instability accumulates with élite overproduction (high economy + low resources)
    const eliteOverprod = Math.max(0, (v.economy - v.resources) / 100) * 0.15;
    const informationCost = ((100 - v.information) / 100) * 0.05;
    const recoverRate = 0.04 * (v.governance / 100); // strong governance can dampen
    instability += eliteOverprod + informationCost + (shockMagnitude * fragility * 0.1) - recoverRate;
    instability = Math.max(0, Math.min(100, instability));

    // Hard collapse if instability + low pop
    if (instability > 80 && pop < 50) {
      pop = pop * 0.85;
      gdp = gdp * 0.8;
    }

    frames.push({
      year,
      population: Math.round(pop * 100) / 100,
      gdp: Math.round(gdp * 100) / 100,
      instability: Math.round(instability * 10) / 10,
      shock,
    });
  }
  return frames;
}

export default function SimulatorPage() {
  const { tr, lang } = useA();
  const [values, setValues] = useState<Record<AxisKey, number>>(DEFAULT_VALUES);
  const [seed, setSeed] = useState<number>(42);
  const [running, setRunning] = useState(false);
  const [year, setYear] = useState(0);
  const framesRef = useRef<Frame[]>([]);

  // restore from URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const vals: Partial<Record<AxisKey, number>> = {};
    AXIS_ORDER.forEach((k) => {
      const v = parseInt(p.get(k) || "");
      if (isFinite(v) && v >= 0 && v <= 100) vals[k] = v;
    });
    if (Object.keys(vals).length) setValues({ ...DEFAULT_VALUES, ...vals });
    const s = parseInt(p.get("seed") || "");
    if (isFinite(s)) setSeed(s);
  }, []);
  // sync URL
  useEffect(() => {
    const p = new URLSearchParams();
    AXIS_ORDER.forEach((k) => p.set(k, String(values[k])));
    p.set("seed", String(seed));
    window.history.replaceState({}, "", `${window.location.pathname}?${p.toString()}`);
  }, [values, seed]);

  // recompute frames when inputs change
  useEffect(() => {
    framesRef.current = simulate(values, seed);
    setYear(0);
    setRunning(false);
  }, [values, seed]);

  // animate
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setYear((y) => {
        if (y >= TOTAL_YEARS) {
          setRunning(false);
          return y;
        }
        return y + 2;
      });
    }, 60);
    return () => clearInterval(id);
  }, [running]);

  const frame = framesRef.current[Math.max(0, year - 1)];
  const visibleFrames = framesRef.current.slice(0, year);

  return (
    <main className="container-a py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("simEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("simTitle")}</h1>
        <p className="lede max-w-2xl">{tr("simSubtitle")}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Plot */}
        <div className="card !p-6">
          <Plot frames={visibleFrames} />

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {running ? (
              <button onClick={() => setRunning(false)} className="btn-primary">
                {tr("simPause")}
              </button>
            ) : (
              <button onClick={() => { if (year >= TOTAL_YEARS) setYear(0); setRunning(true); }} className="btn-primary">
                {tr("simRun")}
              </button>
            )}
            <button onClick={() => { setYear(0); setRunning(false); }} className="btn-ghost">
              {tr("simReset")}
            </button>
            <button
              onClick={() => setSeed(Math.floor(Math.random() * 1e9))}
              className="btn-ghost"
            >
              {lang === "en" ? "Reroll seed" : "重置随机数"}
            </button>
            <span className="ml-auto font-mono text-xs text-bone">
              {tr("simYear")}: <span className="text-paper">{year}</span> / {TOTAL_YEARS} · seed {seed}
            </span>
          </div>

          {/* Live stats */}
          {frame && (
            <div className="mt-6 grid gap-px bg-smoke/40 md:grid-cols-3">
              <div className="bg-ink p-4">
                <div className="eyebrow mb-1">{tr("simPopulation")}</div>
                <div className="stat-num text-2xl text-terracotta">{frame.population.toFixed(1)}</div>
              </div>
              <div className="bg-ink p-4">
                <div className="eyebrow mb-1">{tr("simGDP")}</div>
                <div className="stat-num text-2xl text-verdigris">{frame.gdp.toFixed(1)}</div>
              </div>
              <div className="bg-ink p-4">
                <div className="eyebrow mb-1 text-rust">{tr("simInstability")}</div>
                <div className="stat-num text-2xl text-rust">{frame.instability.toFixed(1)}</div>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <aside className="space-y-3">
          <div className="card !py-4">
            <div className="eyebrow mb-2">{tr("modelPreset")}</div>
            <div className="flex flex-wrap gap-2">
              {CIVS.map((c) => (
                <button key={c.id} onClick={() => setValues(c.values)} className="pill">
                  {lang === "zh" ? c.zh : c.en}
                </button>
              ))}
            </div>
          </div>
          {AXIS_ORDER.map((k) => (
            <div key={k} className="card !py-3">
              <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                <span>{tr(AXIS_LABEL_KEY[k])}</span>
                <span className="stat-num text-terracotta">{values[k]}</span>
              </div>
              <input
                type="range"
                min={0} max={100} step={1}
                value={values[k]}
                onChange={(e) => setValues((v) => ({ ...v, [k]: parseInt(e.target.value) }))}
                className="slider-a"
              />
            </div>
          ))}
        </aside>
      </div>
    </main>
  );
}

function Plot({ frames }: { frames: Frame[] }) {
  const W = 720, H = 280, PAD = 36;
  if (!frames.length) {
    return (
      <div className="flex h-[280px] items-center justify-center text-bone">
        <p className="prose-body italic">Press Run to start the simulation.</p>
      </div>
    );
  }
  const maxPop = Math.max(...frames.map((f) => f.population), 100);
  const maxGDP = Math.max(...frames.map((f) => f.gdp), 100);
  const xOf = (year: number) => PAD + (year / TOTAL_YEARS) * (W - 2 * PAD);
  const yOfPop = (v: number) => H - PAD - (v / Math.max(maxPop, 200)) * (H - 2 * PAD);
  const yOfGDP = (v: number) => H - PAD - (v / Math.max(maxGDP, 200)) * (H - 2 * PAD);
  const yOfInst = (v: number) => H - PAD - (v / 100) * (H - 2 * PAD);

  const popPath = frames.map((f, i) => `${i === 0 ? "M" : "L"} ${xOf(f.year)} ${yOfPop(f.population)}`).join(" ");
  const gdpPath = frames.map((f, i) => `${i === 0 ? "M" : "L"} ${xOf(f.year)} ${yOfGDP(f.gdp)}`).join(" ");
  const instPath = frames.map((f, i) => `${i === 0 ? "M" : "L"} ${xOf(f.year)} ${yOfInst(f.instability)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" style={{ maxHeight: 320 }}>
      {/* axes */}
      <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#272A33" />
      <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#272A33" />

      {/* year ticks */}
      {[0, 50, 100, 150, 200].map((y) => (
        <g key={y}>
          <line x1={xOf(y)} y1={H - PAD} x2={xOf(y)} y2={H - PAD + 4} stroke="#6B6E7A" />
          <text x={xOf(y)} y={H - PAD + 16} fontSize="9" fill="#6B6E7A" textAnchor="middle" fontFamily="ui-monospace">
            yr {y}
          </text>
        </g>
      ))}

      {/* shock markers */}
      {frames.filter((f) => f.shock).map((f, i) => (
        <line
          key={i}
          x1={xOf(f.year)} y1={PAD} x2={xOf(f.year)} y2={H - PAD}
          stroke="#A23B3B"
          strokeWidth="0.6"
          opacity="0.4"
          strokeDasharray="2 3"
        />
      ))}

      {/* paths */}
      <path d={instPath} fill="none" stroke="#A23B3B" strokeWidth="1.4" opacity="0.85" />
      <path d={gdpPath} fill="none" stroke="#82A09C" strokeWidth="1.6" />
      <path d={popPath} fill="none" stroke="#C9926D" strokeWidth="2" />

      {/* legend */}
      <g transform={`translate(${PAD + 8}, ${PAD + 4})`}>
        <rect width="8" height="2" fill="#C9926D" y="3" /><text x="14" y="9" fontSize="10" fill="#E8E2D2" fontFamily="ui-monospace">population</text>
        <rect width="8" height="2" fill="#82A09C" y="17" /><text x="14" y="23" fontSize="10" fill="#E8E2D2" fontFamily="ui-monospace">gdp</text>
        <rect width="8" height="2" fill="#A23B3B" y="31" /><text x="14" y="37" fontSize="10" fill="#E8E2D2" fontFamily="ui-monospace">instability</text>
      </g>
    </svg>
  );
}
