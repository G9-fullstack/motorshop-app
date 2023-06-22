import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { updateUserData, updateUserSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

interface iEditProfileFormProps {
	closeModal: () => void;
}

export default function EditProfileForm({ closeModal, }: iEditProfileFormProps) {
  const { handleRetrieveUser, handleEditUser, handleDeleteUser, user, } = useUser();

  const { register, handleSubmit, setValue, control, } = useForm<updateUserData>({
    mode: "onSubmit",
    resolver: zodResolver(updateUserSchema),
  });

  function submitEditForm(data: updateUserData) {
    if (user) {
      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/[^0-9]/g, ""),
        phoneNumber: data.phoneNumber.replace(/[^0-9]/g, ""),
      };
      handleEditUser(user.id, formattedData);
    }
    closeModal();
  }

  function deleteUser() {
    if (user) {
      handleDeleteUser(user.id);
    }

    closeModal();
  }

  useEffect(() => {
    async function handleRetrieve() {
      if (user) {
        const { name, email, cpf, phoneNumber, birthdate, description, } = await handleRetrieveUser(user.id);

        setValue("name", name);
        setValue("email", email);
        setValue("cpf", cpf);
        setValue("phoneNumber", phoneNumber);
        setValue("birthdate", birthdate);
        setValue("description", description);
      }
    }
    handleRetrieve();
  }, []);

  return (
    <form onSubmit={handleSubmit(submitEditForm)}>
      <fieldset className="space-y-5">
        <legend>Informações pessoais</legend>

        <Input label="Nome" type="text" name="editName" register={register("name")}/>
        <Input label="Email" type="email" name="editEmail" register={register("email")}/>
        <Input label="CPF" type="cpf" name="cpf" control={control}/>
        <Input label="Celular" type="tel" name="phoneNumber" control={control}/>
        <Input label="Data de nascimento" type="date" name="editBirthdate" register={register("birthdate")}/>
        <Input label="Descrição" type="textarea" name="editDescription" register={register("description")}/>

        <div className="grid grid-cols-3 space-x-1 w-full max-[470px]:flex flex-wrap justify-center max-[470px]:gap-2">
          <Button onClick={closeModal} type="button" size="medium" style="grey-2">Cancelar</Button>
          <Button onClick={deleteUser} type="button" size="medium" style="alert">Excluir Perfil</Button>
          <Button type="submit" size="medium" style="brand-3">Salvar Alterações</Button>
        </div>
      </fieldset>
    </form>
  );
}
