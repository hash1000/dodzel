import Image from "next/image";
import { placeholders } from "@/content/placeholder";
import { cn } from "@/lib/utils";
import { TodoBadge } from "./TodoBadge";
export function MediaFrame({
  priority = false,
  className,
  blueprint = false,
}: {
  priority?: boolean;
  className?: string;
  blueprint?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-card bg-navy-raised text-muted-dark",
        className,
      )}
    >
      <Image
        data-media-image
        src={placeholders.media.src}
        alt={placeholders.media.alt}
        fill
        preload={priority}
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover"
      />
      <div className="media-shade absolute inset-0" />
      {blueprint && (
        <div
          aria-hidden="true"
          className="hero-grid absolute inset-0 opacity-25"
        />
      )}
      <div className="absolute inset-0 flex items-end gap-2 p-5 text-xs">
        <span>{placeholders.media.label}</span>
        <TodoBadge />
      </div>
    </div>
  );
}
