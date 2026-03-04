"use client";
import { useState } from "react";

const copy = {
  title1: "Hi, I'm Mia.",
  title2: "I keep products moving",
  subtitle:
    "Bridging strategy and execution across developer ecosystems, community growth, and global markets.",
  viewProjects: "View Projects",
  getInTouch: "Get in Touch",
  more: "More About Me",
  about1:
    "Structured and execution-driven at work, intuitive in life. I am especially drawn to AI-native products built for global markets.",
  about2:
    "In a fast-moving industry, I stay curious, keep learning, and commit to the work I believe in.",
};

export default function Hero() {
  const [expanded, setExpanded] = useState(false);
  const t = copy;

  return (
    <section id="about" className="min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          {t.title1}
          <br />
          <span className="text-[var(--color-text-muted)] font-medium">
            {t.title2}
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-[15px] sm:text-base text-[var(--color-text-muted)] leading-7">
          {t.subtitle}
        </p>

        <div className="flex items-center gap-3 mt-10">
          <a
            href="#projects"
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-[var(--color-accent)] hover:opacity-90 transition-opacity"
          >
            {t.viewProjects}
          </a>
          <a
            href="mailto:xrr2023123@gmail.com"
            className="px-5 py-2.5 rounded-lg border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-surface-2)] transition-colors"
          >
            {t.getInTouch}
          </a>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {t.more}
            <span
              className={`inline-block transition-transform duration-300 ${
                expanded ? "rotate-180" : "rotate-0"
              }`}
              aria-hidden="true"
            >
              ↓
            </span>
          </button>

          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div
                className={`pt-5 max-w-2xl space-y-3 text-[15px] leading-7 text-[var(--color-text-muted)] transition-opacity duration-200 ${
                  expanded ? "opacity-100" : "opacity-0"
                }`}
              >
                <p>{t.about1}</p>
                <p>{t.about2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
