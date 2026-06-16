import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import ArticleStats from "@/components/ArticleStats";
import Nav from "@/components/Nav";
import { formatArticleDate, getAllArticles, getArticleBySlug } from "@/lib/articles";
import { getArticleStats } from "@/lib/articleStats";
import { mdxComponents } from "@/mdx-components";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getAllArticles()).map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/notes/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      images: [article.cover],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const stats = await getArticleStats(article.slug);
  const { content } = await compileMDX({
    source: article.content,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return (
    <>
      <Nav />
      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            href="/notes"
            className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            ← Notes
          </Link>
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-muted)]">
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              <span>{article.readingTime}</span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {article.title}
            </h1>
            {article.excerpt ? (
              <p className="mt-5 text-lg leading-8 text-[var(--color-text-muted)]">
                {article.excerpt}
              </p>
            ) : null}
            <div className="mt-6">
              <ArticleStats slug={article.slug} initialStats={stats} trackView />
            </div>
          </header>

          <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-2)]">
            <Image
              src={article.cover}
              alt={article.coverAlt}
              width={1400}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="article-prose mt-12">{content}</div>
        </article>
      </main>
    </>
  );
}
