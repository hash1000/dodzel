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
  if (pathname.startsWith("/studio")) return <div data-studio-theme className="contents">{children}</div>;
  return (
    <SmoothScrollProvider>
      <div className="site-typography on-light">
        {chrome}
        {children}
      </div>
    </SmoothScrollProvider>
  );
}
export function SiteOnly({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/studio") ? null : children;
}
