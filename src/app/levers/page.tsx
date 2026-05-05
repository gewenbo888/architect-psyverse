"use client";

import { useA } from "@/lib/providers";

interface Lever {
  titleEn: string; titleZh: string;
  rows: { en: string; zh: string; throughput: number; stability: number; fragility: number; exEn: string; exZh: string; }[];
}

const LEVERS: Lever[] = [
  {
    titleEn: "Governance", titleZh: "治理",
    rows: [
      { en: "Decentralized network / DAO", zh: "去中心化网络 / DAO", throughput: 25, stability: 30, fragility: 80, exEn: "Stateless tribal coalitions; modern crypto DAOs", exZh: "无国家的部落联盟；当代加密 DAO" },
      { en: "Federation / confederacy", zh: "联邦 / 邦联", throughput: 50, stability: 60, fragility: 50, exEn: "Iroquois Confederacy; early USA; modern Switzerland", exZh: "易洛魁联盟；早期美国；现代瑞士" },
      { en: "Republic / parliamentary democracy", zh: "共和 / 议会民主", throughput: 65, stability: 70, fragility: 45, exEn: "Roman Republic; Venice; modern democracies", exZh: "罗马共和国；威尼斯；现代民主国家" },
      { en: "Centralized empire / autocracy", zh: "中央集权 / 专制", throughput: 80, stability: 65, fragility: 35, exEn: "Roman Empire; Han; Ming; USSR", exZh: "罗马帝国；汉；明；苏联" },
    ],
  },
  {
    titleEn: "Economy", titleZh: "经济",
    rows: [
      { en: "Subsistence agriculture", zh: "自给农业", throughput: 15, stability: 80, fragility: 20, exEn: "Pre-state societies; medieval peasant villages", exZh: "前国家社会；中世纪农民村落" },
      { en: "Tributary / agrarian state", zh: "贡赋 / 农业国家", throughput: 40, stability: 70, fragility: 35, exEn: "Han China; medieval European kingdoms", exZh: "汉代中国；中世纪欧洲王国" },
      { en: "Mercantile / trade-network", zh: "商贸 / 贸易网络", throughput: 65, stability: 55, fragility: 55, exEn: "Venice; Hanseatic League; pre-modern Singapore", exZh: "威尼斯；汉萨同盟；前现代新加坡" },
      { en: "Industrial", zh: "工业化", throughput: 80, stability: 50, fragility: 60, exEn: "19th-century Britain; 20th-century USA, USSR", exZh: "19 世纪英国；20 世纪美苏" },
      { en: "Digital / financialized", zh: "数字化 / 金融化", throughput: 95, stability: 35, fragility: 80, exEn: "21st-century US; Singapore; modern Korea", exZh: "21 世纪美国；新加坡；现代韩国" },
    ],
  },
  {
    titleEn: "Information", titleZh: "信息",
    rows: [
      { en: "Closed / authoritarian", zh: "封闭 / 威权", throughput: 30, stability: 60, fragility: 60, exEn: "Late Ming; USSR after 1968; modern North Korea", exZh: "晚明；1968 后苏联；现代朝鲜" },
      { en: "Curated / élite-managed", zh: "精英管控 / 编排式", throughput: 55, stability: 65, fragility: 45, exEn: "Confucian China; medieval Catholic Europe; Singapore", exZh: "儒家中国；中世纪天主教欧洲；新加坡" },
      { en: "Open / free press", zh: "开放 / 新闻自由", throughput: 75, stability: 55, fragility: 50, exEn: "19th-c. Britain; post-WWII US, EU; classical Athens", exZh: "19 世纪英国；二战后美欧；古典雅典" },
      { en: "Radically open / on-chain", zh: "彻底开放 / 链上", throughput: 90, stability: 35, fragility: 75, exEn: "Modern internet; crypto / DAO governance", exZh: "现代互联网；加密 / DAO 治理" },
    ],
  },
];

export default function LeversPage() {
  const { tr, lang } = useA();
  return (
    <main className="container-a py-12 md:py-16">
      <header className="mb-12 max-w-3xl animate-slow-in">
        <div className="eyebrow mb-3">{tr("leversEyebrow")}</div>
        <h1 className="display-1 mb-5">{tr("leversTitle")}</h1>
        <p className="lede max-w-2xl">{tr("leversSubtitle")}</p>
      </header>

      <div className="space-y-20">
        {LEVERS.map((lev, idx) => (
          <section key={idx}>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-[0.2em] text-terracotta">{String(idx + 1).padStart(2, "0")}</span>
              <h2 className="display-2">{lang === "zh" ? lev.titleZh : lev.titleEn}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-smoke/60 p-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                      {lang === "en" ? "Form" : "形式"}
                    </th>
                    <th className="border-b border-smoke/60 p-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                      {tr("leverThroughput")}
                    </th>
                    <th className="border-b border-smoke/60 p-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                      {tr("leverStability")}
                    </th>
                    <th className="border-b border-smoke/60 p-3 text-right font-mono text-[10px] uppercase tracking-[0.16em] text-rust">
                      {tr("leverFragility")}
                    </th>
                    <th className="border-b border-smoke/60 p-3 text-left font-mono text-[10px] uppercase tracking-[0.16em] text-bone">
                      {lang === "en" ? "Examples" : "案例"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lev.rows.map((row, j) => (
                    <tr key={j} className="border-b border-smoke/30">
                      <td className="p-3 align-top">
                        <div className="display-3 text-paper">{lang === "zh" ? row.zh : row.en}</div>
                      </td>
                      <td className="p-3 text-right align-top">
                        <Bar value={row.throughput} color="#C9926D" />
                      </td>
                      <td className="p-3 text-right align-top">
                        <Bar value={row.stability} color="#82A09C" />
                      </td>
                      <td className="p-3 text-right align-top">
                        <Bar value={row.fragility} color="#A23B3B" />
                      </td>
                      <td className="p-3 align-top max-w-md">
                        <p className="text-sm italic text-bone">{lang === "zh" ? row.exZh : row.exEn}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="stat-num text-xs text-paper">{value}</span>
      <div className="h-1 w-20 overflow-hidden rounded-sm bg-smoke">
        <div className="h-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
