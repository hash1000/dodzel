import { ImageResponse } from "next/og";
import { themeColor } from "@/lib/theme";
import { placeholders } from "@/content/placeholder";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: themeColor("navy"),
        color: themeColor("amber"),
        fontSize: 17,
        fontWeight: 700,
      }}
    >
      {placeholders.brand.text}
    </div>,
    size,
  );
}
