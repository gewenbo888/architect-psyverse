"use client";

import { useEffect, useState } from "react";
import { useA } from "@/lib/providers";
import { AXIS_ORDER, AXIS_LABEL_KEY, type AxisKey, CIVS } from "@/data/civilizations";
import { Radar } from "@/components/Radar";

const AXIS_DESC_KEY: Record<AxisKey, any> = {
  population: "axPopulationDescEn",
  governance: "axGovernanceDescEn",
  economy: "axEconomyDescEn",
  resources: "axResourcesDescEn",
  military: "axMilitaryDescEn",
  information: "axInformationDescEn",
  culture: "axCultureDescEn",
};

const DEFAULT_VALUES: Record<AxisKey, number> = {
  population: 50, governance: 50, economy: 50, resources: 50,
  military: 50, information: 50, culture: 50,
};

export default function ModelPage() {
  const { tr, lang } = useA();
  const [values, setValues] = useState<Record<AxisKey, number>>(DEFAULT_VALUES);

  // Restore from URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const vals: Partial<Record<AxisKey, number>> = {};
    let any = false;
    AXIS_ORDER.forEach((k) => {
      const v = parseInt(p.get(k) || "");
      if (isFinite(v) && v >= 0 && v <= 100) { vals[k] = v; any = true; }
    });
    if (any) setValues({ ...DEFAULT_VALUES, ...vals });
  }, []);
  // Sync to URL
  useEffect(() => {
    const p = new URLSearchParams();
    AXIS_ORDER.forEach((k) => p.set(k, String(values[k])));
    window.history.replaceState({}, "", `${window.location.pathname}?${p.toString()}`);
  }, [values]);

  return (
    <main className="container-a py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("modelEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("modelTitle")}</h1>
        <p className="lede max-w-2xl">{tr("modelSubtitle")}</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Radar */}
        <div className="card !p-6 lg:sticky lg:top-20 lg:self-start">
          <Radar values={values} size={400} />
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          {AXIS_ORDER.map((k) => (
            <div key={k} className="card !py-5">
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                <span>{tr(AXIS_LABEL_KEY[k])}</span>
                <span className="stat-num text-terracotta">{values[k]}</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={values[k]}
                onChange={(e) => setValues((v) => ({ ...v, [k]: parseInt(e.target.value) }))}
                className="slider-a"
              />
              <p className="prose-body mt-3 text-[0.875rem]">{tr(AXIS_DESC_KEY[k])}</p>
            </div>
          ))}

          {/* Presets */}
          <div className="card">
            <div className="eyebrow mb-3">{tr("modelPreset")}</div>
            <div className="flex flex-wrap gap-2">
              {CIVS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setValues(c.values)}
                  className="pill"
                >
                  {lang === "zh" ? c.zh : c.en}
                </button>
              ))}
              <button
                onClick={() => setValues(DEFAULT_VALUES)}
                className="pill border-rust/40 hover:border-rust hover:text-rust"
              >
                ✕ {tr("modelReset")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
