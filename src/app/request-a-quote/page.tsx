import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { RfqForm } from "@/components/forms/RfqForm";
export const metadata: Metadata = { title: "Request a Quote" };
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
