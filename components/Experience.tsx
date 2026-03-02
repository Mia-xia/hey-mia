"use client";
import { useState, useCallback } from "react";

const experiences = [
  {
    company: "DP Technology",
    role: "Product Operations — Bohrium AI Research Platform",
    period: "Feb 2025 — Present",
    bullets: [
      "Led end-to-end data operations for Bohrium, including analytics, performance monitoring, and event tracking design; built dashboards and monitoring systems to support data-driven decision-making and continuous product optimization.",
      "Managed overseas growth across influencer marketing, social media, community operations, and campaigns; supported product internationalization and localization to enhance global user acquisition and engagement.",
      "Designed personalized email marketing strategies and optimized lifecycle communication; tracked delivery rate, inbox placement, and CTR, and ran A/B tests to improve campaign performance.",
      "Supported PC-based paid advertising and foundational SEO initiatives to improve acquisition efficiency and organic visibility for Bohrium's global researcher audience.",
    ],
  },
  {
    company: "01.AI",
    role: "OS & DevRel — Project Operations",
    period: "Jun 2022 — Dec 2022",
    bullets: [
      "Led international developer relations initiatives, driving 5 app developments, 5 technical publications, and 1 ecosystem integration within a single month.",
      "Drafted and reviewed technical documents, project updates, and promotional content in English to support global outreach and align with international standards.",
      "Grew Discord community to 1,900+ members through an optimized allowlist process and high-engagement content strategy — including the company's highest-performing Twitter post.",
    ],
  },
  {
    company: "Boao Forum for Asia",
    role: "Partnership Affairs — Project Assistant",
    period: "Jan 2023 — Mar 2023",
    bullets: [
      "Managed partner participation for the 2023 Boao Forum for Asia, coordinating 500+ attendees and 15 key partnerships with organizations including Wuliangye, SABIC, and SAIC-GM.",
      "Executed VIP reception protocols and high-level diplomatic meetings, overseeing corporate hospitality throughout the annual conference.",
      "Produced bilingual official notices, press releases, and clearance letters; performance led to a commendation and an invitation to support the Economic Security Forum.",
    ],
  },
];

export default function Experience() {
  const [openSet, setOpenSet] = useState<Set<number>>(new Set());

  const toggle = useCallback((i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }, []);

  return (
    <section id="experience" className="py-24 bg-[var(--color-surface-2)]">
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-2">
          Career
        </p>
        <h2 className="text-2xl font-bold tracking-tight mb-12">Experience</h2>

        {/* Timeline container */}
        <div className="relative">

          {/* Vertical line — hidden on mobile, colour adapts via CSS var */}
          <div
            className="hidden sm:block absolute top-0 bottom-0 w-[2px]"
            style={{ left: 160, background: "var(--color-timeline-line)" }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {experiences.map((e, i) => {
              const isOpen = openSet.has(i);
              return (
                <div key={e.company} className="relative timeline-entry">

                  {/* Node circle — vertically centered to the first line of the title.
                      Title is 18px font × 1.25 line-height ≈ 22.5px tall.
                      Midpoint of first line = ~11px. Circle is 10px, so top = 11 - 5 = 6px.
                      The button has py-2 (8px) top padding before the title, so total = 8 + 6 = 14px. */}
                  <div
                    className="hidden sm:block absolute z-10 timeline-node"
                    data-open={isOpen ? "true" : "false"}
                    style={{
                      top: 14,
                      left: 155,   /* 160px line center − 5px (half of 10px circle) */
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: isOpen ? "var(--color-accent)" : "var(--color-timeline-node)",
                      boxShadow: isOpen ? "0 0 0 3px rgba(96,165,250,0.2)" : "none",
                    }}
                  />

                  <div className="flex flex-col sm:flex-row">

                    {/* Date — 140px, right-aligned text, offset to title baseline */}
                    <div
                      className="sm:text-right shrink-0 mb-2 sm:mb-0 sm:pt-[14px]"
                      style={{ width: 140 }}
                    >
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">
                        {e.period}
                      </span>
                    </div>

                    {/* 40px spacer — the vertical line runs through the centre of this zone */}
                    <div className="hidden sm:block shrink-0" style={{ width: 40 }} />

                    {/* Content area — starts at 180px from the container edge */}
                    <div className="flex-1">
                      {/* Clickable header row */}
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        onKeyDown={(ev) => {
                          if (ev.key === "Enter" || ev.key === " ") {
                            ev.preventDefault();
                            toggle(i);
                          }
                        }}
                        aria-expanded={isOpen}
                        className={`exp-entry-btn w-full text-left rounded-lg px-3 py-2 -mx-3 border-0 outline-none${isOpen ? " is-open" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-[18px] leading-snug text-[var(--color-text)]">
                              {e.role}
                            </h3>
                            <p className="text-sm text-[var(--color-accent)] mt-0.5">
                              {e.company}
                            </p>
                          </div>
                          {/* Toggle icon */}
                          <span
                            className="shrink-0 mt-1 text-[var(--color-text-muted)] transition-transform duration-250 select-none"
                            style={{
                              display: "inline-block",
                              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                              fontSize: 20,
                              lineHeight: 1,
                            }}
                            aria-hidden="true"
                          >
                            +
                          </span>
                        </div>

                        {/* Expandable bullet area */}
                        <div
                          style={{
                            maxHeight: isOpen ? 600 : 0,
                            overflow: "hidden",
                            transition: "max-height 250ms ease",
                          }}
                        >
                          <ul
                            style={{
                              opacity: isOpen ? 1 : 0,
                              transition: "opacity 200ms ease",
                              transitionDelay: isOpen ? "80ms" : "0ms",
                              marginTop: 14,
                              display: "flex",
                              flexDirection: "column",
                              gap: 12,
                            }}
                          >
                            {e.bullets.map((b) => (
                              <li
                                key={b}
                                style={{
                                  fontSize: 14,
                                  lineHeight: 1.7,
                                  color: "var(--color-text)",
                                  display: "flex",
                                  gap: 10,
                                }}
                              >
                                <span
                                  style={{
                                    marginTop: 7,
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    background: "var(--color-text-muted)",
                                    flexShrink: 0,
                                  }}
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
