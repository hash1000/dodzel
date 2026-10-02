"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
export function SiteShell({
  children,
  chrome,
}: {
  children: ReactNode;
  chrome: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/studio")) return children;
  return (
    <SmoothScrollProvider>
      {chrome}
      {children}
    </SmoothScrollProvider>
  );
}
export function SiteOnly({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/studio") ? null : children;
}
