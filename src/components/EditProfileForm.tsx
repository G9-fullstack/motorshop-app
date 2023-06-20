import Button from "./Button";
import Input from "./Input";

export default function EditProfileForm() {
  return (
    <form>
      <fieldset className="space-y-5">
        <legend>Informações pessoais</legend>

        <Input label="Nome" type="text" name="editName"/>
        <Input label="Email" type="email" name="editEmail"/>
        <Input label="CPF" type="text" name="editCPF"/>
        <Input label="Celular" type="number" name="editPhoneNumber"/>
        <Input label="Data de nascimento" type="date" name="editBirthdate"/>
        <Input label="Descrição" type="textarea" name="editDescription"/>

        <div className="flex gap-1">
          <Button type="button" size="medium" width={154} style="grey-2">Cancelar</Button>
          <Button type="button" size="medium" width={154} style="alert">Excluir Perfil</Button>
          <Button type="submit" size="medium" width={162} style="brand-3">Salvar Alterações</Button>
        </div>
      </fieldset>
    </form>
  );
}
