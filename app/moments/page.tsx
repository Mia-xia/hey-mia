import type { Metadata } from "next";
import Image from "next/image";
import Nav from "@/components/Nav";
import { LivePhoto } from "@/components/mdx/LivePhoto";
import { type MediaItem, mediaItems } from "@/lib/media";

export const metadata: Metadata = {
  title: "Moments",
  description: "Still photos and visual fragments from Mia Xia.",
  alternates: {
    canonical: "/moments",
  },
};

const desktopMomentColumns = [
  [mediaItems[0], mediaItems[3], mediaItems[4]],
  [mediaItems[1], mediaItems[6], mediaItems[7]],
  [mediaItems[2], mediaItems[5], mediaItems[8]],
].map((column) => column.filter(Boolean));

function MomentCard({ item }: { item: MediaItem }) {
  return (
    <article className="moments-mosaic-card">
      {item.kind === "live" ? (
        <div className="px-0 [&_figure]:my-0 [&_figcaption]:hidden">
          <LivePhoto
            poster={item.src}
            video={item.videoSrc}
            alt={item.alt}
            caption={item.caption}
          />
        </div>
      ) : item.kind === "video" ? (
        <video
          className="aspect-[4/3] w-full bg-black object-cover"
          src={item.videoSrc ?? item.src}
          poster={item.src}
          controls
          playsInline
        />
      ) : (
        <Image
          src={item.src}
          alt={item.alt}
          width={900}
          height={675}
          className="moments-mosaic-image"
        />
      )}
      <div className="moments-mosaic-caption">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold">{item.title}</h2>
          <span className="rounded-full border border-white/30 px-2 py-0.5 text-xs text-white/78">
            Moment
          </span>
        </div>
        {item.caption ? (
          <p className="mt-3 text-sm leading-6 text-white/78">
            {item.caption}
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default function PhotosPage() {
  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-semibold tracking-tight">Moments</h1>
          <p className="mt-5 max-w-2xl text-[var(--color-text-muted)] leading-7">
            就这样继续记录下去吧
          </p>

          <div className="moments-mosaic mt-14">
            {mediaItems.map((item) => (
              <MomentCard key={item.id} item={item} />
            ))}
          </div>

          <div className="moments-masonry mt-14">
            {desktopMomentColumns.map((column, index) => (
              <div className="moments-masonry-column" key={index}>
                {column.map((item) => (
                  <MomentCard key={item.id} item={item} />
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
