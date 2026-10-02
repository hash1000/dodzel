"use server";
import { rfqSchema } from "@/lib/rfq-schema";
export async function submitRfq(formData: FormData) {
  const file = formData.get("file");
  const result = rfqSchema.safeParse({
    ...Object.fromEntries(formData),
    file: file instanceof File && file.name !== "" ? file : undefined,
  });
  if (!result.success)
    return { ok: false as const, errors: result.error.flatten().fieldErrors };
  // TODO: connect Resend/SMTP and approved storage/attachment handling. No delivery yet.
  // Log only a validation event; do not expose personal details or file contents.
  console.info("[RFQ TODO] Preview validation succeeded", {
    sector: result.data.sector,
    service: result.data.service,
    hasAttachment: !!result.data.file,
  });
  return { ok: true as const };
}
