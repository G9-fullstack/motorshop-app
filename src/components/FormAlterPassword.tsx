"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { alterPassword } from "@/schemas/user.schema";
import api from "@/services/api";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";

export default function FormAlterPassword() {
  const { register, handleSubmit, } = useForm<alterPassword>({});

  function submitForm(formData: alterPassword) {
    api
      .post("/users/alter-password", formData)
      .then(({ data, }) => {
        toast.success("email enviado");
        return data;
      })

      .catch((err) => {
        toast.error("Nao foi possivel enviar o email.");
        throw err;
      });
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <h4 className="mt-4 mb-7 font-lexend font-medium text-base text-grey-1">
        Insira seu email para recuperar a sua conta.
      </h4>
      <Input
        type="email"
        name="mail"
        label="Seu email"
        placeholder="Insira seu email"
        register={register("email")}
      />
      <Button
        type="submit"
        style="brand-1"
        details="text-grey-whiteFixed mt-6 mt ml-[77%]"
        size="big"
      >
        Enviar
      </Button>
      <Toaster position="top-center" expand={true} />
    </form>
  );
}
