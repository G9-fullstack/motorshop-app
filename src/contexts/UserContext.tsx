"use client";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode
}

interface UserContextData {

}

const UserContext = createContext({} as UserContextData);

export function UserProvider({children,}: Props) {

  return(
    <UserContext.Provider value={{

    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
