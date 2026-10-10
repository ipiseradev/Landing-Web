import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101113",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M4 20L20 4L36 20L20 36L4 20Z" stroke="#FF6A1A" strokeWidth="3" />
          <path d="M14 20L20 14L26 20L20 26L14 20Z" fill="#FF6A1A" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
