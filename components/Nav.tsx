"use client";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={scrolled ? "fixed top-0 left-0 right-0 z-50 bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)] transition-all duration-200" : "fixed top-0 left-0 right-0 z-50 transition-all duration-200"}>
      <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-semibold text-sm tracking-tight">hey.mia</span>
        <div className="flex items-center gap-6">
          <ul className="hidden sm:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
