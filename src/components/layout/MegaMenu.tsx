"use client";
import Link from "next/link";
import { useState } from "react";
import { serviceGroups, serviceHref, sectors, sectorHref, sectorDetailHref } from "@/lib/nav";
import { getService } from "@/lib/services";
import { placeholders } from "@/content/placeholder";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
export function MegaMenu({
  kind,
  onNavigate,
}: {
  kind: "Services" | "Sectors";
  onNavigate: () => void;
}) {
  const [selected, setSelected] = useState("Civil & Buildings");
  const featured = getService(selected);
  return (
    <div
      data-tone="dark"
      data-lenis-prevent
      className="header-dropdown max-h-[calc(100dvh-7rem)] overflow-y-auto border border-white/10 on-dark bg-surface p-8 text-white shadow-xl"
      onKeyDown={(event) => {
        if (
          ![
            "ArrowDown",
            "ArrowUp",
            "ArrowLeft",
            "ArrowRight",
            "Home",
            "End",
          ].includes(event.key)
        )
          return;
        const links = Array.from(
          event.currentTarget.querySelectorAll<HTMLAnchorElement>(
            "[data-menu-link]",
          ),
        );
        const index = links.indexOf(
          document.activeElement as HTMLAnchorElement,
        );
        if (index < 0) return;
        event.preventDefault();
        const forward =
          event.key === "ArrowDown" ||
          (event.key === "ArrowRight" &&
            getComputedStyle(event.currentTarget).direction !== "rtl") ||
          (event.key === "ArrowLeft" &&
            getComputedStyle(event.currentTarget).direction === "rtl");
        const next =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? links.length - 1
              : (index + (forward ? 1 : -1) + links.length) % links.length;
        links[next]?.focus();
      }}
    >
      <Link data-menu-link href={kind === "Services" ? "/services" : "/sectors"} onClick={onNavigate} className="mb-6 inline-flex min-h-11 items-center font-heading text-sm text-white/80 hover:text-white">View all {kind.toLowerCase()}</Link>
      <div className="mx-auto grid max-w-site gap-10 lg:grid-cols-[2fr_1fr]">
        {kind === "Services" ? (
          <>
            <div className="grid grid-cols-2 gap-8">
              {serviceGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-4 type-label text-[var(--fg-eyebrow)]">
                    {group.title}
                  </p>
                  <ul className="space-y-2">
                    {group.services.map((name) => {
                      const service = getService(name);
                      return (
                        <li key={name}>
                          <Link
                            data-menu-link
                            href={serviceHref(name)}
                            onClick={onNavigate}
                            onMouseEnter={() => setSelected(name)}
                            onFocus={() => setSelected(name)}
                            className="inline-flex min-h-11 items-center py-3 text-sm text-white/80 hover:text-white"
                          >
                            {name} <ReviewBadge {...service} />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <aside className="border-s border-dark-line ps-8">

              <p className="mt-5 font-display text-xl font-semibold">
                {featured.name} <ReviewBadge {...featured} />
              </p>
              <p
                aria-live="polite"
                className="mt-3 min-h-20 text-description text-[var(--fg-body)]"
              >
                {featured.description}
              </p>
            </aside>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-8 lg:col-span-2">
            {sectors.map((name) => (
              <div key={name}>
                <Link
                  data-menu-link
                  href={sectorHref(name)}
                  onClick={onNavigate}
                  className="inline-flex min-h-11 items-center text-xl text-white/80 hover:text-white"
                >
                  {name} <ReviewBadge confirm={name === "Cement"} />
                </Link>
                <Link data-menu-link href={sectorDetailHref(name)} onClick={onNavigate} className="mt-2 flex min-h-11 items-center text-sm text-white/80 hover:text-white underline underline-offset-4">Explore {name} →</Link>
                {name === "Oil & Gas" && (
                  <ul className="mt-4 space-y-2 text-sm text-[var(--fg-body)]">
                    {placeholders.oilGasSubitems.map((item) => (
                      <li key={item.title} data-review-badge className="review-badge">
                        {item.title} <ReviewBadge {...item} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
