"use client";
import { userData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useContext, useState } from "react";


interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => void;
  handleUserLogin: (formData: userData) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
 isLoading: boolean;

}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {

  const [username, setUsername] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);
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


  function handleUserLogin(formData: userData) {
    api
      .post("/login", formData)
      .then(({data,}) => {
        setIsSeller(data.user.isSeller);
        setUsername(data.user.name);
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
        setUsername,
        username,
        isSeller,
        setIsSeller,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
