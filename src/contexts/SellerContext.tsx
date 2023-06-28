"use client";
import { announceResponse, updateAnnounceData } from "@/schemas/announce.schema";
import api from "@/services/api";
import axios from "axios";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { GetAnnouncesData, KenzieCar } from "./interfaces";
import { announceData } from "@/schemas/announce.schema";

interface Props {
  children: ReactNode
}

interface SellerContextData {
  announce: announceResponse | null;
  announcesSeller: GetAnnouncesData;
  getAnnounce: (id: string) => Promise<void>;
  getAnnouncesSeller: (id?: number, url?: string) => void;
  kenzieCars: Array<KenzieCar>;
  listCarsByBrand: (brand: string) => Promise<void>;
  getCarFIPE: (car: KenzieCar) => Promise<void>;
  carFIPE: number;
  kenzieCarSelected: KenzieCar,
  setKenzieCarSelected: React.Dispatch<React.SetStateAction<KenzieCar>>
  handleCreateAnnounce(formData: announceData): Promise<void>;
  handleEditAnnounce(formData: updateAnnounceData, id: number): void;
  handleDeleteAnnounce(id: number): void;
}

const SellerContext = createContext({} as SellerContextData);

export function SellerProvider({ children, }: Props) {
  const [announce, setAnnounce] = useState<announceResponse | null>(null);
  const [announcesSeller, setAnnouncesSeller] = useState<GetAnnouncesData>({
    data: [],
    currentPage: 1,
    nextPage: undefined,
    prevPage: undefined,
    totalPages: 1,
  });
  const [kenzieCars, setKenzieCars] = useState([] as Array<KenzieCar>);
  const [kenzieCarSelected, setKenzieCarSelected] = useState({} as KenzieCar);
  const [carFIPE, setCarFIPE] = useState<number>(0);

  useEffect(() => {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    api.defaults.headers.Authorization = `Bearer ${motorshoptoken}`;
  }, []);

  const getAnnouncesSeller = (id?: number, url?: string): void => {
    const query = !url ? { page: 1, perPage: 12, } : {};
    const setUrl = !id ? "/announces" : `users/${id}/announces`;
    api
      .get<GetAnnouncesData>(url ?? setUrl, {
        params: {
          query,
        },
      })
      .then(({ data, }) => {
        setAnnouncesSeller(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleCreateAnnounce(formData: announceData) {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    await api
      .post("/announces", formData, {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
      })
      .catch((err) => {
        throw err;
      });
  }

  function handleEditAnnounce(formData: updateAnnounceData, id: number) {
    api.patch(`/announces/${id}`, formData)
      .catch(err => {
        throw err;
      });
  }

  function handleDeleteAnnounce(id: number) {
    api.delete(`/announces/${id}`)
      .catch(err => {
        throw err;
      });
  }

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
      announcesSeller,
      kenzieCars,
      kenzieCarSelected,
      carFIPE,
      getAnnounce,
      getAnnouncesSeller,
      listCarsByBrand,
      getCarFIPE,
      setKenzieCarSelected,
      handleCreateAnnounce,
      handleEditAnnounce,
      handleDeleteAnnounce,
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
