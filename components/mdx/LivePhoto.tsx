"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function LivePhoto({
  poster,
  video,
  alt,
  caption,
}: {
  poster: string;
  video?: string;
  alt: string;
  caption?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  function play() {
    if (!videoRef.current || !video) return;
    setActive(true);
    videoRef.current.currentTime = 0;
    void videoRef.current.play();
  }

  function stop() {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setActive(false);
  }

  return (
    <figure className="my-10">
      <button
        type="button"
        className="group relative block w-full overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-2)] text-left"
        onMouseEnter={play}
        onMouseLeave={stop}
        onFocus={play}
        onBlur={stop}
        onClick={play}
      >
        <Image
          src={poster}
          alt={alt}
          width={1200}
          height={800}
          className={`h-auto w-full object-cover transition-opacity duration-200 ${
            active ? "opacity-0" : "opacity-100"
          }`}
        />
        {video ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${
              active ? "opacity-100" : "opacity-0"
            }`}
            src={video}
            muted
            playsInline
            onEnded={() => setActive(false)}
          />
        ) : null}
        <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
          LIVE
        </span>
      </button>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
