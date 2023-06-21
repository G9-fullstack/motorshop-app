import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";
import { addressData, addressSchema } from "@/schemas/address.schema";

interface iEditAddressFormProps {
	closeModal: () => void;
}

export default function EditAddressForm({ closeModal, }: iEditAddressFormProps) {
  const { handleEditAddress, handleRetrieveUserAddress, } = useUser();
  const { register, handleSubmit, setValue, } = useForm<addressData>({
    mode: "onSubmit",
    resolver: zodResolver(addressSchema),
  });

  function submitEditForm(data: addressData) {
    handleEditAddress(data);
    closeModal();
  }

  useEffect(() => {
    async function handleRetrieve() {
      const { zipCode, state, city, street, number, complement, } = await handleRetrieveUserAddress();

      setValue("zipCode", zipCode);
      setValue("state", state);
      setValue("city", city);
      setValue("street", street);
      setValue("number", number);
      setValue("complement", complement);
    }
    handleRetrieve();
  }, []);

  return (
    <form onSubmit={handleSubmit(submitEditForm)}>
      <fieldset className="space-y-5">
        <legend>Informações pessoais</legend>

        <Input label="CEP" type="text" name="editZipCode" register={register("zipCode")}/>

        <div className="flex gap-3">
          <fieldset className="flex flex-col gap-y-2">
            <label htmlFor="editState">Estado</label>
            <input type="text" id="editState" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("state")}/>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2">
            <label htmlFor="editCity">Cidade</label>
            <input type="text" id="editCity" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("city")}/>
          </fieldset>
        </div>

        <Input label="Rua" type="text" name="editStreet" register={register("street")}/>

        <div className="flex gap-3">
          <fieldset className="flex flex-col gap-y-2">
            <label htmlFor="number">Número</label>
            <input type="text" id="number" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("number")}/>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2">
            <label htmlFor="editComplement">Complemento</label>
            <input type="text" id="editComplement" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("complement")}/>
          </fieldset>
        </div>

        <div className="flex justify-end gap-3">
          <Button onClick={closeModal} type="button" size="big" style="grey-2">Cancelar</Button>
          <Button type="submit" size="big" style="brand-3">Salvar Alterações</Button>
        </div>
      </fieldset>
    </form>
  );
}
