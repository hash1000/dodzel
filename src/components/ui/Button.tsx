import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ComponentProps<typeof Link> & { variant?: "primary" | "outline" }) {
  return (
    <Link
      prefetch={false}
      className={cn(
        "action inline-flex min-h-12 items-center justify-center gap-4 rounded-card border px-5 py-3 text-sm font-semibold",
        variant === "primary"
          ? "border-brand bg-brand text-white hover:bg-brand/85 hover:border-brand [&>.action-arrow]:text-white"
          : "border-current bg-transparent text-[var(--fg-link)] hover:text-[var(--fg-link-hover)] hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight
        size={17}
        className="action-arrow rtl:-scale-x-100"
        aria-hidden="true"
      />
    </Link>
  );
}
