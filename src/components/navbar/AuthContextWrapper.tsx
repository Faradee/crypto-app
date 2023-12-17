"use client";
import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthContextWrapper = ({ children }: { children: JSX.Element }) => {
  const [authorized, setAuthorized] = useState<boolean>(false);
  return <AuthContext.Provider value={{ authorized, setAuthorized }}>{children}</AuthContext.Provider>;
};

export default AuthContextWrapper;
