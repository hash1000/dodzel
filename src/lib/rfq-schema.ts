import { z } from "zod";
import { sectors, serviceGroups } from "./nav";
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
const services = serviceGroups.flatMap((group) => group.services);
export const rfqSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(120),
  company: z.string().trim().min(2, "Enter your company name.").max(200),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number.")
    .max(40)
    .regex(/^[+()\d\s.-]+$/, "Enter a valid phone number."),
  sector: z
    .string()
    .refine((value) => sectors.includes(value), "Choose a sector."),
  service: z
    .string()
    .refine((value) => services.includes(value), "Choose a service."),
  scope: z
    .string()
    .trim()
    .min(20, "Describe your scope in at least 20 characters.")
    .max(10000),
  website: z.string().max(0, "Unable to accept this request."),
  file: z
    .custom<File>(
      (value) => typeof File !== "undefined" && value instanceof File,
      "Choose a valid file.",
    )
    .optional()
    .refine((file) => !file || file.size > 0, "The file is empty.")
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "The file must be 10 MB or smaller.",
    )
    .refine(
      (file) => !file || /\.(pdf|docx|xlsx)$/i.test(file.name),
      "Upload a PDF, DOCX or XLSX file.",
    ),
});
export type RfqValues = z.infer<typeof rfqSchema>;
