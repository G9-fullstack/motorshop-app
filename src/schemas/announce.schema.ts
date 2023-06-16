import { z } from "zod";

const imageSchema = z.string().url();

export const announceSchema = z.object({
  id: z.number(),
  isActive: z.boolean(),
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.string(),
  fuel: z.number(),
  color: z.string(),
  price: z.number(),
  description: z.string(),
  coverImage: z.string(),
  images: z.array(imageSchema),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type announceData = z.infer<typeof announceSchema>
