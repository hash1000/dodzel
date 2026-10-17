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
        <p className="eyebrow mb-4 type-label">
          {eyebrow}
        </p>
        <h2 className="max-w-3xl tracking-tight">
          {title} {todo && <TodoBadge />}
        </h2>
      </div>
      {children}
    </div>
  );
}
