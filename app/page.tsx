import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import PhotosPreview from "@/components/PhotosPreview";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Blog />
        <PhotosPreview />
        <Contact />
      </main>
      <footer className="py-8 text-center text-xs text-[var(--color-text-muted)] border-t border-[var(--color-border)]">
        Be water, my dear friend
      </footer>
    </>
  );
}
