import Image from "next/image";
import Link from "next/link";
import ArticleStats from "@/components/ArticleStats";
import { formatArticleDate, getFeaturedArticles } from "@/lib/articles";
import { getArticleStats } from "@/lib/articleStats";

export default async function Blog() {
  const articles = await getFeaturedArticles(3);
  const stats = await Promise.all(articles.map((article) => getArticleStats(article.slug)));

  return (
    <section id="notes" className="py-24 bg-[var(--color-surface-2)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end sm:gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Notes</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
              💡 常常沉思，也常常开怀大笑！
            </p>
          </div>
          <Link
            href="/notes"
            className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <article
              key={article.slug}
              className="blog-note overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]"
            >
              <Link href={`/notes/${article.slug}`}>
                <Image
                  src={article.cover}
                  alt={article.coverAlt}
                  width={720}
                  height={480}
                  className="aspect-[4/3] w-full object-cover"
                />
              </Link>
              <div className="p-5">
                <time className="text-xs text-[var(--color-text-muted)]" dateTime={article.date}>
                  {formatArticleDate(article.date)}
                </time>
                <Link href={`/notes/${article.slug}`}>
                  <h3 className="mt-2 text-lg font-semibold leading-snug hover:text-[var(--color-accent)]">
                    {article.title}
                  </h3>
                </Link>
                {article.excerpt ? (
                  <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
                    {article.excerpt}
                  </p>
                ) : null}
                <div className="mt-5">
                  <ArticleStats slug={article.slug} initialStats={stats[index]} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
