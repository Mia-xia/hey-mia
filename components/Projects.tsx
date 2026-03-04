const projects = [
  {
    title: "AI Writing Assistant",
    description:
      "Led 0 to 1 product development for an AI-powered writing tool. Grew to 50K MAU in 6 months.",
    tags: ["AI/ML", "B2C", "Growth"],
    link: "#",
  },
  {
    title: "Developer Platform Redesign",
    description:
      "Redesigned API onboarding flow, reducing time-to-first-call from 45min to 8min.",
    tags: ["DevEx", "API", "B2B"],
    link: "#",
  },
  {
    title: "Apple News Agent",
    description:
      "Built an automated agent that tracks Apple-related updates and turns them into concise, readable news summaries.",
    tags: ["AI Agent", "Automation", "News"],
    link: "https://github.com/Mia-xia/apple-news-agent",
  },
];

export default function Projects() {

  return (
    <section id="projects" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold tracking-tight">Selected Projects</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-12">
          {projects.map((p) => (
            <a key={p.title} href={p.link} className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] hover:border-[var(--color-accent)] transition-all duration-200">
              <h3 className="font-semibold mb-2 group-hover:text-[var(--color-accent)] transition-colors">{p.title}</h3>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)]">{tag}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
