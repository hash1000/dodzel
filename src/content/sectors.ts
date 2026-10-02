import { media } from "./media";
import { sectorData, sectorDetailHref, serviceHref } from "@/lib/nav";
import type { ShowcaseChip, ShowcaseItem } from "@/components/sections/TabbedShowcase";
export const sectorDescription = "Sector description to be approved.";
export const coreServiceChips: ShowcaseChip[] = ["Civil & Buildings", "Mechanical & Piping", "Electrical & Instrumentation"].map(label => ({ label, href: serviceHref(label), confirm: true }));
export const sectorShowcaseItems: ShowcaseItem[] = sectorData.map(sector => ({
  id: sector.id,
  title: sector.name,
  image: media[sector.name],
  description: sectorDescription,
  chips: [...coreServiceChips, ...(sector.id === "oil-gas" ? [{label: "Upstream", todo: true, confirm: true, reviewOnly: true}, {label: "Midstream", todo: true, confirm: true, reviewOnly: true}] : [])],
  href: sectorDetailHref(sector.name),
  todo: true,
  confirm: sector.confirm,
}));
