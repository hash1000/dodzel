export function TodoBadge({ todo = true }: { todo?: boolean }) {
  return todo ? (
    <span
      data-review-badge
      className="review-badge inline-flex rounded-card bg-accent px-1.5 py-0.5 align-middle text-[10px] font-bold tracking-wider text-surface-dark"
      title="Placeholder: client-approved content required"
    >
      TODO
    </span>
  ) : null;
}
