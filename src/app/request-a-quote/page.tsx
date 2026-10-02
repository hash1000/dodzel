import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { RfqForm } from "@/components/forms/RfqForm";
export function generateMetadata() {
  return pageMetadata("Request a Quote", "/request-a-quote");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Request a Quote" />
      <Container className="py-16">
        <RfqForm />
      </Container>
    </main>
  );
}
