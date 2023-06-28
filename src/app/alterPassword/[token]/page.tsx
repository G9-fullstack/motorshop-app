"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { newPassword, newPasswordSchema } from "@/schemas/user.schema";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const { register, handleSubmit, } = useForm<newPassword>({
    resolver: zodResolver(newPasswordSchema),
  });
  const router = useRouter();
  function submitForm(formData: newPassword) {
    const url = window.location.href;
    const token = url.substring(url.lastIndexOf("/") + 1);
    api
      .patch(`users/resetPassword/${token}`, formData)
      .then(() => {
        toast("Sua senha foi alterada");
        router.push("/login");
      })

      .catch((err) => {
        throw err;
      });
  }

  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-20 mb-36">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">
          Altere sua senha
        </h2>
        <form className="mt-8" onSubmit={handleSubmit(submitForm)}>
          <fieldset className="space-y-6">
            <Input
              type="password"
              name="password"
              label="Nova senha"
              placeholder="Digitar senha"
              register={register("password")}
            />
            <Input
              type="password"
              name="confirm-password"
              label="Confirmar senha"
              placeholder="Digitar senha"
              register={register("confirmPassword")}
            />
            <Button
              type="submit"
              style="brand-1"
              details="text-grey-whiteFixed w-full"
              size="big"
            >
              Confirmar alterção
            </Button>
          </fieldset>
        </form>
      </section>
      <Toaster position="top-center" expand={true} />
    </main>
  );
}
