"use client";
import Button from "@/components/Button";
import FormAlterPassword from "@/components/FormAlterPassword";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useUser } from "@/contexts/UserContext";
import { useModal } from "@/hooks/useModal";
import { loginData, loginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Login() {
  const { handleUserLogin, isLoading, user, } = useUser();
  const [isOpen, openModal, closeModal] = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  if (user) router.back();

  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-11 mb-24">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">
          Login
        </h2>
        <form className="mt-6" onSubmit={handleSubmit(handleUserLogin)}>
          <fieldset className="space-y-6">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Digitar Email"
              register={register("email")}
              errors={errors.email}
              disabled={isLoading}
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              placeholder="Digitar senha"
              register={register("password")}
              errors={errors.password}
              disabled={isLoading}
            />
            <span
              className="text-grey-2 flex font-medium justify-end cursor-pointer"
              onClick={openModal}
            >
              Esqueci minha senha
            </span>
            <Modal
              isOpen={isOpen}
              onClose={closeModal}
              modalTitle="Recupere sua senha"
            >
              <FormAlterPassword />
            </Modal>

            <Button
              type="submit"
              style="brand-1"
              details="text-grey-whiteFixed w-full flex items-center justify-center"
              size="big"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader size={16} className="mx-auto animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
            <span className="text-grey-2 flex justify-center">
              Ainda não possui conta?
            </span>
            <Button
              type="button"
              style="outline-2"
              details=" w-full"
              size="big"
              onClick={() => router.push("/register")}
            >
              Cadastrar
            </Button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
