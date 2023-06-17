import { z } from "zod";
import { addressSchema } from "./address.schema";



export const userSchema = z.object({
  name: z.string().nonempty("Não pode ser vazio!"),
  email: z.string().email("Deve ser um email!").nonempty("Não pode ser vazio!"),
  password: z.string().nonempty("Não pode ser vazio!"),
  confirmPassword: z.string().nonempty("Não pode ser vazio!"),
  cpf: z.string().length(11, "CPF inválido").nonempty("Não pode ser vazio!"),
  phoneNumber: z.string().length(11, "Telefone inválido").nonempty("Não pode ser vazio!"),
  birthdate: z.string().nonempty("Não pode ser vazio!"),
  description: z.string().nonempty("Não pode ser vazio!"),
  isSeller: z.boolean().default(false),
  address: addressSchema,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Deve ser um email!").nonempty("Não pode ser vazio!"),
  password: z.string().nonempty("Não pode ser vazio!"),
});
export type loginData = z.infer<typeof loginSchema>


export type userDataSchema = z.infer<typeof userSchema>

export type userData = Omit<userDataSchema, "confirmPassword"> & {
  confirmPassword?: string;
};

export type userProfileData = Pick<userDataSchema, "name" | "email" | "description" | "isSeller"> & { id: string }
