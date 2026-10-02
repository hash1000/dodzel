import { real } from "@/content/real";
import { sectorShowcaseItems } from "@/content/sectors";
import { ReviewBadge } from "@/components/ui/ReviewBadge";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/ui/PageHero";
import { TabbedShowcase } from "@/components/sections/TabbedShowcase";
export function generateMetadata() { return pageMetadata("Sectors", "/sectors"); }
export default function Page() {
  return <main id="main-content">
    <PageHero title="Sectors" variant="plate" />
    <TabbedShowcase eyebrow="Industries we serve" title="Our sectors" intro={<>{real.industries.description} <ReviewBadge {...real.industries} /></>} items={sectorShowcaseItems} />
  </main>;
}
