const links = [
  { label: "Email", href: "mailto:xrr2023123@gmail.com", icon: "✉" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mia-xia-81196b33b/", icon: "in" },
  { label: "Twitter", href: "https://x.com/Mia_01ai", icon: "𝕏" },
];
export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-2">Contact</p>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Let us talk</h2>
        <p className="text-[var(--color-text-muted)] mb-10 max-w-md">Open to new opportunities, collaborations, and good conversations.</p>
        <div className="flex flex-wrap gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all text-sm font-medium">
              <span className="font-mono text-xs">{l.icon}</span>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}