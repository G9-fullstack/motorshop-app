"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { alterPassword } from "@/schemas/user.schema";
import api from "@/services/api";
import router from "next/router";
import { useForm } from "react-hook-form";

export default function FormAlterPassword() {
  const { register, handleSubmit } = useForm<alterPassword>({});

  function submitForm(formData: alterPassword) {
    alert("enviou");
    api
      .post("/users/alter-password", formData)
      .then(({ data }) => {
        router.push("/");

        return data.token;
      })

      .catch((err) => {
        throw err;
      })
      .finally(() => {
        console.log("ola");
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
    </form>
  );
}
