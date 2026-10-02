"use client";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/content/media";
import { useMediaPolicy } from "@/lib/use-media-policy";
import { ActiveVideo } from "./ActiveVideo";
export function HoverVideo({ asset }: { asset: MediaAsset }) {
  const ref = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false),
    [visible, setVisible] = useState(false);
  const { videoAllowed, mobile } = useMediaPolicy();
  useEffect(() => {
    const parent = ref.current?.closest("a") ?? ref.current?.parentElement;
    if (!parent) return;
    const enter = () => setEngaged(true),
      leave = () => setEngaged(false);
    parent.addEventListener("mouseenter", enter);
    parent.addEventListener("mouseleave", leave);
    parent.addEventListener("focusin", enter);
    parent.addEventListener("focusout", leave);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(parent);
    return () => {
      observer.disconnect();
      parent.removeEventListener("mouseenter", enter);
      parent.removeEventListener("mouseleave", leave);
      parent.removeEventListener("focusin", enter);
      parent.removeEventListener("focusout", leave);
    };
  }, []);
  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {videoAllowed && engaged && visible && (
        <ActiveVideo
          asset={asset}
          mobile={mobile}
          paused={false}
          visible={visible}
        />
      )}
    </div>
  );
}
