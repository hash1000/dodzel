"use client";
import type { ImageLoaderProps } from "next/image";
// Outputs are produced at known widths, so Next/Image can emit responsive srcsets
// without an extra encoding pass on the deployment server.
export default function mediaImageLoader({ src, width }: ImageLoaderProps) {
  const match = src.match(/-(640|1080|1920|2560)\.(avif|webp)$/);
  if (!match) return src;
  const cap = Number(match[1]);
  const target =
    [640, 1080, 1920, 2560].filter((w) => w <= cap).find((w) => w >= width) ??
    cap;
  return src.replace(
    /-(640|1080|1920|2560)\.(avif|webp)$/,
    `-${target}.${match[2]}`,
  );
}
