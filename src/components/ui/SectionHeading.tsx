import { TodoBadge } from "./TodoBadge";
import type { ReactNode } from "react";
export function SectionHeading({
  eyebrow,
  title,
  children,
  todo = false,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  todo?: boolean;
}) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <p className="eyebrow mb-4 text-xs font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
        <h2 className="max-w-3xl text-heading font-semibold tracking-tight">
          {title} {todo && <TodoBadge />}
        </h2>
      </div>
      {children}
    </div>
  );
}
