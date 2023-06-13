import {z} from "zod";

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
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type announceData = z.infer<typeof announceSchema>
