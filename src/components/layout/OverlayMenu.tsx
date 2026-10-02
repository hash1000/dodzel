import Link from "next/link";
import { secondaryLinks, subsidiaries } from "@/lib/nav";
export function OverlayMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <p className="mb-6 text-xs uppercase tracking-widest text-amber">
          Explore more
        </p>
        <ul className="space-y-5">
          {secondaryLinks.map((link) => (
            <li key={link.href}>
              <Link
                className="text-3xl hover:underline"
                href={link.href}
                onClick={onNavigate}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-6 text-xs uppercase tracking-widest text-amber">
          Subsidiaries
        </p>
        <ul className="space-y-6">
          {subsidiaries.map((item) => (
            <li key={item.name}>
              <Link
                href={`/about#${item.name.toLowerCase()}`}
                className="text-2xl hover:underline"
                onClick={onNavigate}
              >
                {item.name}
              </Link>
              <p className="mt-2 text-sm text-muted-dark">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
