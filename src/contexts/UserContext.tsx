"use client";
import { announceData } from "@/schemas/announce.schema";
import { loginData, userData, userProfileData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import nookies, { destroyCookie, setCookie } from "nookies";
import React, { ReactNode, createContext, useContext, useState } from "react";


interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => Promise<boolean>;
  handleUserLogin: (formData: loginData) => void;
  handleUserLogout: () => void;
  handleCreateAnnounce(formData: announceData): Promise<void>;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<userProfileData | null>>;
  user: userProfileData | null
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {
  const [user, setUser] = useState<userProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleUserCreate(formData: userData) {
    const res = api
      .post("/users", formData)
      .then(() => {
        setIsLoading(true);
        return true;
      })
      .catch((err) => {
        throw err;
      }).finally(() => {
        setIsLoading(false);
      });
    return res;
  }

  async function handleUserLogin(formData: loginData) {
    setIsLoading(true);
    api
      .post("/login", formData)
      .then(({ data, }) => {
        router.push("/");
        setCookie(null, "motorshoptoken", data.token, {
          maxAge: 60 * 60 * 24, // 1 day
        });
        return data.token;
      })
      .then((token) => {
        api
          .get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data, }) => {
            setUser(data);
          }).catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      }).finally(() => {
        setIsLoading(false);
      });


  }

  async function handleUserLogout() {
    destroyCookie(null, "motorshoptoken");
    setUser(null);
    router.push("/");
  }

  async function handleCreateAnnounce(formData: announceData) {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    await api
      .post("/announces", formData, {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
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
        handleUserLogout,
        handleCreateAnnounce,
        isLoading,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
