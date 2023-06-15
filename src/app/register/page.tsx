"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { userData, userSchema } from "@/schemas/user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Register() {
  const { register, setValue, handleSubmit, } = useForm<userData>({
    resolver: zodResolver(userSchema),
  });

  function handleRegister(data: userData) {
    console.log(isSeller);
    console.log(data);
  }

  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-11 mb-24">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">Cadastro</h2>
        <form
          onSubmit={handleSubmit(handleRegister)}
        >
          <legend className="mb-6 text-sm font-medium text-black font-inter">Infomações pessoais</legend>
          <fieldset className="space-y-6">
            <Input type="text" name="name" label="Nome" placeholder="Digitar Nome" register={register("name")} />
            <Input type="email" name="email" label="Email" placeholder="Digitar Email" register={register("email")} />
            <Input type="text" name="cpf" label="CPF" placeholder="000.000.000-00" register={register("cpf")} />
            <Input type="tel" name="phone" label="Celular" placeholder="(DDD) 90000-0000" register={register("phoneNumber")} />
            <Input type="date" name="date" label="Data de nascimento" placeholder="00/00/00" register={register("birthdate")} />
            <Input type="textarea" name="description" label="Descrição" placeholder="Digitar descrição" register={register("description")} />
          </fieldset>
          <legend className="mb-6 text-sm font-medium text-black font-inter mt-7">Infomações de endereço</legend>
          <fieldset className="space-y-6">
            <Input type="text" name="cep" label="CEP" placeholder="00000.000" register={register("address.zipCode")} />
            <fieldset className="flex gap-3">
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="state">Estado</label>
                <input type="text" id="state" placeholder="Digitar Estado" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("address.state")}/>
              </fieldset>
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="city">Cidade</label>
                <input type="text" id="city" placeholder="Digitar Cidade" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("address.city")}/>
              </fieldset>
            </fieldset>
            <Input type="text" name="street" label="Rua" placeholder="Digitar Rua" register={register("address.street")} />
            <fieldset className="flex gap-3">
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="number">Número</label>
                <input type="text" id="number" placeholder="Digitar Número" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("address.number")}/>
              </fieldset>
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="complement">Complemento</label>
                <input type="text" id="complement" placeholder="Ex: apart 307" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("address.complement")}/>
              </fieldset>
            </fieldset>
          </fieldset>
          <legend className="mb-6 text-sm font-medium text-black font-inter mt-7">Tipo de conta</legend>
          <fieldset className="space-y-6">
            <fieldset className="flex gap-3">
              <span
                onClick={() => setValue("isSeller", false)}
              >
                <Button type="button" style={isSeller ? "outline-1" : "brand-1"} details={isSeller ? "" : "text-grey-whiteFixed"} size="big" width={152}>Comprador</Button>
              </span>
              <span
                onClick={() => setValue("isSeller", true)}
              >
                <Button type="button" style={isSeller ? "brand-1" : "outline-1"} details={isSeller ? "text-grey-whiteFixed" : ""} size="big" width={152}>Anuciante</Button>
              </span>
            </fieldset>
            <Input type="password" name="password" label="Senha" placeholder="Digitar senha" register={register("password")} />
            <Input type="password" name="confirm-password" label="Confirmar Senha" placeholder="Digitar senha" register={register("confirmPassword")} />
            <Button type="submit" style="brand-1" details="text-grey-whiteFixed w-full" size="big">Finalizar cadastro</Button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
