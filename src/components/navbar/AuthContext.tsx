"use client";
import { createContext } from "react";
const AuthContext = createContext<{
  authorized: boolean | undefined;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}>({ authorized: undefined, setAuthorized: () => {} });

export default AuthContext;
