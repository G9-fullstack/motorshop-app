"use client"
import Button from "@/components/Button";
import CarProduct from "@/components/CarProduct";
import Filter from "@/components/Filter";
import { useEffect, useState } from "react";

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

export type CarProps = {
  name: string;
  brand: brands;
}

type CarBrandProps = {
  [key in brands]: CarProps[];
}

export default function Home() {
  const [brandsCar, setBrandsCar] = useState<CarBrandProps>()
  const [isOpen, setIsOpen] = useState(false);
  const handleShowFilter = () => setIsOpen(!isOpen);

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
      <div className="xl:mx-auto my-16">
        <div className="md:flex-1 md:flex md:justify-between md:items-start">
          {/* MAIN => FILTER */}
          <Filter handleShowFilter={handleShowFilter} isOpen={isOpen} />
          {/* MAIN => ADS */}
          <ul className="flex flex-row overflow-x-scroll gap-x-3 ml-3 pr-3 py-6 max-w-6xl md:gap-x-12 md:gap-y-24 md:ml-0 md:pr-16 md:overflow-x-hidden md:flex-row md:flex-wrap md:justify-center md:items-start lg:justify-end scrollbar-thin scrollbar-thumb-brand-3/70 scrollbar-track-grey-whiteFixed">
            {cars && cars.slice(0, 12).map((car, index) => (
              <CarProduct key={index} name={car.name} />
            ))}
          </ul>
        </div>
      </div>
      {/* INFO ADS */}
      <div className="flex flex-col items-center justify-center gap-10 py-4 mb-10 w-full">
        <div onClick={handleShowFilter}>
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
