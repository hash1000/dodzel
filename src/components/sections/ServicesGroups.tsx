import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceGroups, serviceHref } from "@/lib/nav";
import { getService } from "@/lib/services";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
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
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
          {serviceGroups.map((group, index) => (
            <article
              key={group.title}
              className="flex h-full min-w-0 flex-col rounded-card border border-line bg-surface p-6 sm:p-8"
            >
              <span className="text-xs text-muted">0{index + 1}</span>
              <h3 className="mb-8 mt-3 text-3xl font-semibold">
                {group.title}
              </h3>
              <ul className="flex flex-1 flex-col divide-y divide-line">
                {group.services.map((name) => {
                  const service = getService(name);
                  return (
                    <li
                      key={name}
                      className="service-row flex flex-1 flex-col justify-center py-3"
                    >
                      <Link
                        href={serviceHref(name)}
                        aria-describedby={`summary-${serviceHref(name).split("#")[1]}`}
                        className="flex items-center justify-between gap-3 text-sm font-medium hover:underline"
                      >
                        <span>
                          {name} <ReviewBadge {...service} />
                        </span>
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </Link>
                      <p
                        id={`summary-${serviceHref(name).split("#")[1]}`}
                        className="service-description mt-2 min-h-4 truncate text-xs leading-relaxed text-muted"
                        title={service.description}
                      >
                        {service.description}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
