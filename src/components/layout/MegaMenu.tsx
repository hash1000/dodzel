import Link from "next/link";
import { serviceGroups, serviceHref, sectors, sectorHref } from "@/lib/nav";
import { placeholders } from "@/content/placeholder";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function MegaMenu({
  kind,
  onNavigate,
}: {
  kind: "Services" | "Sectors";
  onNavigate: () => void;
}) {
  return (
    <div className="absolute start-0 end-0 top-full border-t border-dark-line bg-navy p-8 text-on-dark shadow-xl">
      <div className="mx-auto grid max-w-site grid-cols-2 gap-10">
        {kind === "Services"
          ? serviceGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-4 text-xs uppercase tracking-widest text-amber">
                  {group.title}
                </p>
                <ul className="space-y-3">
                  {group.services.map((name) => (
                    <li key={name}>
                      <Link
                        href={serviceHref(name)}
                        onClick={onNavigate}
                        className="inline-block py-1 hover:underline"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : sectors.map((name) => (
              <div key={name}>
                <Link
                  href={sectorHref(name)}
                  onClick={onNavigate}
                  className="text-xl hover:underline"
                >
                  {name}
                </Link>
                {name === "Oil & Gas" && (
                  <ul className="mt-4 space-y-2 text-sm text-muted-dark">
                    {placeholders.oilGasSubitems.map((item) => (
                      <li key={item.title}>
                        {item.title} <TodoBadge />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
