"use client";
import { createContext } from "react";
export type User = {
  uuid: string;
  email: string;
};

const UserContext = createContext<{
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({ user: undefined, setUser: () => {} });

export default UserContext;
