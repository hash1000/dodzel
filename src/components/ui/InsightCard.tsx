import Link from "next/link";
import { placeholders } from "@/content/placeholder";
import { MediaFrame } from "./MediaFrame";
import { TodoBadge } from "./TodoBadge";
export function InsightCard({
  insight,
  featured = false,
}: {
  insight: (typeof placeholders.insights)[number];
  featured?: boolean;
}) {
  return (
    <article
      className={
        featured
          ? "media-hover border-b border-line pb-6 lg:row-span-2"
          : "grid items-start gap-5 media-hover border-b border-line pb-6 sm:grid-cols-[.8fr_1fr]"
      }
    >
      <MediaFrame
        slot={`insight-${insight.id}`}
        className={featured ? "aspect-[16/10]" : "aspect-[4/3]"}
      />
      <div>
        <p
          className={`${featured ? "mt-5" : "mt-3 sm:mt-0"} text-xs uppercase tracking-wider text-muted`}
        >
          {insight.category}
        </p>
        <h3
          className={`my-3 font-semibold ${featured ? "text-3xl" : "text-xl"}`}
        >
          <Link
            href={`/insights#insight-${insight.id}`}
            className="hover:underline"
          >
            {insight.title}
          </Link>
        </h3>
        <p className="flex flex-wrap items-center gap-3 text-sm text-muted">
          {insight.date}
          <TodoBadge />
        </p>
      </div>
    </article>
  );
}
