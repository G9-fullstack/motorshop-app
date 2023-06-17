"use client";
import { loginData, userData, userProfileData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import React, { ReactNode, createContext, useContext, useState } from "react";



interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => void;
  handleUserLogin: (formData: loginData) => void;
  handleUserLogout: () => void;
  // username: string;
  // setUsername: React.Dispatch<React.SetStateAction<string>>;
  // isSeller: boolean;
  // setIsSeller: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<userProfileData | null>>;
  user: userProfileData | null
}

const UserContext = createContext({} as UserContextData);

export function UserProvider({ children, }: Props) {
  const [user, setUser] = useState<userProfileData | null>(null);
  // const [username, setUsername] = useState<string>("");
  // const [isSeller, setIsSeller] = useState<boolean>(false);
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

  return (
    <UserContext.Provider
      value={{
        handleUserCreate,
        handleUserLogin,
        handleUserLogout,
        // setUsername,
        // username,
        // isSeller,
        // setIsSeller,
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
