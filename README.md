# Civilization Architect · 文明架构师

> Civilizations are systems, not stories.
> 文明是系统，不是故事。

A modeling system for civilizations. Treat each civilization as a vector in
seven dimensions — population, governance, economy, resources, military,
information flow, cultural norms — and the comparisons stop being qualitative.

## Links

- **Live:** [architect.psyverse.fun](https://architect.psyverse.fun)
- **Vercel:** [architect-psyverse.vercel.app](https://architect-psyverse.vercel.app)
- **GitHub:** [github.com/gewenbo888/architect-psyverse](https://github.com/gewenbo888/architect-psyverse)

## Modules

- `/model` — Interactive 7-axis radar with sliders. Pull any axis, see the shape change. Load presets from the library.
- `/library` — 10 historical civilizations on the same 7 axes: Roman Empire, Han China, Athens, Venice, Mongol Empire, Ming, USSR, modern US, Singapore, hypothetical-DAO. Compare any two.
- `/levers` — Three control surfaces (governance / economy / information) compared on throughput, stability, fragility with real examples.
- `/collapse` — 4 rise factors and 5 collapse triggers (Tainter, élite overproduction, climate shock, debt cascade, information closure). Each historical civilization annotated with its primary trigger.
- `/simulator` — 200-year simulation. Set the 7 variables, press Run, watch population / GDP / instability evolve under random shocks (climate, war, plague, financial crisis). Save state via URL.

## Stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS, Cinzel + Inter + JetBrains Mono
- All hand-curated content; pure SVG visualizations; static, no backend
- Bilingual EN / 中文 with localStorage persistence

## About

Part of the [Psyverse](https://psyverse.fun) portfolio by [Gewenbo](https://psyverse.fun).
