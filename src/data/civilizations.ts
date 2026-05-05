// 10 civilizations rated 0-100 on the same 7 axes.
// Numbers are best-judgment historical averages over each polity's mature phase.

export type AxisKey =
  | "population"
  | "governance"
  | "economy"
  | "resources"
  | "military"
  | "information"
  | "culture";

export const AXIS_ORDER: AxisKey[] = [
  "population",
  "governance",
  "economy",
  "resources",
  "military",
  "information",
  "culture",
];

export const AXIS_LABEL_KEY: Record<AxisKey, any> = {
  population: "axPopulation",
  governance: "axGovernance",
  economy: "axEconomy",
  resources: "axResources",
  military: "axMilitary",
  information: "axInformation",
  culture: "axCulture",
};

export interface Civ {
  id: string;
  en: string;
  zh: string;
  era: string;
  values: Record<AxisKey, number>;
  noteEn: string;
  noteZh: string;
  collapseEn: string;
  collapseZh: string;
}

export const CIVS: Civ[] = [
  {
    id: "rome",
    en: "Roman Empire (mature)",
    zh: "罗马帝国（成熟期）",
    era: "27 BCE – 235 CE",
    values: { population: 75, governance: 80, economy: 60, resources: 70, military: 90, information: 50, culture: 80 },
    noteEn: "Centralized, tax-extractive, military-bonded. Stability through standing legions and a transport network covering the Mediterranean. Cultural cohesion via citizenship grants and lingua franca.",
    noteZh: "中央集权、税赋抽取、靠军队黏合。靠常备军团和环地中海的交通网维系稳定。靠公民权扩张与通用语提供文化凝聚力。",
    collapseEn: "Élite overproduction → civil wars (235–284). Currency debasement → economic erosion. Frontier tax base shrunk; Western half could no longer sustain its complexity.",
    collapseZh: "精英过剩 → 内战不断（235–284）。货币贬值 → 经济侵蚀。边境税基缩小；西半部再也无法支撑自己的复杂度。",
  },
  {
    id: "han",
    en: "Han China",
    zh: "汉",
    era: "202 BCE – 220 CE",
    values: { population: 80, governance: 75, economy: 65, resources: 75, military: 70, information: 50, culture: 85 },
    noteEn: "Bureaucratic centralization with Confucian ideology binding élite cooperation. Iron, paper, and irrigation gave a strong material base. Examination system meritocratized parts of the bureaucracy.",
    noteZh: "中央集权式官僚制，配合儒家意识形态把精英黏合在一起。铁器、纸、水利给出坚实的物质底子。察举—后世科举使部分官僚体制走向择优。",
    collapseEn: "Salt-iron monopoly tensions; eunuch-warlord factionalism; Yellow Turban rebellion seeded by inequality and famine; collapse into Three Kingdoms.",
    collapseZh: "盐铁专卖引发利益冲突；宦官与豪强相互倾轧；不平等与饥荒催生黄巾之乱；终至三国分立。",
  },
  {
    id: "athens",
    en: "Athens (Classical)",
    zh: "雅典（古典期）",
    era: "508 – 322 BCE",
    values: { population: 25, governance: 30, economy: 50, resources: 45, military: 55, information: 75, culture: 75 },
    noteEn: "Direct democracy in a small polis. High information openness — citizens debated everything. Economy specialized in maritime trade, silver mines (Laurion). Cultural production unmatched.",
    noteZh: "在一座小城邦里实施直接民主。信息高度开放——市民议事，无所不论。经济专注海上贸易和劳里昂银矿。文化产出登峰造极。",
    collapseEn: "Peloponnesian War overstrain. Democracy could decide quickly but also collectively decide foolishly (Sicilian Expedition). Plague + war drained citizen pool. Macedonian conquest finished it.",
    collapseZh: "伯罗奔尼撒战争把它榨干。民主能快速决策，也能集体地做出蠢决策（远征西西里）。瘟疫加战争耗尽公民储备。马其顿征服终结之。",
  },
  {
    id: "venice",
    en: "Venetian Republic",
    zh: "威尼斯共和国",
    era: "697 – 1797 CE",
    values: { population: 30, governance: 60, economy: 70, resources: 35, military: 60, information: 60, culture: 65 },
    noteEn: "Aristocratic republic with elaborate veto-balanced institutions (Doge, Senate, Council of Ten) preventing autocrat capture. Maritime trade empire on the Adriatic. Innovated double-entry bookkeeping, marine insurance, state-managed shipyards.",
    noteZh: "贵族共和国，靠复杂的相互否决机制（总督、元老院、十人议会）防止独裁俘获。亚得里亚海上的海贸帝国。发明了复式记账、海上保险、国家级造船厂。",
    collapseEn: "Lost trade routes after Vasco da Gama (1497). Ottoman pressure ate the eastern Mediterranean. Slow decline of about 300 years. Napoleon ended the husk in 1797.",
    collapseZh: "1497 年达伽马开辟新航线后失去贸易主导。奥斯曼压力蚕食东地中海。约 300 年的缓慢衰落。1797 年拿破仑了结其残余。",
  },
  {
    id: "mongol",
    en: "Mongol Empire",
    zh: "蒙古帝国",
    era: "1206 – 1368 CE",
    values: { population: 30, governance: 65, economy: 35, resources: 80, military: 95, information: 70, culture: 30 },
    noteEn: "Largest contiguous empire in history. Nomadic mobility + meritocratic command + integrated postal-relay network ('yam') + trade route protection. Information flow across Eurasia briefly accelerated.",
    noteZh: "史上最大的连续陆地帝国。游牧机动性 + 任人唯贤的指挥体系 + 完整的驿传网络（「站赤」）+ 商路保护。短期内大幅加速了欧亚之间的信息流动。",
    collapseEn: "Inheritance fragmentation: split into four khanates. Sedentary administration was never the strength. Black Death (1346+) devastated Yuan China and the trade routes that financed cohesion.",
    collapseZh: "继承制度碎裂：分成四大汗国。定居式行政从来不是其强项。1346 年起的黑死病重创元朝中国与维系凝聚的商路。",
  },
  {
    id: "ming",
    en: "Ming China",
    zh: "明",
    era: "1368 – 1644 CE",
    values: { population: 90, governance: 85, economy: 70, resources: 70, military: 60, information: 35, culture: 80 },
    noteEn: "Massive population, tight central bureaucracy. Treasure-fleet voyages 1405–1433 then withdrawn. Information became more closed in mid-period. Silver-import dependency from the Americas.",
    noteZh: "庞大人口，严密中央官僚。1405–1433 年的宝船下西洋，之后收缩。中后期信息趋于封闭。靠美洲白银输入支撑财政。",
    collapseEn: "Little Ice Age + tax base collapse + American silver supply disruption + Li Zicheng peasant rebellion + Manchu invasion. Multi-shock cascade.",
    collapseZh: "小冰期 + 税基崩溃 + 美洲白银供应中断 + 李自成农民起义 + 满洲入关。多重冲击级联。",
  },
  {
    id: "ussr",
    en: "USSR",
    zh: "苏联",
    era: "1922 – 1991 CE",
    values: { population: 70, governance: 95, economy: 55, resources: 85, military: 85, information: 15, culture: 60 },
    noteEn: "Maximal central planning. Resources abundant (Siberian energy + minerals). Information hyper-restricted: censorship, propaganda, samizdat as escape valve. Couldn't iterate fast enough on the digital economy.",
    noteZh: "极端中央计划。资源极其充裕（西伯利亚能源 + 矿产）。信息高度受限：审查、宣传、地下刊物作为出气口。在数字经济上无法以足够快的速度迭代。",
    collapseEn: "Information blockade prevented learning from the West fast enough. Economic stagnation by the 70s. Afghanistan drain. Glasnost opened the dam too late; system disintegrated 1989–91.",
    collapseZh: "信息封锁导致跟西方比起来学得不够快。70 年代经济陷入停滞。阿富汗持续放血。改革开放放闸已晚；1989–91 年解体。",
  },
  {
    id: "us",
    en: "United States (modern)",
    zh: "美利坚（现代）",
    era: "1945 – present",
    values: { population: 75, governance: 50, economy: 90, resources: 85, military: 95, information: 80, culture: 55 },
    noteEn: "Federal democracy with strong markets. Resource-rich continental base. Reserve currency status. High information openness. Cultural cohesion declining; political polarization rising.",
    noteZh: "联邦制民主与强市场。大陆型资源底子。储备货币地位。信息高度开放。文化凝聚力在下降；政治极化在上升。",
    collapseEn: "Open question. Risks: élite overproduction (multiplying credentialed candidates with no senate seats); financialization outpacing real economy; cultural fragmentation; debt accumulation.",
    collapseZh: "尚未定论。已知风险：精英过剩（学位过剩、可坐席位不足）；金融化跑赢实体经济；文化分裂；债务持续累积。",
  },
  {
    id: "singapore",
    en: "Singapore",
    zh: "新加坡",
    era: "1965 – present",
    values: { population: 35, governance: 85, economy: 90, resources: 25, military: 50, information: 55, culture: 80 },
    noteEn: "Authoritarian-meritocratic city-state. Resource-poor by geography; built itself by becoming a node in trade and finance. Tight cultural management. High economic complexity for a small population.",
    noteZh: "威权式精英治理的城市国家。地理上资源匮乏；通过把自己变成贸易与金融的节点来求生。文化上管理严格。在很小人口规模上做到极高的经济复杂度。",
    collapseEn: "Risks: political brittleness during succession (the model depends on continued élite competence); fertility crisis; extreme exposure to global trade shocks.",
    collapseZh: "风险：权力交接期的政治脆弱性（模式依赖精英能力的持续）；少子化危机；对全球贸易冲击的极端暴露。",
  },
  {
    id: "dao",
    en: "Hypothetical DAO civilization",
    zh: "假设性的 DAO 文明",
    era: "speculative",
    values: { population: 40, governance: 15, economy: 75, resources: 50, military: 20, information: 95, culture: 35 },
    noteEn: "Fully decentralized governance via on-chain voting and reputation. Information radically open. Coordination breaks down at scale; hard to make irreversible commitments. No persistent military capacity.",
    noteZh: "通过链上投票与声誉实现完全去中心化的治理。信息彻底开放。在规模化时协调机制会失灵；难以做出不可逆的承诺。没有持续性的军事能力。",
    collapseEn: "Hasn't happened at civilization scale. Theoretical failure modes: governance attacks via flash-loaned voting power, identity collapse, loss of credible commitment, inability to defend against any state-level coercion.",
    collapseZh: "尚未在文明规模上发生过。理论上的失败模式：闪电贷投票权治理攻击、身份失效、可信承诺缺位、无法抵御任何国家级强制力。",
  },
];
