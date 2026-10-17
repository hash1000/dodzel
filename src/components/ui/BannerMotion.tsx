"use client";
import { useRef, type ReactNode } from "react";
import { useBannerMotion } from "@/lib/use-banner-motion";
export function BannerMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useBannerMotion(ref);
  return <section ref={ref} data-banner data-tone="dark" className="page-banner relative isolate overflow-hidden on-navy bg-surface-raised text-[var(--fg-heading)]">{children}</section>;
}
