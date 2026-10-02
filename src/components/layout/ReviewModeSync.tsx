"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SHOW_TODO_BADGES } from "@/lib/constants";
export function ReviewModeSync() {
  const pathname = usePathname();
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("review");
    if (query === "0" || query === "1")
      document.cookie = `dodzel-review=${query}; Path=/; Max-Age=2592000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    const cookie = document.cookie
      .split(";")
      .some((item) => item.trim() === "dodzel-review=1");
    document.documentElement.dataset.review =
      SHOW_TODO_BADGES || cookie ? "1" : "0";
  }, [pathname]);
  return null;
}
