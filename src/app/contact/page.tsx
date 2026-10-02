import { pageMetadata } from "@/lib/metadata";
import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { Button } from "@/components/ui/Button";
export function generateMetadata() {
  return pageMetadata("Contact", "/contact");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Contact" />
      <Container className="grid gap-12 py-16 md:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">{real.company.name}</h2>
          <address className="mb-6 max-w-md not-italic leading-relaxed">
            {real.contact.address}
          </address>
          <a
            href={`mailto:${real.contact.email}`}
            className="text-lg underline underline-offset-4"
          >
            {real.contact.email}
          </a>
          <div className="mt-4">
            <ReviewBadge {...real.contact} />
          </div>
          <p className="mt-6 text-muted">
            {placeholders.contact.phone} <ReviewBadge todo />
          </p>
        </div>
        <div>
          <Button href="/request-a-quote">Request a Quote</Button>
        </div>
      </Container>
    </main>
  );
}
