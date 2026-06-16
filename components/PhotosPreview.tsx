import Link from "next/link";
import MomentsCarousel from "@/components/MomentsCarousel";
import { getFeaturedMedia } from "@/lib/media";

export default function PhotosPreview() {
  const items = getFeaturedMedia(3);

  return (
    <section id="moments" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Moments</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
              喜欢粗粒度的生活，不需要那么多的装饰、精致感，这本身就让我感到很有生命力了！
            </p>
          </div>
          <Link
            href="/moments"
            className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            View all →
          </Link>
        </div>

        <div className="mt-10">
          <MomentsCarousel items={items} />
        </div>
      </div>
    </section>
  );
}
