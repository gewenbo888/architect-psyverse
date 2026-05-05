"use client";

import { useA } from "@/lib/providers";
import { CIVS } from "@/data/civilizations";

interface Mech {
  en: string; zh: string;
  whatEn: string; whatZh: string;
  examplesEn: string; examplesZh: string;
}

const RISES: Mech[] = [
  {
    en: "Resource × institution × population compounding",
    zh: "资源 × 制度 × 人口的复利",
    whatEn: "When the three reinforce each other, growth is exponential. Each marginal unit of resource enables more population, which fuels more institutions, which extract resources more efficiently.",
    whatZh: "当三者相互正向反馈时，增长是指数型的。每多一单位资源，可以养活更多人口，养出更多制度，再把资源抽取得更高效。",
    examplesEn: "Han iron + bureaucracy + farming; Roman roads + legions + tax extraction; British coal + finance + industrial labour.",
    examplesZh: "汉的铁器 + 官僚 + 耕作；罗马的道路 + 军团 + 税赋抽取；英国的煤 + 金融 + 工业劳动。",
  },
  {
    en: "Network effect on trade routes",
    zh: "贸易网络效应",
    whatEn: "Civilizations sitting on dense trade networks compound faster than equally-talented isolates. Goods, ideas, and pathogens move along the same arteries.",
    whatZh: "占据密集贸易网络的文明，比同等才智的孤立体复利得更快。货物、观念、病原体走的是同一组动脉。",
    examplesEn: "Phoenicia; Venice; the Hanseatic cities; modern Singapore.",
    examplesZh: "腓尼基；威尼斯；汉萨城邦；现代新加坡。",
  },
  {
    en: "Institutional inheritability",
    zh: "制度的可继承性",
    whatEn: "Civilizations that encode institutions in writing — laws, archives, training systems — survive their founders. Civilizations that depend on a single charismatic leader collapse with them.",
    whatZh: "把制度写下来的文明——法律、档案、培训体系——能在创建者死后继续运转。依赖某个魅力领袖的文明，则与他一同陨落。",
    examplesEn: "Roman written law surviving 1000 years past Augustus; Mongol Empire dissolving within a century of Genghis.",
    examplesZh: "罗马的成文法在屋大维之后又活了一千年；蒙古帝国在成吉思汗之后不到一个世纪就解体。",
  },
  {
    en: "Cultural cohesion at scale",
    zh: "大规模的文化凝聚",
    whatEn: "A shared narrative + identity binding strangers into cooperation lets a civilization scale without per-relationship trust. The narrative substitutes for kin ties.",
    whatZh: "把陌生人黏成可合作群体的共同叙事与身份，让文明可以在没有点对点信任的前提下扩张。叙事替代了血缘。",
    examplesEn: "Confucian moral universe; Roman citizenship; Christianity; modern nationalism.",
    examplesZh: "儒家道德宇宙；罗马公民身份；基督教；现代民族主义。",
  },
];

const COLLAPSES: Mech[] = [
  {
    en: "Tainter's complexity ceiling",
    zh: "Tainter 复杂度天花板",
    whatEn: "Each new layer of complexity (bureaucracy, law, infrastructure) costs energy to maintain. Marginal returns diminish. At some point the next layer costs more than it returns. Then the system can't add it. Then it can't replace lost ones either.",
    whatZh: "每一层新增的复杂度（官僚、法律、基础设施）都要靠能量维持。边际收益在递减。到某一刻，下一层带来的开销大于它的产出。系统就再也加不上了。再过一会儿，连维持现有层级也做不到。",
    examplesEn: "Late Western Roman Empire — could no longer fund frontier defence at the complexity level it had built.",
    examplesZh: "西罗马帝国晚期——已无力按已有复杂度水平继续资助边境防御。",
  },
  {
    en: "Élite overproduction",
    zh: "精英过剩",
    whatEn: "When the number of credentialed candidates outpaces the number of meaningful positions, a permanent counter-élite forms. Frustrated élites are dangerous: they have skills, networks, and grievances. Civil conflict follows.",
    whatZh: "当有学历的候选人数量超过有意义岗位的数量，就会形成一个永久性的反精英群。受挫的精英是危险的：他们有技能、有人脉、有怨恨。内部冲突随之而来。",
    examplesEn: "Roman crisis of the third century; late Tang civil wars; perhaps modern US political polarization.",
    examplesZh: "罗马的「三世纪危机」；唐末大乱；也许还包括现代美国的政治极化。",
  },
  {
    en: "Climate / resource shock",
    zh: "气候 / 资源冲击",
    whatEn: "A civilization tuned to one climate or resource regime breaks when conditions shift faster than its institutions can adapt. The shock alone rarely kills; it kills civilizations that were already at the complexity ceiling.",
    whatZh: "调校在某一种气候或资源情景下的文明，一旦环境变化速度超过制度的适应速度，就会断裂。单看冲击本身很少致命；致命的是已经撞到天花板的文明。",
    examplesEn: "Bronze Age collapse (~1177 BCE) — multiple climate, raid, and trade-route shocks combined; Little Ice Age + Ming.",
    examplesZh: "青铜时代崩溃（约公元前 1177 年）——气候、劫掠、贸易路线冲击叠加；小冰期 + 明。",
  },
  {
    en: "Debt cascade",
    zh: "债务级联",
    whatEn: "Civilizations financialize. Debt grows faster than productive capacity. At some point a triggering shock makes the debt unrepayable; the cascading defaults eat the institutional fabric.",
    whatZh: "文明走向金融化。债务的增长速度超过实体产出。一旦遇上某个触发性冲击，债务无法偿还；级联违约把制度纤维一段段啃掉。",
    examplesEn: "Late Ming silver crisis; 18th-century Spanish Empire; modern systemic financial crises.",
    examplesZh: "晚明白银危机；18 世纪西班牙帝国；现代系统性金融危机。",
  },
  {
    en: "Information closure",
    zh: "信息封闭",
    whatEn: "A civilization that loses the ability to learn from its periphery, from rivals, from below, will be out-iterated. The Soviet system did not run out of resources; it ran out of feedback.",
    whatZh: "一个失去从边缘、对手、底层学习能力的文明，会在迭代中被超越。苏联体系并不是资源耗尽——它是反馈耗尽。",
    examplesEn: "USSR 1970–1991; Qing rejection of Western technology pre-1860; perhaps any closed system long enough.",
    examplesZh: "1970–1991 年的苏联；1860 年前清朝拒绝西方技术；也许，任何足够封闭的系统都会如此。",
  },
];

export default function CollapsePage() {
  const { tr, lang } = useA();
  return (
    <main className="container-a py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("collapseEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("collapseTitle")}</h1>
        <p className="lede max-w-2xl">{tr("collapseSubtitle")}</p>
      </header>

      <section className="mb-20">
        <h2 className="display-2 mb-8">{tr("riseTitle")}</h2>
        <div className="grid gap-px bg-smoke/40 md:grid-cols-2">
          {RISES.map((m, i) => <Mechanism key={i} m={m} idx={i} accent="terracotta" />)}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="display-2 mb-8 text-rust">{tr("collapseTitleSection")}</h2>
        <div className="grid gap-px bg-smoke/40">
          {COLLAPSES.map((m, i) => <Mechanism key={i} m={m} idx={i} accent="rust" />)}
        </div>
      </section>

      {/* Tagged civilizations */}
      <section className="mt-20">
        <div className="eyebrow mb-3">{lang === "en" ? "Each civilization, by primary trigger" : "各文明的主要触发机制"}</div>
        <h2 className="display-2 mb-8 max-w-2xl">
          {lang === "en"
            ? "What broke each one in the library."
            : "案例库中每个文明，是被哪种机制压垮的。"}
        </h2>
        <div className="space-y-3">
          {CIVS.map((c) => (
            <div key={c.id} className="card !py-4 !px-6">
              <div className="grid gap-3 md:grid-cols-[200px_1fr]">
                <div>
                  <div className="display-3 text-terracotta">{lang === "zh" ? c.zh : c.en}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-bone">{c.era}</div>
                </div>
                <p className="prose-body italic">{lang === "zh" ? c.collapseZh : c.collapseEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Mechanism({ m, idx, accent }: { m: Mech; idx: number; accent: "terracotta" | "rust" }) {
  const { lang } = useA();
  const accentCls = accent === "rust" ? "text-rust" : "text-terracotta";
  return (
    <article className="bg-ink p-8">
      <div className={`font-mono text-[10px] uppercase tracking-[0.18em] mb-2 ${accentCls}`}>
        {String(idx + 1).padStart(2, "0")}
      </div>
      <h3 className="display-3 mb-4">{lang === "zh" ? m.zh : m.en}</h3>
      <p className="prose-body mb-4">{lang === "zh" ? m.whatZh : m.whatEn}</p>
      <p className="text-sm italic text-bone">{lang === "zh" ? m.examplesZh : m.examplesEn}</p>
    </article>
  );
}
