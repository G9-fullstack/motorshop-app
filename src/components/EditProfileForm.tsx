import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { updateUserData, updateUserSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";
import { useEffect } from "react";

interface iEditProfileFormProps {
	onClose: () => void;
}

export default function EditProfileForm({ onClose, }: iEditProfileFormProps) {
  const { handleRetrieveUser, handleEditUser, user, } = useUser();

  const { register, handleSubmit, setValue, } = useForm<updateUserData>({
    mode: "onSubmit",
    resolver: zodResolver(updateUserSchema),
  });

  function submitEditForm(data: updateUserData) {
    if (user) {
      handleEditUser(user.id, data);
    }
    onClose();
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
        <Input label="CPF" type="text" name="editCPF" register={register("cpf")}/>
        <Input label="Celular" type="number" name="editPhoneNumber" register={register("phoneNumber")}/>
        <Input label="Data de nascimento" type="date" name="editBirthdate" register={register("birthdate")}/>
        <Input label="Descrição" type="textarea" name="editDescription" register={register("description")}/>

        <div className="flex gap-1">
          <Button onClick={onClose} type="button" size="medium" width={154} style="grey-2">Cancelar</Button>
          <Button type="button" size="medium" width={154} style="alert">Excluir Perfil</Button>
          <Button type="submit" size="medium" width={162} style="brand-3">Salvar Alterações</Button>
        </div>
      </fieldset>
    </form>
  );
}
