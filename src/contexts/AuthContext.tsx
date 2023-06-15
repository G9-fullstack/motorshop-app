"use client";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode
}

interface AuthContextData {

}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children,}: Props) {

  return(
    <AuthContext.Provider value={{

    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
