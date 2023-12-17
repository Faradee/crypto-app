"use client";
import { createContext } from "react";
const AuthContext = createContext<{
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}>({ authorized: false, setAuthorized: () => {} });

export default AuthContext;
