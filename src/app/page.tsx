"use client"
import Button from "@/components/Button";
import { DollarSign, X } from "lucide-react";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import frame from "../../public/example-car.png";

enum brands {
  chevrolet = "chevrolet",
  citroën = "citroën",
  fiat = "fiat",
  ford = "ford",
  honda = "honda",
  hyundai = "hyundai",
  nissan = "nissan",
  peugeot = "peugeot",
  renault = "renault",
  toyota = "toyota",
  volkswagen = "volkswagen",
}

type CarProps = {
  name: string;
  brand: brands;
}

type CarBrandProps = {
  [key in brands]: CarProps[];
}

export default function Home() {
  const [showFilters, setShowFilters] = useState(false)
  const [brandsCar, setBrandsCar] = useState<CarBrandProps>()
  const handleShowFilters = () => setShowFilters(!showFilters);

  const brands = brandsCar && Object.keys(brandsCar)

  const cars = brandsCar && Object
    .entries(brandsCar)
    .map(([brand, cars]) =>
      cars.map((car) =>
        ({ name: car.name, brand })))
    .flat();

  useEffect(() => {
    (async function () {
      const response = await fetch("https://kenzie-kars.herokuapp.com/cars");
      const data: CarBrandProps = await response.json();
      setBrandsCar(data);
    })()
  }, []);

  const initialName = (name: string) => {
    return name.split(" ")[0].charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase()
  }

  const filter = (text: string): ReactNode => {
    return (cars && cars.slice(0, 10).map((_, index) =>
      <li key={index} className="heading-6-500 text-grey-3 cursor-pointer overflow-hidden whitespace-nowrap overflow-ellipsis">{text} {index}</li>
    ))
  }

  return (
    <main>
      {/* COVER */}
      <div className="mt-20 h-[550px] w-full bg-home bg-cover bg-center px-2">
        <div className="flex flex-col items-center justify-center h-full w-full gap-8">
          <h1 className="font-lexend font-bold text-center text-white text-3xl">Motors Shop</h1>
          <p className="text-white text-center text-xl">A melhor plataforma de anúncios de carros do pais</p>
        </div>
      </div>
      {/* MAIN */}
      <div className="xl:container xl:mx-auto my-16">
        <div className="md:grid md:grid-cols-[1fr,3fr]">
          {/* MAIN => FILTER */}
          <div className={`${showFilters ? "flex flex-col items-start justify-start fixed top-20 inset-0 bg-white overflow-y-scroll p-6 z-40" : "hidden md:block"}`}>
            {/* MAIN => FILTER => HEADER */}
            <div className={`flex items-center justify-between w-full ${!showFilters && "md:hidden"}`}>
              <p className="heading-7-500 text-grey-1">Filtro</p>
              <button onClick={handleShowFilters}>
                <X className="text-grey-4" />
              </button>
            </div>
            {/* MAIN => FILTER => BODY */}
            <div className="pl-2 mt-7 space-y-10">
              {/* FILTER => BODY => BRANDS */}
              <div className="flex flex-col gap-6" >
                <p className="heading-4-600 text-grey-0">Marca</p>
                <ul className="flex flex-col gap-1 ml-2">
                  {filter("Marca")}
                </ul>
              </div>
              {/* FILTER => BODY => MODELS */}
              <div className="flex flex-col gap-4">
                <p className="heading-4-600 text-grey-0">Modelo</p>
                <ul className="flex flex-col gap-1 ml-2">
                  {filter("Modelo")}
                </ul>
              </div>
              {/* FILTER => BODY => COLORS */}
              <div className="flex flex-col gap-4">
                <p className="heading-4-600 text-grey-0">Cor</p>
                <ul className="flex flex-col gap-1 ml-2">
                  {filter("Cor")}
                </ul>
              </div>
              {/* FILTER => BODY => YEARS */}
              <div className="flex flex-col gap-4">
                <p className="heading-4-600 text-grey-0">Ano</p>
                <ul className="flex flex-col gap-1 ml-2">
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
          </div>
          {/* MAIN => ADS => CAR LIST */}
          <ul className="grid grid-flow-col overflow-x-scroll ml-3 gap-4 pr-3 py-6 md:flex md:flex-wrap md:justify-center md:items-start">
            {cars && cars.slice(0, 12).map((car, index) => (
              <li key={index} className="w-80 space-y-6 pb-4 md:min-w-[20rem]">
                {/* MAIN => ADS => CAR LIST => CAR ITEM => IMAGE CAR */}
                <div className="w-full h-80 bg-contain bg-grey-7 relative">
                  {/* MAIN => ADS => CAR LIST => CAR ITEM => IMAGE CAR => DOLLAR */}
                  <div className="absolute top-0 right-0 flex bg-random-profile-7 py-1 rounded-sm">
                    <DollarSign color="#fff" />
                  </div>
                  <Image src={frame} alt="Car" />
                </div>
                {/* MAIN => ADS => CAR LIST => CAR ITEM => CAR INFO */}
                <div className="space-y-6">
                  <p className="heading-7-600 uppercase overflow-hidden whitespace-nowrap overflow-ellipsis">{car.name}</p>
                  <p className="body-2-400 max-h-[70px] overflow-hidden whitespace-pre-wrap overflow-ellipsis">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem...</p>
                  {/* MAIN => ADS => CAR LIST => CAR ITEM => CAR INFO => CAR DESCRIPTION */}
                  <div className="space-x-2">
                    <span className="body-2-500 text-white p-2 bg-brand-1 rounded-full">{initialName("Samuel Leão")}</span>
                    <span className="body-2-500 overflow-hidden whitespace-nowrap overflow-ellipsis">Samuel Leão</span>
                  </div>
                  {/* MAIN => ADS => CAR LIST => CAR ITEM => CAR INFO => CAR DETAILS */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-x-4">
                      <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">0 KM</span>
                      <span className="body-2-500 text-brand-1 px-2 py-1 bg-brand-4">2019</span>
                    </div>
                    <span className="heading-7-500">R$ 00.000,00</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* INFO ADS */}
      <div className="flex flex-col items-center justify-center gap-10 py-4 mb-10 w-full">
        {/* INFOS ADS => SHOW FILTER */}
        <div onClick={handleShowFilters}>
          <Button details="md:hidden text-white" size="big" style="brand-1" width={280}>Filtros</Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex items-center justify-center gap-2 heading-5-600 text-grey-3/50">
            <span className="text-grey-3">1</span> de <span>2</span>
          </div>
          <span className="text-brand-2 heading-5-600">Seguinte {">"}</span>
        </div>
      </div>
    </main>
  );
}
