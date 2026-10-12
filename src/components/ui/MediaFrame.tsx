import Image from "next/image";
import { media, placeholderMedia } from "@/content/media";
import { cn } from "@/lib/utils";
import { MediaReveal } from "./MediaReveal";
export function MediaFrame({ priority = false, className, slot, sizes = "(max-width: 768px) 100vw, 50vw", scrim = false, banner = false, reveal = false }: {
  priority?: boolean; className?: string; slot?: string; sizes?: string; scrim?: boolean; banner?: boolean; reveal?: boolean; video?: boolean;
}) {
  const asset = (slot ? media[slot] : undefined) ?? placeholderMedia;
  const strength = asset.scrimStrength ?? .64;
  const image = asset.kind === "placeholder" ? <div data-media-placeholder className="absolute inset-0 grid place-items-center bg-surface-raised"></div> : <>
    <Image data-media-image data-banner-image={banner || undefined} data-media-slot={slot} src={asset.srcset.at(-1)?.avif ?? asset.src} alt={asset.alt} fill unoptimized={asset.srcset.length === 1} preload={priority} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} sizes={sizes} placeholder={asset.blurDataURL ? "blur" : "empty"} blurDataURL={asset.blurDataURL || undefined} style={{ objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%` }} className="object-cover" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-scrim" style={{ opacity: scrim || banner ? strength : .06 }} />
  </>;
  return <div className={cn("relative aspect-[16/10] overflow-hidden rounded-card bg-surface-raised text-on-dark", className)}>{reveal && !banner ? <MediaReveal>{image}</MediaReveal> : image}</div>;
}
