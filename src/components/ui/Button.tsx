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
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-4 rounded-card border px-5 py-3 text-sm font-semibold",
        variant === "primary"
          ? "border-amber bg-amber text-navy hover:bg-on-dark hover:border-on-dark"
          : "border-current bg-transparent hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}
