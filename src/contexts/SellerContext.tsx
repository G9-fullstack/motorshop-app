"use client";
import { AnnounceProps } from "@/mock";
import { announceResponse } from "@/schemas/announce.schema";
import api from "@/services/api";
import axios from "axios";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
import { KenzieCar } from "./interfaces";

interface Props {
  children: ReactNode
}

interface GetAnnouncesSellerData {
  data: AnnounceProps[];
  prevPage?: string;
  nextPage?: string;
  currentPage: number;
  totalCount: number;
}

interface SellerContextData {
  announce: announceResponse | null;
  getAnnounce: (id: number) => Promise<void>;
  announcesSeller: GetAnnouncesSellerData;
  getAnnouncesSeller: (id: number, url?: string) => Promise<void>;
  kenzieCars: Array<KenzieCar>;
  listCarsByBrand: (brand: string) => Promise<void>;
  getCarFIPE: (car: KenzieCar) => Promise<void>;
  carFIPE: number;
  kenzieCarSelected: KenzieCar,
  setKenzieCarSelected: React.Dispatch<React.SetStateAction<KenzieCar>>
}

const SellerContext = createContext({} as SellerContextData);

export function SellerProvider({ children, }: Props) {
  const [announce, setAnnounce] = useState<announceResponse | null>(null);
  const [announcesSeller, setAnnouncesSeller] = useState<GetAnnouncesSellerData>({
    data: [],
    prevPage: undefined,
    nextPage: undefined,
    currentPage: 1,
    totalCount: 0,
  } as GetAnnouncesSellerData);
  const [kenzieCars, setKenzieCars] = useState([] as Array<KenzieCar>);
  const [kenzieCarSelected, setKenzieCarSelected] = useState({} as KenzieCar);
  const [carFIPE, setCarFIPE] = useState<number>(0);

  const getAnnouncesSeller = async (id: number, url?: string) => {
    const query = !url ? { page: 1, perPage: 12, } : {};
    api.get<GetAnnouncesSellerData>(url ?? `users/${id}/announces`, {
      params: {
        query,
      },
    }).then(({ data, }) => {
      setAnnouncesSeller(data);
    }).catch(error => {
      console.log(error);
    });
  };

  const getAnnounce = (id: number) => {
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

  async function listCarsByBrand(brand: string) {
    const cars = await axios.get("https://kenzie-kars.herokuapp.com/cars", {
      params: {
        brand,
      },
    });

    setKenzieCars(cars.data);
  }

  async function getCarFIPE(car: KenzieCar) {
    const carSelected = await axios.get("https://kenzie-kars.herokuapp.com/cars/unique", {
      params: {
        brand: car.brand,
        name: car.name,
        fuel: car.fuel,
        year: car.year,
      },
    });

    setCarFIPE(carSelected.data.value);
  }

  return (
    <SellerContext.Provider value={{
      announce,
      getAnnounce,
      getAnnouncesSeller,
      announcesSeller,
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
