import { z } from "zod";
import { updateUserSchema, userWithIdData } from "./user.schema";

const imageSchema = z.string().optional();

export const announceSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.string(),
  fuel: z.enum(["Flex", "Híbrido", "Elétrico"]),
  color: z.string(),
  price: z.coerce.number(),
  description: z.string(),
  coverImage: z.string().optional(),
  images: z.array(imageSchema),
});

const announce = announceSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sellerId: z.number(),
  isActive: z.boolean(),
  images: z.array(z.object({ imageUrl: z.string(), })),
  seller: updateUserSchema.extend({ id: z.number(), }),
});

export type announceResponse = z.infer<typeof announce>
export type announceData = z.infer<typeof announceSchema>
