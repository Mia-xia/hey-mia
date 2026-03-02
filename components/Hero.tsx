"use client";
import { useState } from "react";

export default function Hero() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="min-h-screen flex items-center">
      <div className="max-w-3xl mx-auto px-6" style={{ paddingTop: 120, paddingBottom: 96 }}>
        <p className="text-sm text-[var(--color-accent)] font-mono mb-4 tracking-wider uppercase">
          Product Operations
        </p>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
          Hi, I'm Mia.
          <br />
          <span className="text-[var(--color-text-muted)]">
            I keep products moving.
          </span>
        </h1>

        {/* Single-line subtitle */}
        <p style={{ fontSize: 17, color: "#374151", marginBottom: 0, lineHeight: 1.6 }}>
          Product Operations professional bridging strategy and execution —
          across developer ecosystems, community growth, and global markets.
        </p>

        {/* CTAs — 32px below subtitle */}
        <div className="flex items-center gap-4" style={{ marginTop: 32 }}>
          <a
            href="#projects"
            className="px-5 py-2.5 bg-[var(--color-accent)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View Projects
          </a>
          <a
            href="mailto:xrr2023123@gmail.com"
            className="px-5 py-2.5 border border-[var(--color-border)] rounded-lg text-sm font-medium hover:bg-[var(--color-surface-2)] transition-colors"
          >
            Get in Touch
          </a>
        </div>

        {/* Collapsible "about me" */}
        <div style={{ marginTop: 28 }}>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            style={{
              fontSize: 14,
              color: "#6B7280",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            A bit more about me
            <span
              style={{
                display: "inline-block",
                transition: "transform 250ms ease",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
              aria-hidden="true"
            >
              ↓
            </span>
          </button>

          {/* Expandable content */}
          <div
            style={{
              maxHeight: expanded ? 400 : 0,
              overflow: "hidden",
              transition: "max-height 250ms ease",
            }}
          >
            <div
              className="text-[var(--color-text-muted)] leading-relaxed space-y-4"
              style={{
                paddingTop: 16,
                fontSize: 15,
                opacity: expanded ? 1 : 0,
                transition: "opacity 200ms ease",
                transitionDelay: expanded ? "80ms" : "0ms",
              }}
            >
              <p>An INFP who's structured and execution-driven at work, but intuitive in life. I'm drawn to live music, new experiences, and especially the fast-evolving AI landscape. I'm particularly excited about AI-native products built for global markets. I admire small but thoughtfully crafted products like Notion, Flomo, and Jike — tools that are simple, intentional, and deeply user-centered.</p>
              <p>In an industry that moves at breakneck speed, I stay curious, keep learning, and commit fully to the work I believe in.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
