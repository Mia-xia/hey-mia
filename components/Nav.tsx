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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navBg = scrolled || menuOpen
    ? "bg-[var(--color-surface)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
    : "";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${navBg}`}>
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
            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className="block w-5 h-[2px] bg-[var(--color-text)] rounded transition-all duration-200 origin-center"
                style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
              />
              <span
                className="block w-5 h-[2px] bg-[var(--color-text)] rounded transition-all duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-5 h-[2px] bg-[var(--color-text)] rounded transition-all duration-200 origin-center"
                style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div
        className="sm:hidden fixed top-16 left-0 right-0 z-40 bg-[var(--color-surface)] border-b border-[var(--color-border)] shadow-sm overflow-hidden transition-all duration-200"
        style={{ maxHeight: menuOpen ? 300 : 0 }}
      >
        <ul className="max-w-3xl mx-auto px-6 py-2 flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="block py-3 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors border-b border-[var(--color-border)] last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
