"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };
type Curve = [Point, Point, Point, Point];

function cubic([p0, p1, p2, p3]: Curve, t: number): Point {
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function tangent([p0, p1, p2, p3]: Curve, t: number): Point {
  const u = 1 - t;
  return {
    x: 3 * u ** 2 * (p1.x - p0.x) + 6 * u * t * (p2.x - p1.x) + 3 * t ** 2 * (p3.x - p2.x),
    y: 3 * u ** 2 * (p1.y - p0.y) + 6 * u * t * (p2.y - p1.y) + 3 * t ** 2 * (p3.y - p2.y),
  };
}

function normalAt(curve: Curve, t: number) {
  const tan = tangent(curve, t);
  const len = Math.hypot(tan.x, tan.y) || 1;
  return {
    nx: -tan.y / len,
    ny: tan.x / len,
  };
}

function pointOnFlow(curve: Curve, t: number, offset: number, time: number, drift = 0): Point {
  const point = cubic(curve, t);
  const { nx, ny } = normalAt(curve, t);
  const surface = Math.sin(t * Math.PI * 5 + time * 0.0016 + drift) * 4;
  const undertow = Math.sin(t * Math.PI * 11 - time * 0.0011 + drift * 0.7) * 2.2;
  const flowOffset = offset + surface + undertow;

  return {
    x: point.x + nx * flowOffset,
    y: point.y + ny * flowOffset,
  };
}

function drawSampledPath(
  ctx: CanvasRenderingContext2D,
  curve: Curve,
  offset: number,
  time: number,
  drift: number,
  from = 0,
  to = 1,
  steps = 72,
) {
  for (let i = 0; i <= steps; i += 1) {
    const t = from + ((to - from) * i) / steps;
    const point = pointOnFlow(curve, t, offset, time, drift);
    if (i === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  }
}

function drawRiverRibbon(
  ctx: CanvasRenderingContext2D,
  curve: Curve,
  width: number,
  colors: { core: string; edge: string },
  time: number,
  reverse = false,
) {
  const start = cubic(curve, 0);
  const end = cubic(curve, 1);
  const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
  gradient.addColorStop(reverse ? 1 : 0, colors.edge);
  gradient.addColorStop(0.48, colors.core);
  gradient.addColorStop(reverse ? 0 : 1, colors.edge);

  ctx.beginPath();
  drawSampledPath(ctx, curve, width, time, reverse ? 4 : 0, 0, 1, 86);
  for (let i = 86; i >= 0; i -= 1) {
    const t = i / 86;
    const point = pointOnFlow(curve, t, -width, time, reverse ? 6 : 2);
    ctx.lineTo(point.x, point.y);
  }
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.5;
  ctx.fill();

  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = colors.edge;
  ctx.lineWidth = Math.max(14, width * 0.42);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  drawSampledPath(ctx, curve, 0, time, reverse ? 8 : 3, 0, 1, 92);
  ctx.stroke();
}

function drawSurfaceLines(
  ctx: CanvasRenderingContext2D,
  curve: Curve,
  riverWidth: number,
  colors: { line: string; foam: string },
  time: number,
  reverse = false,
) {
  const lineCount = 18;

  for (let i = 0; i < lineCount; i += 1) {
    const row = i / (lineCount - 1);
    const offset = (row - 0.5) * riverWidth * 1.58;
    const drift = (reverse ? -1 : 1) * (i * 0.63 + time * 0.0014);
    const alpha = 0.1 + (1 - Math.abs(row - 0.5) * 2) * 0.22;

    ctx.beginPath();
    drawSampledPath(ctx, curve, offset, time, drift, 0.02, 0.98, 96);
    ctx.strokeStyle = i % 5 === 0 ? colors.foam : colors.line;
    ctx.globalAlpha = i % 5 === 0 ? alpha + 0.08 : alpha;
    ctx.lineWidth = i % 5 === 0 ? 1.4 : 1.9;
    ctx.stroke();
  }
}

function drawMovingSheen(
  ctx: CanvasRenderingContext2D,
  curve: Curve,
  riverWidth: number,
  color: string,
  time: number,
  reverse = false,
) {
  for (let i = 0; i < 4; i += 1) {
    const travel = (time * 0.00009 + i * 0.28) % 1;
    const center = reverse ? 1 - travel : travel;
    const from = Math.max(0.02, center - 0.22);
    const to = Math.min(0.98, center + 0.22);
    const offset = Math.sin(i * 1.8 + time * 0.0009) * riverWidth * 0.34;

    ctx.beginPath();
    drawSampledPath(ctx, curve, offset, time, i * 1.4, from, to, 42);
    ctx.strokeStyle = color;
    ctx.globalAlpha = 0.22;
    ctx.lineWidth = riverWidth * 0.12;
    ctx.stroke();
  }
}

function drawConfluence(
  ctx: CanvasRenderingContext2D,
  meeting: Point,
  size: number,
  colors: { foam: string; mist: string },
  time: number,
) {
  const pulse = 1 + Math.sin(time * 0.0011) * 0.08;
  const gradient = ctx.createRadialGradient(meeting.x, meeting.y, size * 0.1, meeting.x, meeting.y - size * 0.25, size * pulse);
  gradient.addColorStop(0, colors.foam);
  gradient.addColorStop(0.32, colors.mist);
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.52;
  ctx.beginPath();
  ctx.arc(meeting.x, meeting.y - size * 0.18, size * pulse, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 5; i += 1) {
    const radius = size * (0.18 + i * 0.08);
    const start = time * 0.0008 + i * 0.8;
    ctx.beginPath();
    for (let j = 0; j <= 54; j += 1) {
      const a = start + j * 0.065;
      const r = radius + j * 0.18;
      const x = meeting.x + Math.cos(a) * r;
      const y = meeting.y - size * 0.08 + Math.sin(a) * r * 0.42;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = colors.foam;
    ctx.globalAlpha = 0.11;
    ctx.lineWidth = 1.3;
    ctx.stroke();
  }
}

export default function HeroWaterFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasEl = canvas;
    const context = canvasEl.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx = context;

    let width = 0;
    let height = 0;
    let raf = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      const rect = canvasEl.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvasEl.width = Math.max(1, Math.floor(width * dpr));
      canvasEl.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function palette() {
      const dark = document.documentElement.classList.contains("dark");
      return dark
        ? {
            arctic: { core: "rgba(101, 196, 255, 0.58)", edge: "rgba(210, 237, 255, 0.2)" },
            nile: { core: "rgba(70, 192, 178, 0.48)", edge: "rgba(238, 187, 94, 0.2)" },
            line: "rgba(226, 246, 255, 0.9)",
            foam: "rgba(244, 251, 255, 0.82)",
            mist: "rgba(215, 235, 255, 0.22)",
          }
        : {
            arctic: { core: "rgba(56, 161, 232, 0.5)", edge: "rgba(185, 226, 255, 0.28)" },
            nile: { core: "rgba(42, 159, 145, 0.42)", edge: "rgba(205, 153, 69, 0.24)" },
            line: "rgba(255, 255, 255, 0.9)",
            foam: "rgba(255, 255, 255, 0.86)",
            mist: "rgba(255, 255, 255, 0.32)",
          };
    }

    function makeCurves(time: number) {
      const breathe = Math.sin(time * 0.00042) * height * 0.018;
      const meeting: Point = { x: width * 0.61, y: height * 0.38 + breathe };
      const arctic: Curve = [
        { x: -width * 0.16, y: height * 0.76 },
        { x: width * 0.15, y: height * 0.71 - breathe },
        { x: width * 0.33, y: height * 0.5 + breathe },
        meeting,
      ];
      const nile: Curve = [
        { x: width * 1.16, y: height * 0.78 },
        { x: width * 0.88, y: height * 0.69 + breathe },
        { x: width * 0.75, y: height * 0.52 - breathe },
        meeting,
      ];

      return { arctic, nile, meeting };
    }

    function render(time: number) {
      ctx.clearRect(0, 0, width, height);
      const colors = palette();
      const { arctic, nile, meeting } = makeCurves(time);
      const riverWidth = Math.max(44, Math.min(width, height) * 0.09);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.globalCompositeOperation = "source-over";

      drawRiverRibbon(ctx, arctic, riverWidth, colors.arctic, time);
      drawRiverRibbon(ctx, nile, riverWidth, colors.nile, time + 700, true);

      ctx.globalCompositeOperation = "screen";
      drawSurfaceLines(ctx, arctic, riverWidth, { line: colors.arctic.core, foam: colors.foam }, time);
      drawSurfaceLines(ctx, nile, riverWidth, { line: colors.nile.core, foam: colors.foam }, time + 900, true);
      drawMovingSheen(ctx, arctic, riverWidth, colors.foam, time);
      drawMovingSheen(ctx, nile, riverWidth, colors.foam, time + 600, true);
      drawConfluence(ctx, meeting, riverWidth * 2.8, { foam: colors.foam, mist: colors.mist }, time);

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";

      if (!reduceMotion) {
        raf = requestAnimationFrame(render);
      }
    }

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvasEl);
    raf = requestAnimationFrame(render);

    if (reduceMotion) render(0);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-flow-canvas" aria-hidden="true" />;
}
