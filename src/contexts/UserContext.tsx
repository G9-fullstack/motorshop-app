"use client";
import { announceData } from "@/schemas/announce.schema";
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
  handleCreateAnnounce(formData: announceData): void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  isSeller: boolean;
  setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {
  const [username, setUsername] = useState<string>("");
  const [isSeller, setIsSeller] = useState<boolean>(false);
  const router = useRouter();

  function handleUserCreate(formData: userData) {
    api
      .post("/users", formData)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        throw err;
      });
  }

  function handleUserLogin(formData: userData) {
    api
      .post("/login", formData)
      .then(({data,}) => {
        setIsSeller(data.user.isSeller);
        setUsername(data.user.name);
        router.push("/");
      })
      .catch((err) => {
        throw err;
      });
  }

  function handleCreateAnnounce(formData: announceData) {
    api
      .post("/announces", formData)
      .catch((err) => {
        throw err;
      });
  }

  return (
    <UserContext.Provider
      value={{
        handleUserCreate,
        handleUserLogin,
        handleCreateAnnounce,
        setUsername,
        username,
        isSeller,
        setIsSeller,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
