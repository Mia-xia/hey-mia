import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover: string;
  coverAlt: string;
  language: "zh" | "en" | "mixed";
  media?: string[];
};

export type Article = ArticleMeta & {
  content: string;
  readingTime: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function estimateReadingTime(content: string) {
  const latinWords = content.match(/[A-Za-z0-9]+/g)?.length ?? 0;
  const cjkChars = content.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const minutes = Math.max(1, Math.ceil((latinWords + cjkChars / 2) / 220));
  return `${minutes} min read`;
}

export function formatArticleDate(date: string) {
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return date;
  return `${match[1]}.${Number(match[2])}.${Number(match[3])}`;
}

function normalizeMeta(slug: string, data: Record<string, unknown>): ArticleMeta {
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    cover: String(data.cover ?? "/media/covers/default-cover.svg"),
    coverAlt: String(data.coverAlt ?? ""),
    language: data.language === "zh" || data.language === "en" ? data.language : "mixed",
    media: Array.isArray(data.media) ? data.media.map(String) : [],
  };
}

async function getArticleFiles() {
  const files = await fs.readdir(ARTICLES_DIR);
  return files.filter((file) => file.endsWith(".mdx"));
}

export async function getAllArticles(): Promise<ArticleMeta[]> {
  const files = await getArticleFiles();
  const articles = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = await fs.readFile(path.join(ARTICLES_DIR, file), "utf8");
      const { data } = matter(source);
      return normalizeMeta(slug, data);
    }),
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getFeaturedArticles(limit = 3) {
  return (await getAllArticles()).slice(0, limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const source = await fs.readFile(path.join(ARTICLES_DIR, `${slug}.mdx`), "utf8");
    const { data, content } = matter(source);
    return {
      ...normalizeMeta(slug, data),
      content,
      readingTime: estimateReadingTime(content),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}
