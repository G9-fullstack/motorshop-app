import { z } from "zod";

export const addressSchema = z.object({
  zipCode: z.string().length(8, "CEP inválido!").nonempty("Não pode ser vazio!"),
  state: z.string().length(2, "Deve inserir a abreviação!").nonempty("Não pode ser vazio!"),
  city: z.string().nonempty("Não pode ser vazio!"),
  street: z.string().nonempty("Não pode ser vazio!"),
  number: z.string().nonempty("Não pode ser vazio!"),
  complement: z.string().optional(),
});

export type addressData = z.infer<typeof addressSchema>
