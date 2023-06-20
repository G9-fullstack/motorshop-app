"use client";
import { loginData, updateUserData, userData, userProfileData } from "@/schemas/user.schema";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import React, { ReactNode, createContext, useContext, useState } from "react";
import nookies from "nookies";

interface Props {
  children: ReactNode;
}

interface UserContextData {
  handleUserCreate: (formData: userData) => Promise<boolean>;
  handleUserLogin: (formData: loginData) => void;
  handleUserLogout: () => void;
  handleRetrieveUser: (userId: string) => Promise<Omit<userData, "address" | "isSeller" | "password" | "confirmPassword">>
  handleEditUser: (userId: string, formData: updateUserData) => void;
  handleDeleteUser: (userId: string) => void
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

  function handleUserLogin(formData: loginData) {
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

  function handleUserLogout() {
    destroyCookie(null, "motorshoptoken");
    setUser(null);
    router.push("/");
  }

  function handleRetrieveUser(userId: string) {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");

    const user = api
      .get("/users/" + userId, {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
      })
      .then(({ data, }) => data)
      .catch((err) => {
        console.log(err);
        throw err;
      });

    return user;
  }

  function handleEditUser(userId: string, formData: updateUserData	) {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");

    api
      .patch("/users/" + userId, formData, {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  function handleDeleteUser(userId: string) {
    const { motorshoptoken, } = nookies.get(null, "motorshoptoken");
    setIsLoading(true);
    api
      .delete("/users/" + userId, {
        headers: {
          Authorization: `Bearer ${motorshoptoken}`,
        },
      })
      .then(() => {
        handleUserLogout();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <UserContext.Provider
      value={{
        handleUserCreate,
        handleUserLogin,
        handleUserLogout,
        handleEditUser,
        handleDeleteUser,
        handleRetrieveUser,
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
