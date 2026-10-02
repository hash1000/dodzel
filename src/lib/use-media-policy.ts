"use client";
import { useEffect, useState } from "react";
type Connection = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (event: string, callback: () => void) => void;
  removeEventListener?: (event: string, callback: () => void) => void;
};
export function useMediaPolicy() {
  const [policy, setPolicy] = useState({
    reduced: true,
    videoAllowed: false,
    mobile: false,
  });
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)"),
      mobile = matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & { connection?: Connection })
      .connection;
    const sync = () =>
      setPolicy({
        reduced: motion.matches,
        mobile: mobile.matches,
        videoAllowed:
          !motion.matches &&
          !connection?.saveData &&
          !["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? ""),
      });
    sync();
    motion.addEventListener("change", sync);
    mobile.addEventListener("change", sync);
    connection?.addEventListener?.("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      mobile.removeEventListener("change", sync);
      connection?.removeEventListener?.("change", sync);
    };
  }, []);
  return policy;
}
