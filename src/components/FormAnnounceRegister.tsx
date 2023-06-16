"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { FormEvent, useState } from "react";

interface FormAnnounceRegisterProps {
  onClose: () => void;
}

export default function FormAnnounceRegister(props: FormAnnounceRegisterProps) {

  const [imageFields, setImageFields] = useState(["image1"]);

  const addImageField = () => {
    if (imageFields.length < 5) {
      const newField = `image${imageFields.length + 1}`;
      setImageFields([...imageFields, newField]);
    }
  };

  const handleCreateAnnouncement = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
    const imagesArray: string[] = [];
    const formData: { [key: string]: string | string[] } = {};
    inputs.forEach((input) => {
      const { name, value, } = input;
      if (name.startsWith("image")) {
        imagesArray.push(value);
      } else {
        formData[name] = value;
      }
    });
    formData["images"] = imagesArray;
    console.log(JSON.stringify(formData));
  };

  return (
    <form onSubmit={handleCreateAnnouncement}>

      <legend className="mb-6 text-sm font-medium text-black font-inter">Infomações do veículo</legend>
      <fieldset className="space-y-6">
        <Input type="text" name="brand" label="Marca" placeholder="Digitar Marca" />
        <Input type="text" name="model" label="Modelo" placeholder="Digitar Modelo" />
      </fieldset>

      <div className="space-y-6 mt-7">
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="year">Ano</label>
            <input type="text" name="year" id="year" placeholder="Digitar Ano" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="fuel">Combustível</label>
            <input type="text" name="fuel" id="fuel" placeholder="Digitar Combustível" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

        </div>
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="mileage">Quilometragem</label>
            <input type="text" name="mileage" id="mileage" placeholder="Digitar Quilometragem" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="color">Cor</label>
            <input type="text" name="color" id="color" placeholder="Cor" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

        </div>
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="priceFIPE">Preço tabela FIPE</label>
            <input type="text" name="priceFIPE" id="priceFIPE" placeholder="Digitar Preço FIPE" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="price">Preço</label>
            <input type="text" name="price" id="price" placeholder="Preço" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1"/>
          </fieldset>

        </div>
      </div>
      <legend className="mb-6 text-sm font-medium text-black font-inter mt-7">Descrição</legend>
      <div className="space-y-6">

        <fieldset className="flex gap-3">
          <textarea name="description" className="h-[80px] resize-none px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" placeholder="Digitar descrição" />
        </fieldset>

        <Input type="text" name="coverImage" label="Imagem da capa" placeholder="URL da imagem" />

        {imageFields.map((field, index) => (
          <Input
            key={field}
            type="text"
            name={field}
            label={`${index + 1}ª Imagem da galeria`}
            placeholder="URL da imagem"
          />
        ))}

        <Button onClick={addImageField} disabled={imageFields.length >= 4} type="button" style="brand-4" details="text-grey-whiteFixed w-full px-0.5" size="medium">Adicionar campo para imagem da galeria</Button>

      </div>

      <fieldset className="flex mt-7 justify-end space-x-2">
        <Button onClick={props.onClose} type="button" style="grey-2" details="" size="medium">Cancelar</Button>
        <Button type="submit" style="brand-3" details="text-grey-whiteFixed" size="medium">Criar anúncio</Button>
      </fieldset>

    </form>
  );
}
