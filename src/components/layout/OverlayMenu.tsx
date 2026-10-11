import Link from "next/link";
import Image from "next/image";
import { secondaryLinks, subsidiaries } from "@/lib/nav";
export function OverlayMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid gap-12 md:grid-cols-2">
      <div>
        <p className="mb-6 text-xs uppercase tracking-widest text-accent">
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
        <p className="mb-6 text-xs uppercase tracking-widest text-accent">
          Subsidiaries
        </p>
        <ul className="space-y-6">
          {subsidiaries.map((item) => (
            <li key={item.name}>
              <Link
                href={`/about#${item.name.toLowerCase()}`}
                className="inline-flex h-20 w-44 items-center justify-center rounded-card border border-white/15 bg-white px-4 py-3 transition-colors hover:border-accent"
                onClick={onNavigate}
              >
                <Image src={item.logo} alt={item.name} width={1401} height={752} sizes="144px" className="h-full w-full object-contain" />
              </Link>
              <p className="mt-2 text-sm text-on-dark-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
