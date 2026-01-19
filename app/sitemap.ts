import type { MetadataRoute } from "next";
import { generateSitemapEntries, formatForNextJs } from "../utils/sitemap";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = generateSitemapEntries(
    {
      baseUrl,
      defaultChangeFrequency: "monthly",
      defaultPriority: 0.8,
    },
    [
      { path: "/", priority: 1.0, changeFrequency: "monthly" },
      { path: "/decouverte" },
      { path: "/formations" },
      { path: "/exploration" },
      { path: "/sites" },
      { path: "/prix" },
      { path: "/equipe" },
      { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
    ]
  );

  return formatForNextJs(entries);
}
