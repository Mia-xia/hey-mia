import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleStats from "@/components/ArticleStats";
import Nav from "@/components/Nav";
import { formatArticleDate, getAllArticles } from "@/lib/articles";
import { getArticleStats } from "@/lib/articleStats";

export const metadata: Metadata = {
  title: "Notes",
  description: "Essays, notes, and visual fragments from Mia Xia.",
  alternates: {
    canonical: "/notes",
  },
};

export default async function WritingPage() {
  const articles = await getAllArticles();
  const stats = await Promise.all(articles.map((article) => getArticleStats(article.slug)));

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <section className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-semibold tracking-tight">Notes</h1>
          <p className="mt-5 max-w-2xl text-[var(--color-text-muted)] leading-7">
            💡 常常沉思，也常常开怀大笑！
          </p>

          <div className="mt-12 grid gap-6">
            {articles.map((article, index) => (
              <article
                key={article.slug}
                className="grid gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-accent)] sm:grid-cols-[220px_1fr]"
              >
                <Link href={`/notes/${article.slug}`} className="block overflow-hidden rounded-lg bg-[var(--color-surface-2)]">
                  <Image
                    src={article.cover}
                    alt={article.coverAlt}
                    width={640}
                    height={420}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                  />
                </Link>
                <div className="flex flex-col justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
                      <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    </div>
                    <Link href={`/notes/${article.slug}`}>
                      <h2 className="mt-3 text-2xl font-semibold tracking-tight hover:text-[var(--color-accent)]">
                        {article.title}
                      </h2>
                    </Link>
                    {article.excerpt ? (
                      <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                        {article.excerpt}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-[var(--color-text-muted)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArticleStats slug={article.slug} initialStats={stats[index]} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
