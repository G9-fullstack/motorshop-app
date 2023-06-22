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

  const { register, handleSubmit, setValue, } = useForm<updateUserData>({
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
        setValue("cpf", cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")); // Transforma para o formato 000.000.000-00
        setValue("phoneNumber", phoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")); //Transforma para o formato (00) 00000-0000
        setValue("birthdate", birthdate.replace(/[^0-9]/g, "-").replace(/^(\d{2})-(\d{2})-(\d{4})$/, "$3-$2-$1")); // Transforma para o formato YYYY-MM-DD
        setValue("description", description);
      }
    }
    handleRetrieve();
  }, []);

  return (
    <form onSubmit={handleSubmit(submitEditForm)}>
      <fieldset className="space-y-5">
        <legend>Informações pessoais</legend>

        <Input label="Nome" type="text" name="editName" placeholder="Digite seu nome" register={register("name")}/>
        <Input label="Email" type="email" name="editEmail" placeholder="Digite seu email" register={register("email")}/>
        <Input label="CPF" type="text" name="editCPF" placeholder="000.000.000-00" register={register("cpf")}/>
        <Input label="Celular" type="text" name="editPhoneNumber" placeholder="(DDD) 90000-0000" register={register("phoneNumber")}/>
        <Input label="Data de nascimento" type="date" name="editBirthdate" register={register("birthdate")}/>
        <Input label="Descrição" type="textarea" name="editDescription" placeholder="Digite sua descrição" register={register("description")}/>

        <div className="flex gap-1">
          <Button onClick={closeModal} type="button" size="medium" width={154} style="grey-2">Cancelar</Button>
          <Button onClick={deleteUser} type="button" size="medium" width={154} style="alert">Excluir Perfil</Button>
          <Button type="submit" size="medium" width={162} style="brand-3">Salvar Alterações</Button>
        </div>
      </fieldset>
    </form>
  );
}
