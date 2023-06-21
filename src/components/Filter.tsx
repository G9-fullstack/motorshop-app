import { SelectedFiltersProps } from "@/app/page";
import { formatPrice } from "@/utils/formattedPrice";
import { X } from "lucide-react";
import { ReactNode } from "react";
import Button from "./Button";
import { announceResponse } from "@/schemas/announce.schema";

type FilterProps = {
  isOpen: boolean;
  announces: announceResponse[] | undefined
  selectedFilters: SelectedFiltersProps;
  handleShowFilter: () => void;
  handleFilterReset: () => void;
  handleFilterChange: (filter: keyof SelectedFiltersProps, value: string) => void;
}

export default function Filter(props: FilterProps) {

  const options = (option: keyof SelectedFiltersProps): ReactNode => {
    const uniqueOptions = new Set(props.announces?.map(announce => announce[option]));
    return Array.from(uniqueOptions).map(value => (
      <li
        key={String(value)}
        onClick={() => props.handleFilterChange(option, String(value))}
        className={`heading-6-500 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis capitalize hover:text-grey-2 transition-all duration-300 ease-in-out
          ${props.selectedFilters[option] === value ? "text-brand-1" : "text-grey-3"}`}>
        {value}
      </li>
    ));
  };

  const minPrice = props.announces?.map(announce => announce.price).sort((a, b) => a - b)[0];
  const maxPrice = props.announces?.map(announce => announce.price).sort((a, b) => b - a)[0];
  const minMileage = props.announces?.map(announce => announce.mileage).sort((a, b) => Number(a) - Number(b))[0];
  const maxMileage = props.announces?.map(announce => announce.mileage).sort((a, b) => Number(b) - Number(a))[0];

  return (
    <aside className={`${props.isOpen ? "flex flex-col items-start justify-start fixed top-20 inset-0 bg-white overflow-y-scroll p-6 z-40  scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed" : "hidden md:flex"}`}>
      <div className={`flex items-center justify-between w-full ${!props.isOpen && "md:hidden"}`}>
        <p className="heading-7-500 text-grey-1">Filtro</p>
        <button onClick={props.handleShowFilter}>
          <X className="text-grey-4" />
        </button>
      </div>
      <div className="md:pl-7 mt-7 space-y-10">
        {/* BRANDS */}
        <div className="flex flex-col gap-6" >
          <p className="heading-4-600 text-grey-0">Marca</p>
          <ul className="flex flex-col gap-1 ml-3">
            {options("brand")}
          </ul>
        </div>
        {/* MODELS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Modelo</p>
          <ul className="flex flex-col gap-1 ml-3">
            {options("model")}
          </ul>
        </div>
        {/* COLORS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Cor</p>
          <ul className="flex flex-col gap-1 ml-3">
            {options("color")}
          </ul>
        </div>
        {/* YEARS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Ano</p>
          <ul className="flex flex-col gap-1 ml-3">
            {options("year")}
          </ul>
        </div>
        {/* KM */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">KM</p>
          <input
            className="accent-brand-1 input-label"
            type="range"
            step={maxMileage && minMileage ? (Number(maxMileage) - Number(minMileage)) / 5 : 1}
            min={minMileage}
            max={maxMileage}
            value={props.selectedFilters.mileage || maxMileage}
            onChange={event => props.handleFilterChange("mileage", event.target.value)}
          />
          <span>{props.selectedFilters.mileage ? Number(props.selectedFilters.mileage).toFixed(3) : maxMileage}</span>
        </div>
        {/* PRICE */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">KM</p>
          <input
            className="accent-brand-1 input-label"
            type="range"
            step={maxPrice && minPrice ? (maxPrice - minPrice) / 5 : 1}
            min={minPrice}
            max={maxPrice}
            value={props.selectedFilters.price || maxPrice}
            onChange={event => props.handleFilterChange("price", event.target.value)}
          />
          <span>{props.selectedFilters.price ? formatPrice(Number(props.selectedFilters.price)) : formatPrice(Number(maxPrice))}</span>
        </div>
        {props.isOpen &&
          <div onClick={props.handleShowFilter}>
            <Button style="brand-1" size="big" details="w-full text-white">Ver anúncios</Button>
          </div>
        }
        <div onClick={props.handleFilterReset}>
          <Button style="brand-1" size="big" details="text-white w-full">Limpar filtros</Button>
        </div>
      </div>
    </aside>
  );
}
