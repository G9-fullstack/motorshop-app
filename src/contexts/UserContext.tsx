"use client";
import { loginData, userData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => void;
  handleUserLogin: (formData: loginData) => void;
  isLoading: boolean;
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleUserCreate(formData: userData) {
    api
      .post("/users", formData)
      .then(() => {
        setIsLoading(true);
        router.push("/login");
      })
      .catch((err) => {
        throw err;
      }).finally(() => {
        setIsLoading(false);
      });
  }

  function handleUserLogin(formData: loginData) {
    api
      .post("/login", formData)
      .then(() => {
        setIsLoading(true);
        router.push("/");
      })
      .catch((err) => {
        throw err;
      }).finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <UserContext.Provider
      value={{
        handleUserCreate,
        handleUserLogin,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
