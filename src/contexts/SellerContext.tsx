"use client";
import { announceResponse } from "@/schemas/announce.schema";
import api from "@/services/api";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useState } from "react";
interface Props {
  children: ReactNode
}

interface SellerContextData {
  announce: announceResponse | null;
  getAnnounce: (id: string) => Promise<void>;
}

const SellerContext = createContext({} as SellerContextData);

export function SellerProvider({ children, }: Props) {
  const [announce, setAnnounce] = useState<announceResponse | null>(null);

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

  return (
    <SellerContext.Provider value={{
      announce,
      getAnnounce,
    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
