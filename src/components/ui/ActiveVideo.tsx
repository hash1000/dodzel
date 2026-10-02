"use client";
import { useEffect, useRef, useState } from "react";
import type { MediaAsset } from "@/content/media";
export function ActiveVideo({
  asset,
  mobile,
  paused,
  visible,
  className = "",
}: {
  asset: MediaAsset;
  mobile: boolean;
  paused: boolean;
  visible: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (paused || !visible) video.pause();
    else void video.play().catch(() => {});
  }, [paused, visible, ready]);
  const matching = asset.sources.filter((source) => source.mobile === mobile);
  const sources = matching.length ? matching : asset.sources;
  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={asset.poster}
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      style={{
        objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%`,
      }}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {sources.map((source) => (
        <source key={source.src} src={source.src} type={source.type} />
      ))}
    </video>
  );
}
