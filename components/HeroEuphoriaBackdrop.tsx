"use client";

import { useRef, useState } from "react";

const videoId = "wTggN-80US8";
const start = 36;
const end = 68;

export default function HeroEuphoriaBackdrop() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
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
    `&enablejsapi=1`,
    `&origin=${encodeURIComponent("https://www.heymiax.com")}`,
  ].join("");

  function sendYouTubeCommand(func: string, args: unknown[] = []) {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube-nocookie.com",
    );
  }

  function enableSound() {
    sendYouTubeCommand("unMute");
    sendYouTubeCommand("setVolume", [70]);
    sendYouTubeCommand("playVideo");
    setSoundEnabled(true);
  }

  return (
    <div className="hero-video-backdrop">
      <iframe
        ref={iframeRef}
        className="hero-video-frame"
        src={src}
        title="euphoria - december live background"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        tabIndex={-1}
      />
      <div className="hero-video-soften" />
      <div className="hero-video-scrim" />
      <button
        type="button"
        className="hero-sound-button"
        onClick={enableSound}
        aria-label={soundEnabled ? "Sound is on" : "Turn hero sound on"}
        data-enabled={soundEnabled}
      >
        {soundEnabled ? "Sound on" : "Turn sound on"}
      </button>
    </div>
  );
}
