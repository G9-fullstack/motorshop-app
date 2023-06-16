"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useUser } from "@/contexts/UserContext";
import { loginData, loginSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, handleSubmit, formState: { errors, }, } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });

  const { handleUserLogin, isLoading,} = useUser();

  function handleLogin(data: loginData) {
    handleUserLogin(data);
  }

  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-11 mb-24">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">
          Login
        </h2>
        <form className="mt-6" onSubmit={handleSubmit(handleLogin)}>
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
            <span className="text-grey-2 flex font-medium justify-end">
              Esqueci minha senha
            </span>

            <Button
              type="submit"
              style="brand-1"
              details="text-grey-whiteFixed w-full flex items-center justify-center"
              size="big"
              disabled={isLoading}
            >
              {isLoading ? <Loader size={16} className="mx-auto animate-spin" /> : "Entrar"}
            </Button>
            <span className="text-grey-2 flex justify-center">
              Ainda não possui conta?
            </span>
            <Button
              type="submit"
              style="outline-2"
              details=" w-full"
              size="big"
            >
              Cadastrar
            </Button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
