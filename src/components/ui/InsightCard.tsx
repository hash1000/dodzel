import Link from "next/link";
import { placeholders } from "@/content/placeholder";
import { MediaFrame } from "./MediaFrame";
import { TodoBadge } from "./TodoBadge";
export function InsightCard({
  insight,
}: {
  insight: (typeof placeholders.insights)[number];
}) {
  return (
    <article className="border-b border-line pb-6">
      <MediaFrame />
      <p className="mt-5 text-xs uppercase tracking-wider text-muted">
        {insight.category}
      </p>
      <h3 className="my-3 text-xl">
        <Link
          href={`/insights#insight-${insight.id}`}
          className="hover:underline"
        >
          {insight.title}
        </Link>
      </h3>
      <p className="flex items-center gap-3 text-sm text-muted">
        {insight.date}
        <TodoBadge />
      </p>
    </article>
  );
}
