import { ImageResponse } from "next/og";
export const runtime = "nodejs";
export const alt =
  "Dekoraj Group. Building the infrastructure behind modern agriculture.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#07110b",
        color: "#f2efe6",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 24, color: "#b7d68d", letterSpacing: 6 }}>
        DEKORAJ GROUP
      </div>
      <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
        BUILDING THE INFRASTRUCTURE BEHIND MODERN AGRICULTURE.
      </div>
      <div style={{ fontSize: 18, color: "#b7d68d" }}>
        AGRICULTURE / INFRASTRUCTURE / TECHNOLOGY
      </div>
    </div>,
    size,
  );
}
