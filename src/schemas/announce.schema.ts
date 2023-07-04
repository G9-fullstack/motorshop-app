import { z } from "zod";
import { updateUserSchema } from "./user.schema";

const imageSchema = z.string().optional();

const commentsSchema = z.object({
  comment: z.string(),
  createdAt: z.string(),
  user: z.object({
    name: z.string(),
    id: z.number(),
  }),
});

export const announceSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.string(),
  mileage: z.string(),
  // fuel: z.enum(["", "Flex", "Híbrido", "Elétrico"]),
  fuel: z.string(),
  color: z.string(),
  price: z.coerce.string(),
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
  seller: updateUserSchema.extend({ id: z.number(), isSeller: z.boolean(), }),
  comments: z.array(commentsSchema),
});

export const updateAnnounceSchema = announceSchema.partial().extend({
  isActive: z.boolean().default(true),
});

export const announceCommentSchema = z.object({
  comment: z.string(),
});

export type commentData = z.infer<typeof commentsSchema>
export type announceComment = z.infer<typeof announceCommentSchema>
export type announceResponse = z.infer<typeof announce>
export type announceData = z.infer<typeof announceSchema>
export type updateAnnounceData = z.infer<typeof updateAnnounceSchema>
