import {z} from "zod"
import { addressSchema } from "./address.schema"

export const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    phoneNumber: z.string(),
    birthdate: z.date(),
    description: z.string(),
    isSeller: z.boolean(),
    address: addressSchema,
})

export type userData = z.infer<typeof userSchema>