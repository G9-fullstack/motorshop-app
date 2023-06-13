"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";

export default function Register() {
  const [isSeller, setIsSeller] = useState<boolean>(false);

  return (
    <main className="grid w-screen h-full mt-20 bg-grey-8 place-items-center">
      <section className="bg-grey-10 rounded py-11 px-12 w-[25.6875rem] mt-11 mb-24">
        <h2 className="mb-8 text-2xl font-medium text-black font-lexend">Cadastro</h2>
        <form>
          <h4 className="mb-6 text-sm font-medium text-black font-inter">Infomações pessoais</h4>
          <fieldset className="space-y-6">
            <Input type="text" name="name" label="Nome" placeholder="Digitar Nome" />
            <Input type="email" name="email" label="Email" placeholder="Digitar Email" />
            <Input type="email" name="email" label="Email" placeholder="Digitar Email" />
            <Input type="text" name="cpf" label="CPF" placeholder="000.000.000-00" />
            <Input type="tel" name="phone" label="Celular" placeholder="(DDD) 90000-0000" />
            <Input type="date" name="date" label="Data de nascimento" placeholder="00/00/00" />
            <Input type="textarea" name="description" label="Descrição" placeholder="Digitar descrição" />
          </fieldset>
          <h4 className="mb-6 text-sm font-medium text-black font-inter mt-7">Infomações de endereço</h4>
          <fieldset className="space-y-6">
            <Input type="text" name="cep" label="CEP" placeholder="00000.000" />
            <fieldset className="flex gap-3">
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="state">Estado</label>
                <input type="text" id="state" placeholder="Digitar Estado" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
              </fieldset>
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="city">Cidade</label>
                <input type="text" id="city" placeholder="Digitar Cidade" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
              </fieldset>
            </fieldset>
            <Input type="text" name="road" label="Rua" placeholder="Digitar Rua" />
            <fieldset className="flex gap-3">
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="number">Número</label>
                <input type="text" id="number" placeholder="Digitar Número" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
              </fieldset>
              <fieldset className="flex flex-col gap-y-2">
                <label htmlFor="complement">Complemento</label>
                <input type="text" id="complement" placeholder="Ex: apart 307" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
              </fieldset>
            </fieldset>
          </fieldset>
          <h4 className="mb-6 text-sm font-medium text-black font-inter mt-7">Tipo de conta</h4>
          <fieldset className="space-y-6">
            <fieldset className="flex gap-3">
              <span
                onClick={() => setIsSeller(false)}
              >
                <Button type="button" style={isSeller ? "outline-1" : "brand-1"} details={isSeller ? "" : "text-grey-whiteFixed"} size="big" width={152}>Comprador</Button>
              </span>
              <span
                onClick={() => setIsSeller(true)}
              >
                <Button type="button" style={isSeller ? "brand-1" : "outline-1"} details={isSeller ? "text-grey-whiteFixed" : ""} size="big" width={152}>Anuciante</Button>
              </span>
            </fieldset>
            <Input type="password" name="password" label="Senha" placeholder="Digitar senha" />
            <Input type="password" name="confirm-password" label="Confirmar Senha" placeholder="Digitar senha" />
            <Button type="submit" style="brand-1" details="text-grey-whiteFixed w-full" size="big">Finalizar cadastro</Button>
          </fieldset>
        </form>
      </section>
    </main>
  );
}
