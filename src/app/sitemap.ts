import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://architect.psyverse.fun";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/model`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/library`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/levers`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/collapse`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/simulator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];
}
