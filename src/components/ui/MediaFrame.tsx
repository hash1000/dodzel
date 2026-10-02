import Image from "next/image";
import { media } from "@/content/media";
import { placeholders } from "@/content/placeholder";
import { SHOW_TODO_BADGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { TodoBadge } from "./TodoBadge";
export function MediaFrame({
  priority = false,
  className,
  blueprint = false,
  slot,
}: {
  priority?: boolean;
  className?: string;
  blueprint?: boolean;
  slot?: string;
}) {
  const asset = slot ? media[slot] : undefined;
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-card bg-surface-elevated text-on-dark",
        className,
      )}
    >
      <Image
        data-media-image
        src={asset?.src ?? placeholders.media.src}
        alt={asset?.alt ?? placeholders.media.alt}
        fill
        preload={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
      <div className="media-shade absolute inset-0" />
      {blueprint && !asset && (
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 opacity-25"
        />
      )}
      <div className="absolute start-2 top-2 flex items-center gap-2 text-xs">
        {asset ? (
          SHOW_TODO_BADGES && (
            <span
              title={asset.credit}
              className="rounded-full bg-surface-dark px-1.5 py-0.5 text-[9px] text-on-dark"
            >
              STOCK
            </span>
          )
        ) : (
          <>
            <span>{placeholders.media.label}</span>
            <TodoBadge />
          </>
        )}
      </div>
    </div>
  );
}
