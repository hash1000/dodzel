import { serviceGroups } from "@/lib/nav";
import { getService } from "@/lib/services";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { ServiceGroup } from "./ServiceGroup";
export function ServicesGroups() {
  return (
    <section className="bg-surface py-section">
      <Container>
        <SectionHeading {...placeholders.headings.services}>
          <Button href="/services" variant="outline">
            All services
          </Button>
        </SectionHeading>
        <p className="mb-10 text-muted">
          {placeholders.services.description} <TodoBadge />
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {serviceGroups.map((group, index) => (
            <ServiceGroup
              key={group.title}
              title={group.title}
              index={index}
              services={group.services.map(getService)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
