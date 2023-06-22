import { z } from "zod";
import { addressSchema } from "./address.schema";



export const userSchema = z.object({
  name: z.string().nonempty("Não pode ser vazio!"),
  email: z.string().email("Deve ser um email!").nonempty("Não pode ser vazio!"),
  password: z.string().nonempty("Não pode ser vazio!"),
  confirmPassword: z.string().nonempty("Não pode ser vazio!"),
  cpf: z.string().length(14, "CPF inválido").nonempty("Não pode ser vazio!"),
  phoneNumber: z.string().length(15, "Telefone inválido").nonempty("Não pode ser vazio!"),
  birthdate: z.string().nonempty("Não pode ser vazio!"),
  description: z.string().nonempty("Não pode ser vazio!"),
  isSeller: z.boolean().default(false),
  address: addressSchema,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não correspondem",
    path: ["confirmPassword"],
  });

export const updateUserSchema = z.object({
  name: z.string(),
  email: z.string().email("Deve ser um email!"),
  cpf: z.string().length(14, "CPF inválido"),
  phoneNumber: z.string().length(15, "Telefone inválido"),
  birthdate: z.string(),
  description: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email("Deve ser um email!").nonempty("Não pode ser vazio!"),
  password: z.string().nonempty("Não pode ser vazio!"),
});
export const newPasswordSchema = z.object({
  password: z.string().nonempty("Não pode ser vazio!"),
  confirmPassword: z.string().nonempty("Não pode ser vazio!"),
}) .refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});
export const alterPasswordSchema = loginSchema.omit({password: true,});



export type loginData = z.infer<typeof loginSchema>
export type alterPassword = z.infer<typeof alterPasswordSchema>
export type newPassword = z.infer<typeof newPasswordSchema>

export type userDataSchema = z.infer<typeof userSchema>

export type userData = Omit<userDataSchema, "confirmPassword"> & {
  confirmPassword?: string;
};

export type updateUserData = z.infer<typeof updateUserSchema>

export type userProfileData = Pick<userDataSchema, "name" | "email" | "description" | "isSeller"> & { id: string }
