import { SHOW_TODO_BADGES } from "@/lib/constants";
export function ReviewBadge({
  todo = false,
  confirm = false,
}: {
  todo?: boolean;
  confirm?: boolean;
}) {
  if (!SHOW_TODO_BADGES || (!todo && !confirm)) return null;
  return (
    <span
      className="inline-flex rounded-card bg-amber px-1.5 py-0.5 align-middle text-[10px] font-semibold tracking-wider text-navy"
      title={
        todo
          ? "Client input required"
          : "Current-site fact: client confirmation required"
      }
    >
      {todo && confirm ? "TODO: CONFIRM" : todo ? "TODO" : "CONFIRM"}
    </span>
  );
}
