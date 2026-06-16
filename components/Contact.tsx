import Image from "next/image";

type ContactLink =
  | { label: string; href: string; icon: string; iconSrc?: never }
  | { label: string; href: string; iconSrc: string; icon?: never };

const links: ContactLink[] = [
  { label: "Email", href: "mailto:xrr2023123@gmail.com", icon: "✉" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mia-xia-81196b33b/",
    iconSrc: "/media/social/linkedin.png",
  },
  { label: "X", href: "https://x.com/Mia_Bohrium", iconSrc: "/media/social/twitter.png" },
  { label: "Jike", href: "https://okjk.co/4VQR2Z", icon: "J" },
];
export default function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl font-bold tracking-tight mb-10">🤝</h2>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:min-h-0 sm:justify-start sm:px-4">
              {l.iconSrc ? (
                <Image src={l.iconSrc} alt="" width={18} height={18} className="rounded-[4px]" />
              ) : (
                <span
                  className={l.label === "Jike" ? "jike-mark" : "font-mono text-xs"}
                  style={
                    l.label === "Jike"
                      ? {
                          borderRadius: 999,
                          color: "#fff",
                        }
                      : undefined
                  }
                >
                  {l.icon}
                </span>
              )}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
