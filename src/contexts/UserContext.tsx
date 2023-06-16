"use client";
import { userData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => void;
  handleUserLogin: (formData: userData) => void;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {
  const [username, setUsername] = useState<string>("");
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
        setUsername(data.user.name);
        router.push("/");
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <UserContext.Provider
      value={{
        handleUserCreate,
        handleUserLogin,
        setUsername,
        username,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
