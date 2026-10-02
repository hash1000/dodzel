import { SHOW_TODO_BADGES } from "@/lib/constants";
export function TodoBadge({ todo = true }: { todo?: boolean }) {
  return SHOW_TODO_BADGES && todo ? (
    <span
      className="inline-flex rounded-card bg-amber px-1.5 py-0.5 align-middle text-[10px] font-bold tracking-wider text-navy"
      title="Placeholder: client-approved content required"
    >
      TODO
    </span>
  ) : null;
}
