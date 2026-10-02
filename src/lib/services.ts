import { real } from "@/content/real";
import { placeholders } from "@/content/placeholder";
export function getService(name: string) {
  const known = real.services.find((service) => service.name === name);
  if (known) return { ...known, todo: false };
  const pending = placeholders.unconfirmedServices.find(
    (service) => service.name === name,
  );
  if (!pending) throw new Error(`Missing service content: ${name}`);
  return pending;
}
