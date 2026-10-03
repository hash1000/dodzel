import { ImageResponse } from "next/og";
import { themeColor } from "@/lib/theme";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
import { SHOW_TODO_BADGES } from "@/lib/constants";

export const alt = "Dodzel Engineering — temporary social preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Satori sirf seedhe colour values samajhta hai (hex/rgb), "initial" ya var() nahi.
const safeColor = (token: Parameters<typeof themeColor>[0], fallback: string) => {
  const value = String(themeColor(token) ?? "");
  const isPlain = /^(#|rgb|hsl)/i.test(value);
  return isPlain ? value : fallback;
};

export default function Image() {
  const bg = safeColor("surface-dark", "#1a1a1a");
  const fg = safeColor("on-dark", "#ffffff");
  const accent = safeColor("accent", "#A3201A");
  const muted = safeColor("on-dark-muted", "#b8b8b8");

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
          color: accent,
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