"use client";

import { useEffect, useState, useTransition } from "react";

type Stats = {
  likes: number;
  views: number;
  liked?: boolean;
  viewed?: boolean;
};

const VISITOR_ID_KEY = "heymia:visitor-id";

function getVisitorId() {
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const next =
    typeof window.crypto?.randomUUID === "function"
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(VISITOR_ID_KEY, next);
  return next;
}

export default function ArticleStats({
  slug,
  initialStats,
  trackView = false,
}: {
  slug: string;
  initialStats: Stats;
  trackView?: boolean;
}) {
  const [stats, setStats] = useState(initialStats);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let cancelled = false;

    const visitorId = getVisitorId();
    const url = trackView
      ? `/api/articles/${slug}/stats`
      : `/api/articles/${slug}/stats?visitorId=${encodeURIComponent(visitorId)}`;
    const options = trackView
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "view", visitorId }),
        }
      : undefined;

    fetch(url, options)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Stats | null) => {
        if (!cancelled && data) setStats(data);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [slug, trackView]);

  function like() {
    startTransition(async () => {
      const visitorId = getVisitorId();
      const res = await fetch(`/api/articles/${slug}/stats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "like", visitorId }),
      });
      if (res.ok) setStats((await res.json()) as Stats);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
      <span>{stats.views.toLocaleString()} 阅读</span>
      <button
        type="button"
        onClick={like}
        disabled={isPending}
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-3 py-1.5 text-[var(--color-text)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-60"
        aria-pressed={Boolean(stats.liked)}
      >
        <span aria-hidden="true">{stats.liked ? "♥" : "♡"}</span>
        <span>{stats.likes.toLocaleString()} 喜欢</span>
      </button>
    </div>
  );
}
