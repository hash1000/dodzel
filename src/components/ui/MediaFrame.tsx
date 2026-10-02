import { HoverVideo } from "./HoverVideo";
import Image from "next/image";
import { media, placeholderMedia } from "@/content/media";
import { cn } from "@/lib/utils";
import { StockBadge } from "./StockBadge";
import { TodoBadge } from "./TodoBadge";
export function MediaFrame({
  priority = false,
  className,
  slot,
  sizes = "(max-width: 768px) 100vw, 50vw",
  scrim = false,
  video = false,
}: {
  priority?: boolean;
  className?: string;
  blueprint?: boolean;
  slot?: string;
  sizes?: string;
  scrim?: boolean;
  video?: boolean;
}) {
  const asset = (slot ? media[slot] : undefined) ?? placeholderMedia;
  const largest = asset.srcset.at(-1);
  return (
    <div
      className={cn(
        "media-grade relative aspect-[16/10] overflow-hidden rounded-card bg-surface-raised text-on-dark",
        className,
      )}
    >
      <Image
        data-media-image
        src={largest?.avif ?? asset.src}
        alt={asset.alt}
        fill
        unoptimized={asset.kind === "placeholder"}
        preload={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        placeholder={asset.blurDataURL ? "blur" : "empty"}
        blurDataURL={asset.blurDataURL || undefined}
        style={{
          objectPosition: `${asset.focal.x * 100}% ${asset.focal.y * 100}%`,
        }}
        className="object-cover"
      />
      {video && asset.kind === "video" && <HoverVideo asset={asset} />}
      {scrim && (
        <div aria-hidden="true" className="media-shade absolute inset-0" />
      )}
      <div className="absolute start-4 top-4 z-10">
        {asset.stock ? <StockBadge credit={asset.credit} /> : <TodoBadge />}
      </div>
    </div>
  );
}
