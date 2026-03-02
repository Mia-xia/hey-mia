import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <footer className="py-8 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
        © {new Date().getFullYear()} Mia. Built with Next.js.
      </footer>
    </>
  );
}
