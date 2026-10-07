import { z } from "zod";
export const enquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.email().max(200),
    phone: z.string().trim().max(40).optional().default(""),
    organisation: z.string().trim().max(150).optional().default(""),
    interest: z.string().trim().min(2).max(120),
    location: z.string().trim().max(200).optional().default(""),
    budget: z.string().max(100).optional().default(""),
    message: z.string().trim().min(10).max(4000),
    consent: z.literal(true),
    website: z.string().max(0).optional().default(""),
    consultationType: z.enum(["online", "office", "site"]).optional(),
    slotId: z.string().max(150).optional(),
    requestId: z.uuid(),
  })
  .strict();
export const slotSchema = z.object({
  id: z.string().min(1).max(150),
  type: z.enum(["online", "office", "site"]),
  startsAt: z.iso.datetime({ offset: true }),
  durationMinutes: z.number().int().positive().max(480),
  feeNgn: z.number().nonnegative().nullable(),
});
export const availabilitySchema = z.object({
  slots: z.array(slotSchema).max(2000),
});
export type Slot = z.infer<typeof slotSchema>;
export type Enquiry = z.infer<typeof enquirySchema>;
export function allowedOrigin(origin: string | null, requestOrigin: string) {
  if (!origin) return true; // Non-browser integrations may omit Origin; validate payload regardless.
  return origin === requestOrigin;
}
