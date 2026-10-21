import { ImageResponse } from "next/og";
import { themeColor } from "@/lib/theme";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
import { SHOW_TODO_BADGES } from "@/lib/constants";

export const alt = "Dodzel Engineering — temporary social preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  const bg = themeColor("surface-dark");
  const fg = themeColor("on-dark");
  const accent = themeColor("brand");
  const accentText = themeColor("brand-glow");
  const muted = themeColor("on-dark-muted");

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        backgroundColor: bg,
        color: fg,
        fontFamily: "sans-serif",
        borderLeft: `24px solid ${accent}`,
      }}
    >
      <div style={{ display: "flex", fontSize: 62, fontWeight: 700 }}>
        {real.company.name}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 25,
          color: accentText,
        }}
      >
        Engineering · Procurement · Construction
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 70,
          fontSize: 19,
          color: muted,
        }}
      >
        {placeholders.og.label}
        {SHOW_TODO_BADGES ? " · TODO" : ""}
      </div>
    </div>,
    size,
  );
}