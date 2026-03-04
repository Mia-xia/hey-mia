import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "#f8fafc",
          color: "#0f172a",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.8 }}>hey.mia</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>Mia Xia</div>
          <div style={{ fontSize: 34, color: "#334155" }}>
            Product Operations · Portfolio
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#475569" }}>heymiax.com</div>
      </div>
    ),
    size,
  );
}
