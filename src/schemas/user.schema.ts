import {z} from "zod";
import { addressSchema } from "./address.schema";

export const userSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().nonempty(),
  password: z.string().nonempty(),
  confirmPassword: z.string().nonempty(),
  cpf: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  birthdate: z.string().nonempty().transform((val) => new Date(val)),
  description: z.string().nonempty(),
  isSeller: z.boolean().default(false),
  address: addressSchema,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({email: z.string().nonempty(), password: z.string().nonempty(),});
export type loginData = z.infer<typeof loginSchema>


type userDataSchema = z.infer<typeof userSchema>

export type userData = Omit<userDataSchema, "confirmPassword"> & {
  confirmPassword?: string;
};
