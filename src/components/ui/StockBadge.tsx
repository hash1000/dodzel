export function StockBadge({ credit }: { credit?: string }) {
  return (
    <span
      data-review-badge
      title={credit}
      className="review-badge rounded-full on-navy bg-surface-dark px-3 py-1 text-xs font-semibold tracking-wider text-[var(--fg-heading)]"
    >
      STOCK
    </span>
  );
}
