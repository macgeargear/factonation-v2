"use client";

import { host } from "@/lib/utils";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export interface IAuthContext {
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<unknown>;
  logout: () => void;
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const _token = Cookies.get("token");
  const _name = Cookies.get("name");
  const [token, setToken] = useState(_token);
  const [user, setUser] = useState(_name);
  useEffect(() => {
    setToken(localStorage.getItem("token") || "");
    setUser(localStorage.getItem("user") || "");
  }, [token, user]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [email, setEmail] = useState(user || "");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  async function login(email: string, password: string) {
    try {
      const response = await axios.post(
        `http://${host}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 401) {
        throw new Error(response.statusText);
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      setIsLoggedIn(true);
      setEmail(email);
      setName(response.data.name);
      setId(response.data.id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setName("");
    setId("");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setEmail("");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, email, login, logout, id, name }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
