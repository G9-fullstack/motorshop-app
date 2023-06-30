"use client";
import { announceResponse, updateAnnounceData } from "@/schemas/announce.schema";
import api from "@/services/api";
import axios from "axios";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CarByBrand, EnumBrand, GetAnnouncesData } from "./interfaces";
import { announceData } from "@/schemas/announce.schema";

interface Props {
  children: ReactNode
}

interface SellerContextData {
  announce: announceResponse | null;
  announcesSeller: GetAnnouncesData;
  getAnnounce: (id: string) => Promise<void>;
  getAnnouncesSeller: (id?: number, url?: string) => void;
  handleCreateAnnounce(formData: announceData): Promise<void>;
  handleEditAnnounce(formData: updateAnnounceData, id: number): void;
  handleDeleteAnnounce(id: number): void;
  listCars: CarByBrand;
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
  const [listCars, setListCars] = useState<CarByBrand>({} as CarByBrand);

  useEffect(() => {
    (async () => await getListCars())();
  }, []);

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
      .then(() => {
        getAnnouncesSeller();
      })
      .catch((err) => {
        throw err;
      });
  }

  function handleEditAnnounce(formData: updateAnnounceData, id: number) {
    api.patch(`/announces/${id}`, formData)
      .then(() =>
        getAnnouncesSeller())
      .catch(err => {
        throw err;
      });
  }

  function handleDeleteAnnounce(id: number) {
    api.delete(`/announces/${id}`)
      .then(() =>
        getAnnouncesSeller())
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

  async function getListCars() {
    const response = await axios.get("https://kenzie-kars.herokuapp.com/cars");
    const list = Object.keys(response.data);
    const updatedListCars: CarByBrand = {} as CarByBrand;
    for (const item of list) {
      const response = await axios.get("https://kenzie-kars.herokuapp.com/cars", {
        params: {
          brand: item,
        },
      });
      updatedListCars[item as EnumBrand] = response.data;
    }
    setListCars(updatedListCars);
  }

  return (
    <SellerContext.Provider value={{
      listCars,
      announce,
      announcesSeller,
      getAnnounce,
      getAnnouncesSeller,
      handleCreateAnnounce,
      handleEditAnnounce,
      handleDeleteAnnounce,
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
