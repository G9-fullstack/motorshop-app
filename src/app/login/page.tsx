import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Login() {
  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-11 mb-24">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">
          Login
        </h2>
        <form className="mt-6">
          <fieldset className="space-y-6">
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Digitar Email"
            />
            <Input
              type="password"
              name="password"
              label="Senha"
              placeholder="Digitar senha"
            />
            <span className="text-grey-2 flex font-medium justify-end">
              Esqueci minha senha
            </span>

            <Button
              type="submit"
              style="brand-1"
              details="text-grey-whiteFixed w-full"
              size="big"
            >
              Entrar
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
