import { ShieldCheck } from "lucide-react";
import { placeholders } from "@/content/placeholder";
import { Container } from "@/components/ui/Container";
import { TodoBadge } from "@/components/ui/TodoBadge";
import { Button } from "@/components/ui/Button";
export function QhseCertifications() {
  return (
    <section className="bg-navy-light py-section text-on-dark">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-5 text-xs uppercase tracking-widest text-amber">
            05 / Quality, health, safety & environment
          </p>
          <h2 className="mb-6 text-5xl">
            {placeholders.qhse.title} <TodoBadge />
          </h2>
          <p className="mb-8 max-w-md leading-relaxed text-muted-dark">
            {placeholders.qhse.description}
          </p>
          <Button href="/qhse" variant="outline">
            Our QHSE approach
          </Button>
        </div>
        <div>
          <div className="mb-8 border-b border-dark-line pb-8">
            <p className="font-display text-5xl text-amber">
              {placeholders.qhse.hours}
            </p>
            <p className="mt-3 text-sm text-muted-dark">
              {placeholders.qhse.hoursLabel} <TodoBadge />
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {placeholders.certifications.map((cert) => (
              <div key={cert.title} className="border border-dark-line p-4">
                <ShieldCheck
                  size={26}
                  className="mb-5 text-muted-dark"
                  aria-hidden="true"
                />
                <h3 className="text-sm">{cert.title}</h3>
                <p className="mb-3 mt-2 text-xs text-muted-dark">
                  {cert.detail}
                </p>
                <TodoBadge />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
