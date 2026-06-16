import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();

  return [
    {
      url: "https://heymiax.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://heymiax.com/notes",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://heymiax.com/moments",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...articles.map((article) => ({
      url: `https://heymiax.com/notes/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
