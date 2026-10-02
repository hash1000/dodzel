import Image from "next/image";
import { placeholders } from "@/content/placeholder";
import { TodoBadge } from "./TodoBadge";
export function MediaFrame({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-navy-light text-muted-dark">
      <Image
        src={placeholders.media.src}
        alt={placeholders.media.alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-2 text-xs">
        <span>{placeholders.media.label}</span>
        <TodoBadge />
      </div>
    </div>
  );
}
