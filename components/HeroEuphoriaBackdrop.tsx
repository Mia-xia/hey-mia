"use client";

const videoId = "wTggN-80US8";
const start = 36;
const end = 68;

export default function HeroEuphoriaBackdrop() {
  const src = [
    `https://www.youtube-nocookie.com/embed/${videoId}`,
    `?autoplay=1`,
    `&mute=1`,
    `&controls=0`,
    `&playsinline=1`,
    `&loop=1`,
    `&playlist=${videoId}`,
    `&start=${start}`,
    `&end=${end}`,
    `&modestbranding=1`,
    `&rel=0`,
    `&iv_load_policy=3`,
    `&disablekb=1`,
    `&fs=0`,
  ].join("");

  return (
    <div className="hero-video-backdrop" aria-hidden="true">
      <iframe
        className="hero-video-frame"
        src={src}
        title="euphoria - december live background"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
      <div className="hero-video-soften" />
      <div className="hero-video-scrim" />
    </div>
  );
}
