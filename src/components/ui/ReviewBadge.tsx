export function ReviewBadge({
  todo = false,
  confirm = false,
}: {
  todo?: boolean;
  confirm?: boolean;
}) {
  if (!todo && !confirm) return null;
  return (
    <span
      data-review-badge
      className="review-badge inline-flex rounded-card bg-accent px-1.5 py-0.5 align-middle text-[10px] font-semibold tracking-wider text-surface-dark"
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
