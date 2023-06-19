import { z } from "zod";

const imageSchema = z.string().url();

export const announceSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.string(),
  fuel: z.string(),
  color: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  coverImage: z.string().url(),
  images: z.array(imageSchema),
});

const announce = announceSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sellerId: z.number(),
  isActive: z.boolean(),
  images: z.array(z.object({ imageUrl: z.string(), })),
});

export type announceResponse = z.infer<typeof announce>
export type announceData = z.infer<typeof announceSchema>
