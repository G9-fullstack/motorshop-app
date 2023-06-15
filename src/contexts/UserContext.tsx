"use client";
import { userData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

interface Props {
  children: ReactNode
}

interface UserContextData {
  handleUserCreate: (FormData: userData) => void
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({children,}: Props) {
  const router = useRouter();

  function handleUserCreate(formData: userData) {
    api.post("/users", formData)
      .then(() => {
        router.push("/login");
      })
      .catch(err => {
        throw err;
      });
  }

  return(
    <UserContext.Provider value={{
      handleUserCreate,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
