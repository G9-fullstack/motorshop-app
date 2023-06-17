import { z } from "zod";

// const imageSchema = z.string().url();

export const announceSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.string(),
  fuel: z.coerce.number(),
  color: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  coverImage: z.string().url(),
  // images: z.array(imageSchema),
});

export type announceData = z.infer<typeof announceSchema>
