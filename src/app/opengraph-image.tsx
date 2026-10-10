import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#101113",
          color: "#F4F2ED",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M4 20L20 4L36 20L20 36L4 20Z" stroke="#FF6A1A" strokeWidth="3" />
            <path d="M14 20L20 14L26 20L20 26L14 20Z" fill="#FF6A1A" />
          </svg>
          <span style={{ fontSize: 24, letterSpacing: 6, color: "#8B9199" }}>
            FERROX / EQUIPAMIENTO &amp; SUMINISTROS
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          HERRAMIENTAS PARA LOS QUE
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#FF6A1A" }}>
          CONSTRUYEN EL FUTURO.
        </div>
      </div>
    ),
    { ...size }
  );
}
