"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from "react";
import { announceData, announceSchema } from "../schemas/announce.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/contexts/UserContext";

interface FormAnnounceRegisterProps {
  onClose: () => void;
}

export default function FormAnnounceRegister(props: FormAnnounceRegisterProps) {

  const { register, handleSubmit, formState:{errors,}, } = useForm<announceData>({
    resolver: zodResolver(announceSchema),
  });

  const {handleCreateAnnounce,} = useUser();

  const [imageFields, setImageFields] = useState(["image1"]);

  const addImageField = () => {
    if (imageFields.length < 5) {
      const newField = `image${imageFields.length + 1}`;
      setImageFields([...imageFields, newField]);
    }
  };

  const handleCreateAnnouncement = async (data: announceData) => {
    console.log(data);
    handleCreateAnnounce(data);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateAnnouncement)}>

      <legend className="mb-6 text-sm font-medium text-black font-inter">Infomações do veículo</legend>
      <fieldset className="space-y-6">
        <Input type="text" name="brand" label="Marca" placeholder="Digitar Marca" register={register("brand")} />
        <Input type="text" name="model" label="Modelo" placeholder="Digitar Modelo" register={register("model")} />
      </fieldset>

      <div className="space-y-6 mt-7">
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="year">Ano</label>
            <input type="text" id="year" placeholder="Digitar Ano" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("year")} />
            {errors.year && <span>{errors.year.message}</span>}
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="fuel">Combustível</label>
            <input type="text" id="fuel" placeholder="Digitar Combustível" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("fuel")} />
            {errors.fuel && <span>{errors.fuel.message}</span>}
          </fieldset>

        </div>
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="mileage">Quilometragem</label>
            <input type="text" id="mileage" placeholder="Digitar Quilometragem" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("mileage")} />
            {errors.mileage && <span>{errors.mileage.message}</span>}
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="color">Cor</label>
            <input type="text" id="color" placeholder="Cor" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("color")} />
            {errors.color && <span>{errors.color.message}</span>}
          </fieldset>

        </div>
        <div className="flex gap-3">

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="priceFIPE">Preço tabela FIPE</label>
            <input type="text" name="priceFIPE" id="priceFIPE" placeholder="Digitar Preço FIPE" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" />
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="price">Preço</label>
            <input type="text" id="price" placeholder="Preço" className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" {...register("price")} />
            {errors.price && <span>{errors.price.message}</span>}
          </fieldset>

        </div>
      </div>
      <legend className="mb-6 text-sm font-medium text-black font-inter mt-7">Descrição</legend>
      <div className="space-y-6">

        <fieldset className="flex gap-3">
          <textarea className="h-[80px] resize-none px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1" placeholder="Digitar descrição" {...register("description")} />
          {errors.description && <span>{errors.description.message}</span>}
        </fieldset>
        <Input type="text" name={"coverImage"} label="Imagem da capa" placeholder="URL da imagem" register={register("coverImage")} />
        {errors.coverImage && <span>{errors.coverImage.message}</span>}

        {imageFields.map((field, index) => (
          <div key={field}>
            <Input
              type="text"
              name={`images[${index}]`}
              label={`${index + 1}ª Imagem da galeria`}
              placeholder="URL da imagem"
              register={register(`images.${index}`, { required: true, })}
            />
            {errors.images && errors.images[index] && (
              <span>{errors.images[index]?.message}</span>
            )}
          </div>
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
