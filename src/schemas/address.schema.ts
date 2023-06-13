import {z} from "zod";

export const addressSchema = z.object({
  zipCode: z.string(),
  state: z.string(),
  city: z.string(),
  street: z.string(),
  number: z.string(),
  complement: z.string(),
});

export type addressData = z.infer<typeof addressSchema>
