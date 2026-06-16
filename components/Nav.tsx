"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "/" },
  { label: "Notes", href: "/notes" },
  { label: "Moments", href: "/moments" },
  { label: "🤝", href: "/#contact", ariaLabel: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="site-nav-inner">
          <Link href="/" className="site-mark" aria-label="Hey Mia home">
            <span>to be continued</span>
          </Link>
          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-label={l.ariaLabel}
                    className="site-nav-link"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
