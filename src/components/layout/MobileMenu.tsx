import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getService } from "@/lib/services";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import {
  navLinks,
  serviceGroups,
  serviceHref,
  sectors,
  sectorHref,
} from "@/lib/nav";
import { OverlayMenu } from "./OverlayMenu";
export function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="space-y-10">
      <nav aria-label="Primary mobile" className="divide-y divide-white/10">
        {navLinks.map((link, index) =>
          link.label === "Services" || link.label === "Sectors" ? (
            <details key={link.href} data-mobile-row className="group py-4">
              <summary className="flex cursor-pointer list-none items-center gap-4 font-heading text-[2rem] font-semibold leading-tight text-white"><span className="w-6 shrink-0 font-mono text-xs text-brand-glow">{String(index + 1).padStart(2, "0")}</span>{link.label}<ChevronDown size={20} aria-hidden="true" className="ms-auto transition-transform group-open:rotate-180 motion-reduce:transition-none" /></summary>
              <Link
                className="mt-4 block text-[var(--fg-eyebrow)]"
                href={link.href}
                onClick={onNavigate}
              >
                View all {link.label.toLowerCase()}
              </Link>
              {link.label === "Services"
                ? serviceGroups.map((group) => (
                    <div key={group.title} className="mt-6">
                      <p className="mb-3 text-description text-[var(--fg-eyebrow)]">{group.title}</p>
                      {group.services.map((name) => (
                        <Link
                          key={name}
                          href={serviceHref(name)}
                          onClick={onNavigate}
                          className="block min-h-11 py-3"
                        >
                          {name} <ReviewBadge {...getService(name)} />
                        </Link>
                      ))}
                    </div>
                  ))
                : sectors.map((name) => (
                    <Link
                      key={name}
                      href={sectorHref(name)}
                      onClick={onNavigate}
                      className="block min-h-11 py-3"
                    >
                      {name} <ReviewBadge confirm={name === "Cement"} />
                    </Link>
                  ))}
            </details>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              onClick={onNavigate}
              data-mobile-row className="flex items-center gap-4 py-4 font-heading text-[2rem] font-semibold leading-tight text-white hover:text-white"
            >
              <span className="w-6 shrink-0 font-mono text-xs text-brand-glow">{String(index + 1).padStart(2, "0")}</span>{link.label}
            </Link>
          ),
        )}
      </nav>
      <OverlayMenu onNavigate={onNavigate} />
    </div>
  );
}
