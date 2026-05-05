export type Lang = "en" | "zh";
type T = { en: string; zh: string };
type Dict = Record<string, T>;

export const t: Dict = {
  brand: { en: "Civilization Architect", zh: "文明架构师" },
  langToggle: { en: "中文", zh: "EN" },

  // Nav
  navModel: { en: "Model", zh: "模型" },
  navLibrary: { en: "Library", zh: "案例库" },
  navLevers: { en: "Levers", zh: "杠杆" },
  navCollapse: { en: "Collapse", zh: "兴衰" },
  navSimulator: { en: "Simulator", zh: "模拟器" },

  // ── Landing
  heroEyebrow: { en: "A system for modeling, comparing, and designing civilizations", zh: "一个用来建模、比较、设计文明的系统" },
  heroTitle: { en: "Civilizations are systems, not stories.", zh: "文明是系统，不是故事。" },
  heroSubtitle: {
    en: "Treat a civilization as a function of seven variables — population, governance, economy, resources, military, information flow, cultural norms — and most of its history becomes legible. Roman expansion, Ming retreat, Soviet collapse, Singaporean ascent: same schema, different parameter values, different outcomes.",
    zh: "把文明看作七个变量的函数——人口、治理、经济、资源、军事、信息流、文化规范——它的多数历史就变得可读了。罗马的扩张、明的内敛、苏联的崩溃、新加坡的崛起：同一套参数，不同的取值，不同的结局。",
  },
  heroCta: { en: "Open the model", zh: "进入模型" },
  heroSecondary: { en: "Read the premise", zh: "阅读前提" },

  premiseEyebrow: { en: "Three premises", zh: "三个前提" },
  premise1Title: { en: "Civilization is parametric.", zh: "文明是参数化的。" },
  premise1Body: {
    en: "Treat civilization as a vector in seven dimensions and the comparisons stop being qualitative. Two civilizations with similar values on those axes will fail in similar ways, regardless of which century or continent they occupy.",
    zh: "把文明视作一个七维向量，比较就不再只是定性的了。两个在这些轴上取值相近的文明，它们失败的方式也会相似——不管处于哪个世纪、哪个大陆。",
  },
  premise2Title: { en: "Collapse is structural, not narrative.", zh: "崩溃是结构性的，不是叙事性的。" },
  premise2Body: {
    en: "Most collapses are not surprise events. They are slow accumulations of complexity past the point where the resource base can sustain it. Tainter's law, élite overproduction, climate shock, debt cascades — these are reproducible mechanisms, not stories about bad emperors.",
    zh: "多数崩溃不是意外事件。它们是复杂度持续累积，越过了资源基础能维持的临界点。Tainter 定律、精英过剩、气候冲击、债务级联——这些是可复现的机制，不是关于「昏君」的故事。",
  },
  premise3Title: { en: "Design is possible.", zh: "设计是可能的。" },
  premise3Body: {
    en: "If a civilization is parametric, its parameters are choices. Most of those choices were made unconsciously, by accident or inertia. A civilization could be designed deliberately. The question is whether to copy what works, modify what's mediocre, or attempt something new — and the schema lets you ask that question concretely.",
    zh: "若文明是参数化的，其参数就是选择。多数选择是无意识做出的——出于偶然或惯性。文明本可以被刻意设计。问题在于是要照搬有效的、修改平庸的、还是尝试全新的——而这套模型让你可以具体地问出这个问题。",
  },

  // Module index
  modIndexEyebrow: { en: "Five chambers", zh: "五个分卷" },
  modIndexTitle: { en: "From schema to library to simulation.", zh: "从模型到案例库到模拟。" },

  cardModelTitle: { en: "The Model", zh: "模型" },
  cardModelDesc: { en: "Seven axes that define any civilization. Pull any slider and watch the radar reshape — and the implications appear.", zh: "定义任何文明的七条轴。拨动任意滑块，雷达图随之变形——其后果也随之显现。" },
  cardLibraryTitle: { en: "The Library", zh: "案例库" },
  cardLibraryDesc: { en: "Ten historical civilizations, each rendered on the same seven axes. Compare any two — Rome vs Ming, Athens vs Singapore — on identical scales.", zh: "十个历史文明，每一个都画在同一套七条轴上。任选两个比较——罗马 vs 明，雅典 vs 新加坡——同尺同度。" },
  cardLeversTitle: { en: "The Levers", zh: "杠杆" },
  cardLeversDesc: { en: "Three control surfaces — governance, economy, information — each compared on stability, throughput, and fragility.", zh: "三个控制面——治理、经济、信息——分别按稳定性、吞吐量、脆弱性进行比较。" },
  cardCollapseTitle: { en: "Rise & Collapse", zh: "兴衰" },
  cardCollapseDesc: { en: "What makes them rise: institution × resource × population compounding. What breaks them: complexity ceilings, élite overproduction, climate shock, debt.", zh: "崛起靠什么：制度 × 资源 × 人口的复利。崩溃因什么：复杂度天花板、精英过剩、气候冲击、债务。" },
  cardSimulatorTitle: { en: "The Simulator", zh: "模拟器" },
  cardSimulatorDesc: { en: "Set the seven variables. Run forward. Watch the civilization grow, stabilize, or decline under random shocks. Save state via URL.", zh: "设定七个变量。向前推演。看着这个文明在随机冲击下生长、稳定，或衰落。可通过 URL 保存状态。" },

  // ── Model
  modelEyebrow: { en: "Module · 1", zh: "模块·一" },
  modelTitle: { en: "Seven axes.", zh: "七条轴。" },
  modelSubtitle: {
    en: "Each axis is a 0-100 score. Move the sliders to see how a hypothetical civilization sits on the radar. The descriptions below explain what high and low values mean for each axis.",
    zh: "每条轴都是 0-100 分。拖动滑块，看一个假设的文明在雷达图上呈现的形状。下方说明解释每条轴上「高」与「低」分别意味着什么。",
  },
  modelReset: { en: "Reset", zh: "重置" },
  modelPreset: { en: "Load preset", zh: "加载预设" },

  axPopulation: { en: "Population mass", zh: "人口规模" },
  axGovernance: { en: "Governance centralization", zh: "治理集权度" },
  axEconomy: { en: "Economic complexity", zh: "经济复杂度" },
  axResources: { en: "Resource access", zh: "资源获取" },
  axMilitary: { en: "Military power", zh: "军事力量" },
  axInformation: { en: "Information openness", zh: "信息开放度" },
  axCulture: { en: "Cultural cohesion", zh: "文化凝聚力" },

  axPopulationDescEn: { en: "Total population × density. Below ~30: small polity, narrow specialization possible. Above ~70: imperial scale, mass coordination possible but harder to retract.", zh: "总人口 × 密度。约 30 以下：小型政体，仅能做窄向专业化。约 70 以上：帝国级规模，能做大规模协调，但难收回。" },
  axGovernanceDescEn: { en: "How concentrated decision-making is. Low: federation / network / DAO. Mid: republic / parliamentary. High: empire / autocracy. Both extremes are stable on different time-scales.", zh: "决策的集中程度。低：联邦 / 网络 / DAO。中：共和 / 议会。高：帝国 / 专制。两种极端在不同时间尺度上都是稳定的。" },
  axEconomyDescEn: { en: "Sophistication of production and exchange. Low: subsistence agriculture. Mid: industrial. High: digital / financialized. Higher complexity = higher throughput, also higher cascade-failure risk.", zh: "生产与交换的复杂度。低：自给农业。中：工业化。高：数字化 / 金融化。复杂度越高，吞吐越高，同时级联失败的风险也越高。" },
  axResourcesDescEn: { en: "Energy + raw materials per capita. The hard floor under everything else. No civilization sustains complexity above what its resource base permits.", zh: "人均能源 + 原材料。决定一切的下限。没有任何文明能维持超过其资源基础所容许的那种复杂度。" },
  axMilitaryDescEn: { en: "Coercive capacity. Low: vulnerable to external pressure. High: secure but tax-heavy; also vulnerable to praetorian capture from inside.", zh: "强制性力量。低：易受外部压力。高：安全但税负重；同时也容易被内部禁卫军式掌权者反噬。" },
  axInformationDescEn: { en: "How freely information moves. Low: censorship, slow learning, brittle. High: rapid learning but unstable in high-resource-stress conditions.", zh: "信息流动的自由度。低：审查严格，学习缓慢，脆弱。高：学习迅速，但在高资源压力下不稳定。" },
  axCultureDescEn: { en: "Shared narrative + identity binding strangers into cooperation. Low: factional fragmentation. High: cooperation easy but adaptation slow.", zh: "把陌生人黏合为合作的共同叙事与身份。低：派系分裂。高：合作容易，但适应缓慢。" },

  // Library
  libraryEyebrow: { en: "Module · 2", zh: "模块·二" },
  libraryTitle: { en: "Ten civilizations on the same axes.", zh: "十个文明，画在同一套轴上。" },
  librarySubtitle: {
    en: "Pick one, see its profile. Pick a second, see them overlaid. The profile is what made each one work — and what eventually broke it.",
    zh: "选一个，看它的画像。再选一个，看两者叠在一起。画像本身就是让它运转的东西——也是最终把它压垮的东西。",
  },

  // Levers
  leversEyebrow: { en: "Module · 3", zh: "模块·三" },
  leversTitle: { en: "Three control surfaces.", zh: "三个控制面。" },
  leversSubtitle: {
    en: "Governance decides who chooses. Economy decides what gets produced. Information decides who knows what. Every civilization has a setting on each — and the cell it falls into determines what kinds of failure it is exposed to.",
    zh: "治理决定谁来选择。经济决定生产什么。信息决定谁知道什么。每个文明在三者上都有一个取值——它落在哪个格子里，决定了它会暴露在哪些失败模式之下。",
  },
  leverGovernance: { en: "Governance", zh: "治理" },
  leverEconomy: { en: "Economy", zh: "经济" },
  leverInformation: { en: "Information", zh: "信息" },
  leverThroughput: { en: "Throughput", zh: "吞吐" },
  leverStability: { en: "Stability", zh: "稳定性" },
  leverFragility: { en: "Fragility", zh: "脆弱性" },

  // Collapse
  collapseEyebrow: { en: "Module · 4", zh: "模块·四" },
  collapseTitle: { en: "Why they rise. Why they break.", zh: "它们凭什么崛起，又因何崩溃。" },
  collapseSubtitle: {
    en: "Compounding works for civilizations the way it works for capital — for a while. Then complexity outruns its resource base, élites multiply faster than meaningful positions, debt outpaces production, climate stops cooperating. Each historical collapse is one of these mechanisms hitting first.",
    zh: "复利对文明的作用，像对资本一样——一段时间内有效。然后复杂度超过资源基础，精英增速超过有意义岗位的增速，债务超过产出，气候不再配合。历史上的每次崩溃，都是其中某个机制率先触发。",
  },
  riseTitle: { en: "Rise factors", zh: "崛起的因素" },
  collapseTitleSection: { en: "Collapse triggers", zh: "崩溃的触发" },

  // Simulator
  simEyebrow: { en: "Module · 5", zh: "模块·五" },
  simTitle: { en: "Design a civilization. Run it forward.", zh: "设计一个文明，让它向前演化。" },
  simSubtitle: {
    en: "Set seven variables and a small handful of policy levers. The simulator runs 200 model-years with random shocks (climate, war, plague, financial crisis). Watch population, GDP, and instability evolve. Save state via URL.",
    zh: "设定七个变量与少量政策杠杆。模拟器会跑 200 个模型年，期间有随机冲击（气候、战争、瘟疫、金融危机）。看着人口、GDP、不稳定度演化。可通过 URL 保存状态。",
  },
  simRun: { en: "Run", zh: "运行" },
  simPause: { en: "Pause", zh: "暂停" },
  simReset: { en: "Reset", zh: "重置" },
  simYear: { en: "Year", zh: "年份" },
  simPopulation: { en: "Population", zh: "人口" },
  simGDP: { en: "GDP index", zh: "GDP 指数" },
  simInstability: { en: "Instability", zh: "不稳定度" },
  simShockClimate: { en: "Climate shock", zh: "气候冲击" },
  simShockWar: { en: "War", zh: "战争" },
  simShockPlague: { en: "Plague", zh: "瘟疫" },
  simShockFinancial: { en: "Financial crisis", zh: "金融危机" },
  simShare: { en: "Share state", zh: "分享状态" },

  // Footer
  footerLine: { en: "Civilizations are designed. Most of them, badly.", zh: "文明都是被设计出来的。多数被设计得很糟。" },
  footerPart: { en: "Part of", zh: "属于" },
  footerPsyverse: { en: "the Psyverse", zh: "Psyverse 宇宙" },
};

export const tr = (k: keyof typeof t, lang: Lang) => t[k][lang];
