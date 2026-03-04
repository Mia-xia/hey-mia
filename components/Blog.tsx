"use client";

const enPlaceholders = [
  "English posts are coming soon.",
  "Working on essays about product operations.",
  "Drafting notes on growth, strategy, and execution.",
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-[var(--color-surface-2)]">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold tracking-tight mb-10">Blog</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {enPlaceholders.map((item) => (
            <article
              key={item}
              className="blog-note rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
            >
              <p className="text-sm leading-7 text-[var(--color-text-muted)]">{item}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
