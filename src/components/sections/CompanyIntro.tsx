import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { Button } from "@/components/ui/Button";
import { real } from "@/content/real";
export function CompanyIntro() {
  return (
    <section className="bg-paper py-section">
      <Container className="grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="eyebrow mb-5 text-xs font-semibold uppercase tracking-widest">
            Engineering. Construction. Commitment.
          </p>
          <h2 className="text-heading font-semibold">
            We help you build your infrastructure reliably.
          </h2>
        </div>
        <div>
          <p className="mb-6 text-body leading-relaxed text-muted">
            {real.company.description} <ReviewBadge {...real.company} />
          </p>
          <Button href="/about" variant="outline">
            Get to know Dodzel
          </Button>
        </div>
      </Container>
    </section>
  );
}
