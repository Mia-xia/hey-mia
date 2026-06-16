"use client";

import Image from "next/image";
import Link from "next/link";
import type { MediaItem } from "@/lib/media";

type MomentsCarouselProps = {
  items: MediaItem[];
};

export default function MomentsCarousel({ items }: MomentsCarouselProps) {
  if (items.length === 0) return null;

  const loopItems = [...items, ...items];

  return (
    <div className="moments-marquee" aria-label="Moments carousel">
      <div className="moments-marquee-track">
        {loopItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href="/moments"
            className="moments-marquee-card group"
            aria-label={`Open ${item.title}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 32vw, 82vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              priority={index === 0}
            />
            <div className="moments-slide-shade" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-white/70">Moment</p>
              <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
              {item.caption ? (
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/78">{item.caption}</p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
