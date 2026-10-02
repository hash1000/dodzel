import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { serviceGroups, serviceHref } from "@/lib/nav";
import { getService } from "@/lib/services";
export function generateMetadata() {
  return pageMetadata("Services", "/services");
}
export default function Page() {
  return (
    <main id="main-content">
      <PageHero title="Services" />
      <Container className="py-16">
        {serviceGroups.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="mb-6 text-3xl font-semibold">{group.title}</h2>
            {group.services.map((name) => {
              const service = getService(name);
              return (
                <article
                  key={name}
                  id={serviceHref(name).split("#")[1]}
                  className="border-t border-line py-6"
                >
                  <h3 className="mb-3 text-xl font-semibold">
                    {name} <ReviewBadge {...service} />
                  </h3>
                  <p className="max-w-3xl leading-relaxed text-muted">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </section>
        ))}
      </Container>
    </main>
  );
}
