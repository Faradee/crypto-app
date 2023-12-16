"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { LoaderWrapper } from "../loader/LoaderWrapper";
import ModalContainer from "../containers/ModalContainer";
import logo from "/public/vercel.png";
import AuthForm from "./AuthForm";
import { useClickOutside } from "../containers/useClickOutside";
import styles from "./auth.module.scss";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const { isSignup } = auth;
  const handleToggle = () => {
    setAuth({ ...initialAuth, isSignup: !isSignup });
  };
  useClickOutside(modalRef, !isLoading ? () => setIsAuth(false) : () => {});
  return (
    <ModalContainer>
      <LoaderWrapper loadingState={[isLoading, setIsLoading]}>
        <div ref={modalRef} className={styles.container}>
          <Image className="" src={logo} width={50} height={50} alt="Logo" />
          {!isLoading && (
            <div onClick={() => setIsAuth(false)} className={styles.close}>
              <AiOutlineClose size={40} color="white" />
            </div>
          )}

          <h2>{isSignup ? "Создание аккаунта" : "Вход"}</h2>

          <div className={styles.formContainer}>
            <AuthForm setIsAuth={setIsAuth} setAuth={setAuth} auth={auth} />
          </div>

          <div className={styles.switch}>
            {isSignup ? "Есть аккаунт? " : "Не зарегистрированы? "}
            <span className={styles.submit} onClick={handleToggle}>
              {isSignup ? "Войдите" : "Создайте аккаунт"}
            </span>
          </div>
        </div>
      </LoaderWrapper>
    </ModalContainer>
  );
};

export default AuthModal;
