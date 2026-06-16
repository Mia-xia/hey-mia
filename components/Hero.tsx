import HeroEuphoriaBackdrop from "@/components/HeroEuphoriaBackdrop";

const quote = {
  line1: "In the midst of winter, I found there was,",
  line2: "within me, an invincible summer.",
  body: [
    "And that makes me happy.",
    "For it says that no matter how hard the world pushes against me,",
    "within me, there\u2019s something stronger \u2013 something better, pushing right back.",
  ].join(" "),
};

export default function Hero() {
  return (
    <section id="about" className="hero-sky min-h-screen overflow-hidden">
      <HeroEuphoriaBackdrop />
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-28 min-h-screen flex items-center demo2-hero-copy">
        <div className="max-w-4xl">
          <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05]">
            {quote.line1}
            <br />
            <span>{quote.line2}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-[15px] sm:text-base text-[var(--color-text-muted)] leading-8">
            {quote.body}
          </p>
        </div>
      </div>
    </section>
  );
}
