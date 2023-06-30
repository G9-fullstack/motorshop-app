"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { announceResponse, updateAnnounceData, updateAnnounceSchema } from "../schemas/announce.schema";
import { useSeller } from "@/contexts/SellerContext";
import { formatPrice } from "@/utils/formattedPrice";
import { Brand, EnumBrand } from "@/contexts/interfaces";
import { Toaster, toast } from "sonner";

interface EditAnnounceFormProps {
  closeModal: () => void;
  announceId: number,
  announce: announceResponse,
}

export default function EditAnnounceForm({ closeModal, announceId, announce, }: EditAnnounceFormProps) {
  const { listCars, handleEditAnnounce, handleDeleteAnnounce, } = useSeller();
  const [imageFields, setImageFields] = useState(["image1"]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors, }, watch, setValue, } = useForm<updateAnnounceData>({
    resolver: zodResolver(updateAnnounceSchema),
  });

  const isActiveWatch = watch("isActive");

  function addImageField() {
    if (imageFields.length < 5) {
      const newField = `image${imageFields.length + 1}`;
      setImageFields([...imageFields, newField]);
    }
  }

  useEffect(() => {
    if (announce) {
      setValue("brand", announce.brand);
      setValue("model", announce.model);
      setValue("year", announce.year);
      setValue("fuel", announce.fuel);
      setValue("mileage", announce.mileage);
      setValue("color", announce.color);
      setValue("price", announce.price);
      setValue("description", announce.description);
      setValue("isActive", announce.isActive);
      setValue("coverImage", announce.coverImage);
      setValue("year", announce.year);
      setValue("fuel", announce.fuel);
    }
  }, []);

  async function prepareFormData(data: updateAnnounceData) {
    const defaultImage =
      "https://files.slack.com/files-pri/TQZR39SET-F05DEA2BPJN/image.png";
    if (!data.coverImage) {
      data.coverImage = defaultImage;
    }
    if (data.images && data.images[0] === "") {
      data.images[0] = defaultImage;
      data.images[1] = defaultImage;
    }
    data.price = data.price && data.price.replace(/\D/g, "");
    data.brand = data.brand && data.brand.toLowerCase();
    data.model = data.model && data.model.toLowerCase();
    return data;
  }

  function deleteAnnounce() {
    setConfirmDelete(true);

    setTimeout(() => {
      setConfirmDelete(false);
    }, 2000);

    if (confirmDelete) {
      handleDeleteAnnounce(announceId);
      toast.success("Usuario excluido com sucesso");
      closeModal();
    }
  }

  async function submitForm(data: updateAnnounceData) {
    const preparedData = await prepareFormData(data);
    handleEditAnnounce(preparedData, announceId);
    closeModal();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <legend className="mb-6 text-sm font-medium text-black font-inter">Infomações do veículo</legend>
      <fieldset className="space-y-6">
        <Input
          type="select"
          name="brand"
          label="Marca"
          value={announce.brand}
          placeholder="Digitar Marca"
          register={register("brand")}
        >
          <option className="capitalize" value={announce.brand.toLowerCase()}>{announce.brand}</option>
          {Object.values(Brand).filter(brand => brand !== announce.brand.toLowerCase()).map((brand) => (
            <option key={brand} className="capitalize" value={brand}>
              {brand}
            </option>
          ))}
        </Input>
        <Input
          type="select"
          name="model"
          label="Modelo"
          value={announce.model}
          placeholder="Digitar Modelo"
          register={register("model")}
        >
          <option className="capitalize" value={announce.model.toLowerCase()}>{announce.model}</option>
          {listCars[announce.brand.toLowerCase() as EnumBrand]
            && listCars[announce.brand.toLowerCase() as EnumBrand]
              .filter((car) => car.name !== announce.model.toLowerCase())
              .map((car) => (
                <option key={car.id} className="capitalize" value={car.name}>
                  {car.name}
                </option>
              ))}
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
              value={formatPrice(100)}
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

        <legend className="mb-6 text-sm font-medium text-black font-inter mt-7">Publicado</legend>
        <fieldset className="space-y-6">
          <fieldset className="flex gap-3">
            <span
              onClick={() => setValue("isActive", true)}
            >
              <Button type="button" style={isActiveWatch ? "outline-1" : "brand-1"} details={isActiveWatch ? "" : "text-grey-whiteFixed"} size="big" width={152}>Sim</Button>
            </span>
            <span
              onClick={() => setValue("isActive", false)}
            >
              <Button type="button" style={isActiveWatch ? "brand-1" : "outline-1"} details={isActiveWatch ? "text-grey-whiteFixed" : ""} size="big" width={152}>Não</Button>
            </span>
          </fieldset>
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
        <Button onClick={deleteAnnounce} type="button" style="grey-2" details="" size="medium">
          {confirmDelete ? "Confirmar?" : "Excluir Anúncio"}
        </Button>
        <Button type="submit" style="brand-3" details="text-grey-whiteFixed" size="medium">Salvar alterações</Button>
      </fieldset>
      <Toaster position="top-center" expand={true} />
    </form>
  );
}
