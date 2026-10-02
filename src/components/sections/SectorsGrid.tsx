import Link from "next/link";
import { Flame, Factory, Zap, Layers, ArrowUpRight } from "lucide-react";
import { sectors, sectorHref } from "@/lib/nav";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TodoBadge } from "@/components/ui/TodoBadge";
const icons = [Flame, Factory, Zap, Layers];
export function SectorsGrid() {
  return (
    <section className="border-y border-line bg-surface py-section">
      <Container>
        <SectionHeading {...placeholders.headings.sectors} />
        <p className="mb-10 text-muted">
          {placeholders.sector.description} <TodoBadge />
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((name, index) => {
            const Icon = icons[index];
            return (
              <Link
                key={name}
                href={sectorHref(name)}
                className="flex min-h-52 flex-col justify-between border border-line bg-paper p-7 hover:border-amber-dark"
              >
                <Icon size={30} strokeWidth={1.3} aria-hidden="true" />
                <span className="flex items-center justify-between gap-3 font-display text-2xl">
                  {name}
                  <ArrowUpRight size={18} />
                </span>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
