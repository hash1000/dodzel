import type { ReactNode } from "react";
export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-card border border-current px-2 py-1 text-xs">
      {children}
    </span>
  );
}
