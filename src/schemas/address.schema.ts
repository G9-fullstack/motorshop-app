import {z} from "zod";

export const addressSchema = z.object({
  zipCode: z.string().nonempty(),
  state: z.string().nonempty(),
  city: z.string().nonempty(),
  street: z.string().nonempty(),
  number: z.string().nonempty(),
  complement: z.string().optional(),
});

export type addressData = z.infer<typeof addressSchema>
