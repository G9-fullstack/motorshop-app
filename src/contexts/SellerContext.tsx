"use client";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode
}

interface SellerContextData {

}

const SellerContext = createContext({} as SellerContextData);

export function SellerProvider({children,}: Props) {

  return(
    <SellerContext.Provider value={{

    }}>
      {children}
    </SellerContext.Provider>
  );
}

export const useSeller = () => useContext(SellerContext);
