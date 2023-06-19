"use client";
import { announceResponse } from "@/schemas/announce.schema";
import api from "@/services/api";
import axios from "axios";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
interface Props {
  children: ReactNode
}

interface SellerContextData {
  announce: announceResponse | null;
  getAnnounce: (id: string) => Promise<void>;
  kenzieCars: Array<any>;
  listCarsByBrand: (brand: string) => Promise<void>;
  getCarFIPE: (car: any) => Promise<void>;
  carFIPE: number;
  kenzieCarSelected: any,
  setKenzieCarSelected: React.Dispatch<React.SetStateAction<object>>
}

const SellerContext = createContext({} as SellerContextData);

export function SellerProvider({ children, }: Props) {
  const [announce, setAnnounce] = useState<announceResponse | null>(null);
  const [kenzieCars, setKenzieCars] = useState([]);
  const [kenzieCarSelected, setKenzieCarSelected] = useState({});
  const [carFIPE, setCarFIPE] = useState<number>(0);

  const getAnnounce = (id: string) => {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    const response = api.get("/announces/" + id, {
      headers: {
        Authorization: `Bearer ${motorshoptoken}`,
      },
    }).then(({ data, }) => {
      setAnnounce(data);
    }).catch((err) => {
      console.log(err);
    });
    return response;
  };

  async function listCarsByBrand (brand: string) {
    const cars = await axios.get("https://kenzie-kars.herokuapp.com/cars", {
      params: {
        brand,
      },
    });

    setKenzieCars(cars.data);
  }

  async function getCarFIPE(car: any) {
    let fuelType = 1;

    switch (car.fuel) {
    case "Flex":
      fuelType = 1;
      break;
    case "Híbrido":
      fuelType = 2;
      break;
    case "Elétrico":
      fuelType = 3;
      break;
    }

    const carSelected = await axios.get("https://kenzie-kars.herokuapp.com/cars/unique", {
      params: {
        brand: car.brand,
        model: car.model,
        fuel: fuelType,
        year: car.year,
      },
    });

    setCarFIPE(carSelected.data.value);
  }

  return (
    <SellerContext.Provider value={{
      announce,
      getAnnounce,
      kenzieCars,
      listCarsByBrand,
      getCarFIPE,
      carFIPE,
      kenzieCarSelected,
      setKenzieCarSelected,
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
