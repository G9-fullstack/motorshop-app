"use client";
import api from "@/services/api";
import nookies from "nookies";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

interface Props {
  children: ReactNode
}

interface AuthContextData {
  loadingAuth: boolean
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children, }: Props) {
  const [loadingAuth, setLoadingAuth] = useState(false);
  const { setUser, } = useUser();

  useEffect(() => {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    if (!motorshoptoken) null;
    setLoadingAuth(true);
    api
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
      })
      .then(({ data, }) => {
        setUser(data);
      }).catch((err) => { console.error(err); })
      .finally(() => {
        setLoadingAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ loadingAuth, }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
