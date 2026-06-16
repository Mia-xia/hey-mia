import { mkdir, open, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export type ArticleStats = {
  likes: number;
  views: number;
};

export type ArticleStatsWithViewer = ArticleStats & {
  liked?: boolean;
  viewed?: boolean;
};

type LocalArticleStats = ArticleStats & {
  likedBy?: string[];
  viewedBy?: string[];
  baseLikes?: number;
  baseViews?: number;
};

const LOCAL_DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "heymia")
  : path.join(process.cwd(), "data");
const LOCAL_FILE = path.join(LOCAL_DATA_DIR, "article-stats.json");
const LOCAL_LOCK_FILE = path.join(LOCAL_DATA_DIR, "article-stats.lock");

function hasKv() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function statsKey(slug: string) {
  return `article:stats:${slug}`;
}

function likesKey(slug: string) {
  return `article:likes:${slug}`;
}

function viewsKey(slug: string) {
  return `article:views:${slug}`;
}

function normalizeVisitorId(visitorId: unknown) {
  return typeof visitorId === "string" && visitorId.trim().length > 0
    ? visitorId.trim().slice(0, 128)
    : null;
}

function publicStats(stats: LocalArticleStats): ArticleStats {
  return {
    likes: (stats.baseLikes ?? 0) + (stats.likedBy?.length ?? stats.likes ?? 0),
    views: (stats.baseViews ?? 0) + (stats.viewedBy?.length ?? stats.views ?? 0),
  };
}

function getBaseLikes(stats: LocalArticleStats) {
  return stats.baseLikes ?? (stats.likedBy ? 0 : stats.likes ?? 0);
}

function getBaseViews(stats: LocalArticleStats) {
  return stats.baseViews ?? (stats.viewedBy ? 0 : stats.views ?? 0);
}

async function kvCommand<T>(command: string[]): Promise<T> {
  const kvUrl = process.env.KV_REST_API_URL;
  const kvToken = process.env.KV_REST_API_TOKEN;

  if (!kvUrl || !kvToken) {
    throw new Error("KV_REST_API_URL or KV_REST_API_TOKEN is not configured");
  }

  const res = await fetch(kvUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${kvToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV command failed (${res.status}): ${text}`);
  }

  const body = (await res.json()) as { result: T };
  return body.result;
}

async function readLocalStats(): Promise<Record<string, LocalArticleStats>> {
  try {
    return JSON.parse(await readFile(LOCAL_FILE, "utf8")) as Record<string, LocalArticleStats>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

async function writeLocalStats(stats: Record<string, LocalArticleStats>) {
  await mkdir(LOCAL_DATA_DIR, { recursive: true });
  await writeFile(LOCAL_FILE, `${JSON.stringify(stats, null, 2)}\n`, "utf8");
}

async function wait(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function acquireLocalLock() {
  await mkdir(LOCAL_DATA_DIR, { recursive: true });

  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const handle = await open(LOCAL_LOCK_FILE, "wx");
      await handle.close();
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
      await wait(25);
    }
  }

  throw new Error("Timed out waiting for local article stats lock");
}

async function updateLocalStats<T>(
  updater: (stats: Record<string, LocalArticleStats>) => {
    nextStats: Record<string, LocalArticleStats>;
    result: T;
  },
) {
  await acquireLocalLock();
  try {
    const { nextStats, result } = updater(await readLocalStats());
    await writeLocalStats(nextStats);
    return result;
  } finally {
    await unlink(LOCAL_LOCK_FILE).catch(() => undefined);
  }
}

export async function getArticleStats(
  slug: string,
  visitorId?: string | null,
): Promise<ArticleStatsWithViewer> {
  const viewerId = normalizeVisitorId(visitorId);

  if (hasKv()) {
    const [legacy, likes, views, liked, viewed] = await Promise.all([
      kvCommand<(string | null)[]>(["HMGET", statsKey(slug), "likes", "views"]),
      kvCommand<number>(["SCARD", likesKey(slug)]),
      kvCommand<number>(["SCARD", viewsKey(slug)]),
      viewerId ? kvCommand<number>(["SISMEMBER", likesKey(slug), viewerId]) : Promise.resolve(0),
      viewerId ? kvCommand<number>(["SISMEMBER", viewsKey(slug), viewerId]) : Promise.resolve(0),
    ]);

    return {
      likes: Number(legacy[0] ?? 0) + likes,
      views: Number(legacy[1] ?? 0) + views,
      liked: Boolean(liked),
      viewed: Boolean(viewed),
    };
  }

  const stats = await readLocalStats();
  const current = stats[slug] ?? { likes: 0, views: 0 };
  const likedBy = new Set(current.likedBy ?? []);
  const viewedBy = new Set(current.viewedBy ?? []);

  return {
    likes: getBaseLikes(current) + likedBy.size,
    views: getBaseViews(current) + viewedBy.size,
    liked: viewerId ? likedBy.has(viewerId) : false,
    viewed: viewerId ? viewedBy.has(viewerId) : false,
  };
}

export async function toggleArticleLike(
  slug: string,
  visitorId: unknown,
): Promise<ArticleStatsWithViewer> {
  const viewerId = normalizeVisitorId(visitorId);
  if (!viewerId) return getArticleStats(slug);

  if (hasKv()) {
    const liked = await kvCommand<number>(["SISMEMBER", likesKey(slug), viewerId]);
    if (liked) {
      await kvCommand<number>(["SREM", likesKey(slug), viewerId]);
    } else {
      await kvCommand<number>(["SADD", likesKey(slug), viewerId]);
    }
    return getArticleStats(slug, viewerId);
  }

  return updateLocalStats((currentStats) => {
    const current = currentStats[slug] ?? { likes: 0, views: 0 };
    const baseLikes = getBaseLikes(current);
    const baseViews = getBaseViews(current);
    const likedBy = new Set(current.likedBy ?? []);
    const viewedBy = new Set(current.viewedBy ?? []);

    if (likedBy.has(viewerId)) {
      likedBy.delete(viewerId);
    } else {
      likedBy.add(viewerId);
    }

    const next: LocalArticleStats = {
      likes: baseLikes + likedBy.size,
      views: baseViews + viewedBy.size,
      baseLikes,
      baseViews,
      likedBy: [...likedBy],
      viewedBy: [...viewedBy],
    };

    return {
      nextStats: { ...currentStats, [slug]: next },
      result: { ...publicStats(next), liked: likedBy.has(viewerId), viewed: viewedBy.has(viewerId) },
    };
  });
}

export async function recordArticleView(
  slug: string,
  visitorId: unknown,
): Promise<ArticleStatsWithViewer> {
  const viewerId = normalizeVisitorId(visitorId);
  if (!viewerId) return getArticleStats(slug);

  if (hasKv()) {
    await kvCommand<number>(["SADD", viewsKey(slug), viewerId]);
    return getArticleStats(slug, viewerId);
  }

  return updateLocalStats((currentStats) => {
    const current = currentStats[slug] ?? { likes: 0, views: 0 };
    const baseLikes = getBaseLikes(current);
    const baseViews = getBaseViews(current);
    const likedBy = new Set(current.likedBy ?? []);
    const viewedBy = new Set(current.viewedBy ?? []);
    viewedBy.add(viewerId);

    const next: LocalArticleStats = {
      likes: baseLikes + likedBy.size,
      views: baseViews + viewedBy.size,
      baseLikes,
      baseViews,
      likedBy: [...likedBy],
      viewedBy: [...viewedBy],
    };

    return {
      nextStats: { ...currentStats, [slug]: next },
      result: { ...publicStats(next), liked: likedBy.has(viewerId), viewed: true },
    };
  });
}
