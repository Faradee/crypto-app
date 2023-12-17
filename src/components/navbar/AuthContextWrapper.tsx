"use client";
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextWrapper = ({ isLoggedIn = false, children }: { isLoggedIn: boolean; children: JSX.Element }) => {
  const [authorized, setAuthorized] = useState<boolean | undefined>(isLoggedIn);
  return <AuthContext.Provider value={{ authorized, setAuthorized }}>{children}</AuthContext.Provider>;
};

export default AuthContextWrapper;
