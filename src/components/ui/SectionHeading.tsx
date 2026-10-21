import { TodoBadge } from "./TodoBadge";
import type { ReactNode } from "react";
export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  todo = false,
}: {
  id?: string;
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
        <h2 id={id} className="max-w-3xl tracking-tight">
          {title} {todo && <TodoBadge />}
        </h2>
      </div>
      {children}
    </div>
  );
}
