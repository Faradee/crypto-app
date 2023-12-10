"use client";
import { useState } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { LoaderWrapper } from "../loader/LoaderWrapper";
import ModalContainer from "../containers/ModalContainer";
import logo from "/public/vercel.png";
import AuthForm from "./AuthForm";
export type Auth = {
  email: string;
  password: string;
  confirmPassword: string;
  isSignup: boolean;
  showPassword: boolean;
};
const AuthModal = ({ setIsAuth }: { setIsAuth: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const initialAuth = {
    email: "",
    password: "",
    confirmPassword: "",
    isSignup: false,
    showPassword: false,
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth>(initialAuth);
  const { isSignup } = auth;
  const handleToggle = () => {
    setAuth({ ...initialAuth, isSignup: !isSignup });
  };
  return (
    <ModalContainer>
      <>
        {isLoading && <div className="absolute z-10 -mt-4 h-full w-full rounded-3xl bg-white opacity-50"></div>}
        <div className="w-[175px]">
          <Image className="" src={logo} alt="Logo" />
        </div>

        {!isLoading && (
          <div
            onClick={() => setIsAuth(false)}
            className="absolute -right-12 top-0 flex h-10 w-10 cursor-pointer items-center justify-center opacity-75 hover:opacity-100"
          >
            <AiOutlineClose size={40} color="white" />
          </div>
        )}

        <h1 className="text-2xl font-semibold">{isSignup ? "Создание аккаунта" : "Вход"}</h1>
        <LoaderWrapper loadingState={[isLoading, setIsLoading]}>
          <AuthForm setIsAuth={setIsAuth} setAuth={setAuth} auth={auth} />
        </LoaderWrapper>
        <div className="flex w-full items-center justify-center before:h-[1px] before:flex-grow before:bg-slate-300 before:content-[''] after:h-[1px] after:flex-grow after:bg-slate-300 after:content-['']">
          <span className="mx-2">Или</span>
        </div>
        <div className="text-center">
          {isSignup ? "Есть аккаунт? " : "Не зарегистрированы? "}
          <span
            onClick={handleToggle}
            className="cursor-pointer text-center font-semibold text-blue-600 hover:underline"
          >
            {isSignup ? "Войдите" : "Создайте аккаунт"}
          </span>
        </div>
      </>
    </ModalContainer>
  );
};

export default AuthModal;
