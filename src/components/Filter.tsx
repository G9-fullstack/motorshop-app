import { X } from "lucide-react";
import { ReactNode } from "react";
import Button from "./Button";

type FilterProps = {
  handleShowFilter: () => void;
  isOpen: boolean;
}

export default function Filter(props: FilterProps) {

  


  const filter = (text: string): ReactNode => {
    return ([0, 1, 2, 3, 4, 5, 6, 7, 8].map((_, index) =>
      <li key={index} className="heading-6-500 text-grey-3 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis">{text} {index}</li>
    ))
  }
  return (
    <aside className={`${props.isOpen ? "flex flex-col items-start justify-start fixed top-20 inset-0 bg-white overflow-y-scroll p-6 z-40" : "hidden md:flex md:flex-1"}`}>
      {/* MAIN => FILTER => HEADER */}
      <div className={`flex items-center justify-between w-full ${!props.isOpen && "md:hidden"}`}>
        <p className="heading-7-500 text-grey-1">Filtro</p>
        <button onClick={props.handleShowFilter}>
          <X className="text-grey-4" />
        </button>
      </div>
      {/* MAIN => FILTER => BODY */}
      <div className="pl-8 mt-7 space-y-10">
        {/* FILTER => BODY => BRANDS */}
        <div className="flex flex-col gap-6" >
          <p className="heading-4-600 text-grey-0">Marca</p>
          <ul className="flex flex-col gap-1 ml-3">
            {filter("Marca")}
          </ul>
        </div>
        {/* FILTER => BODY => MODELS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Modelo</p>
          <ul className="flex flex-col gap-1 ml-3">
            {filter("Modelo")}
          </ul>
        </div>
        {/* FILTER => BODY => COLORS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Cor</p>
          <ul className="flex flex-col gap-1 ml-3">
            {filter("Cor")}
          </ul>
        </div>
        {/* FILTER => BODY => YEARS */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Ano</p>
          <ul className="flex flex-col gap-1 ml-3">
            {filter("Ano")}
          </ul>
        </div>
        {/* FILTER => BODY => KM */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">KM</p>
          <div className="flex items-center justify-start gap-2">
            <Button style="negative" size="big" width={120}>Mínimo</Button>
            <Button style="negative" size="big" width={120}>Máximo</Button>
          </div>
        </div>
        {/* FILTER => BODY => PRICE */}
        <div className="flex flex-col gap-4">
          <p className="heading-4-600 text-grey-0">Preço</p>
          <div className="flex items-center justify-start gap-2">
            <Button style="negative" size="big" width={120}>Mínimo</Button>
            <Button style="negative" size="big" width={120}>Máximo</Button>
          </div>
        </div>
      </div>
    </aside>
  )
}