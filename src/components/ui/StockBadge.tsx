export function StockBadge({ credit }: { credit?: string }) {
  return (
    <span
      data-review-badge
      title={credit}
      className="review-badge rounded-full bg-surface-dark px-3 py-1 text-[10px] font-semibold tracking-wider text-on-dark"
    >
      STOCK
    </span>
  );
}
