import { z } from "zod";

export const createUrlSchema = z.object({
  originalUrl: z
    .string()
    .url()
    .refine((value) => /^https?:\/\//i.test(value), {
      message: "URL must start with http:// or https://",
    }),
});

export type CreateUrlDto = z.infer<typeof createUrlSchema>;
export const shortCodeParamSchema = z.object({
  shortCode: z.string().regex(/^[A-Za-z0-9]{6}$/, "Invalid short code"),
});