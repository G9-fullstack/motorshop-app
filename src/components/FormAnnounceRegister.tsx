"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { announceData, announceSchema } from "../schemas/announce.schema";
import { Brand } from "@/mock";
import { useSeller } from "@/contexts/SellerContext";
import { formatPrice } from "@/utils/formattedPrice";

interface FormAnnounceRegisterProps {
  onClose: () => void;
  openNotifyModal: () => void;
}

export default function FormAnnounceRegister(props: FormAnnounceRegisterProps) {
  const { listCarsByBrand, kenzieCars, getCarFIPE, carFIPE, kenzieCarSelected, setKenzieCarSelected, handleCreateAnnounce, } = useSeller();
  const [imageFields, setImageFields] = useState(["image1"]);

  const { register, handleSubmit, formState: { errors, }, watch, setValue, } = useForm<announceData>({
    resolver: zodResolver(announceSchema),
  });

  const brandWatch = watch("brand");
  const modelWatch = watch("model");

  function addImageField() {
    if (imageFields.length < 5) {
      const newField = `image${imageFields.length + 1}`;
      setImageFields([...imageFields, newField]);
    }
  }

  useEffect(() => {
    async function handleCarsList() {
      if (brandWatch) await listCarsByBrand(brandWatch);
    }

    handleCarsList();
  }, [brandWatch]);

  useEffect(() => {
    async function handleGetCarFIPE() {
      await getCarFIPE(kenzieCarSelected);
    }

    if (modelWatch) {
      handleGetCarFIPE();
    }
  }, [kenzieCarSelected]);

  useEffect(() => {
    if (modelWatch) {
      kenzieCars.forEach((car) => {
        if (car.name === modelWatch) {
          setKenzieCarSelected(car);

          setValue("year", car.year);

          switch (car.fuel) {
          case 1:
            setValue("fuel", "Flex");
            break;
          case 2:
            setValue("fuel", "Híbrido");
            break;
          case 3:
            setValue("fuel", "Elétrico");
            break;
          }
        }
      });
    }
  }, [modelWatch]);

  async function prepareFormData(data: announceData) {
    const defaultImage = "https://files.slack.com/files-pri/TQZR39SET-F05DEA2BPJN/image.png";
    if (!data.coverImage) {
      data.coverImage = defaultImage;
    }
    if (data.images[0] === "") {
      data.images[0] = defaultImage;
      data.images[1] = defaultImage;
    }
    return data;
  }

  async function submitForm(data: announceData) {
    const preparedData = await prepareFormData(data);
    await handleCreateAnnounce(preparedData);
    props.onClose();
    props.openNotifyModal();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <legend className="mb-6 text-sm font-medium text-black font-inter">Infomações do veículo</legend>

      <fieldset className="space-y-6">
        <Input type="select" name="brand" label="Marca" placeholder="Digitar Marca" register={register("brand")}>
          {
            Object.values(Brand).map((brand) => (<option key={brand} className="capitalize" value={brand}>{brand}</option>))
          }
        </Input>
        <Input type="select" name="model" label="Modelo" placeholder="Digitar Modelo" register={register("model")}>
          {
            kenzieCars.map((car) => (<option key={car.id} className="capitalize" value={car.name}>{car.name}</option>))
          }
        </Input>
      </fieldset>

      <div className="space-y-6 mt-7">
        <div className="flex gap-3">
          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="year">Ano</label>
            <input
              id="year"
              disabled
              className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1 cursor-not-allowed"
              {...register("year")}
            />
            {errors.year && <span>{errors.year.message}</span>}
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 text-sm font-medium text-black font-inter">
            <label htmlFor="fuel">Combustível</label>
            <input
              type="text"
              disabled
              id="fuel"
              placeholder="Digitar Combustível"
              className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1 cursor-not-allowed"
              {...register("fuel")}
            />
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
            <input
              type="text"
              value={formatPrice(carFIPE)}
              name="priceFIPE"
              id="priceFIPE"
              placeholder="Digitar Preço FIPE"
              disabled
              className="px-4 py-2 text-grey-1 rounded w-full border-2 border-grey-7 input-placeholder hover:border-grey-8 focus:border-brand-1 cursor-not-allowed"
            />
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
              register={register(`images.${index}`)}
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
