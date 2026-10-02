import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, serviceHref } from "@/lib/nav";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
export function ServicesGroups() {
  return (
    <section className="py-section">
      <Container>
        <SectionHeading {...placeholders.headings.services}>
          <Button href="/services" variant="outline">
            All services
          </Button>
        </SectionHeading>
        <p className="mb-10 max-w-xl text-muted">
          {placeholders.services.description} <TodoBadge />
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {serviceGroups.map((group, index) => (
            <article
              key={group.title}
              className="rounded-card border border-line bg-surface p-7 sm:p-10"
            >
              <span className="text-xs text-muted">0{index + 1}</span>
              <h3 className="mb-8 mt-3 text-3xl">{group.title}</h3>
              <ul className="divide-y divide-line">
                {group.services.map((name) => (
                  <li key={name}>
                    <Link
                      href={serviceHref(name)}
                      className="flex min-h-14 items-center justify-between gap-4 py-3 text-sm hover:underline"
                    >
                      {name}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
