"use client";
import { useState } from "react";
import Image from "next/image";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { AiOutlineClose, AiFillLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { createUser, signUser } from "@/actions/userActions";
import FormField from "../forms/FormField";
import Button from "../forms/Button";
import { signInSchema, signUpSchema, userSchema } from "@/actions/userSchemas";
import zod from "zod";
import ModalContainer from "../containers/ModalContainer";
type Auth = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  isSignup: boolean;
  showPassword: boolean;
};
const AuthModal = () => {
  const initialAuth = {
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    isSignup: false,
    showPassword: false,
  };
  const [auth, setAuth] = useState<Auth>(initialAuth);
  const { email, password, name, confirmPassword, isSignup, showPassword } = auth;
  const [error, setError] = useState<string>("");
  const handleShowPassword = () => {
    setAuth({ ...auth, showPassword: !showPassword });
  };
  const handleToggle = () => {
    setAuth({ ...initialAuth, isSignup: !isSignup });
  };
  const handleSignIn = async () => {
    const userData = {
      name: email,
      password: password,
    } as zod.infer<typeof signInSchema>;
    const validate = signInSchema.safeParse(userData);
    if (validate.success) {
      const fetchedUser = await signUser(userData);
      const validate = userSchema.safeParse(fetchedUser);
      if (validate.success) {
        dispatch(signIn(validate.data));
        dispatch(setDim(false));
      } else setError(fetchedUser as string);
    } else setError(validate.error.issues[0].message);
  };
  const handleSignUp = async () => {
    const userData = {
      name,
      email,
      password,
      confirmPassword,
    } as zod.infer<typeof signUpSchema>;
    const validate = signUpSchema.safeParse(userData);
    if (validate.success) {
      const createdUser = await createUser(validate.data);
      const validated = userSchema.safeParse(createdUser);
      if (validated.success) {
        dispatch(setDim(false));
        dispatch(signIn(createdUser as zod.infer<typeof userSchema>));
        return;
      } else setError(createdUser as string);
    } else setError(validate.error.issues[0].message);
  };
  const setAuthProp: React.Dispatch<React.SetStateAction<any>> = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAuth({ ...auth, [e.currentTarget.name]: e.currentTarget.value });
  };
  const handleChange = (
    e: React.ChangeEvent | React.MouseEvent,
    setAuthProp: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setAuthProp(e);
    setError("");
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
            onClick={() => dispatch(setDim(false))}
            className="absolute -right-12 top-0 flex h-10 w-10 cursor-pointer items-center justify-center opacity-75 hover:opacity-100"
          >
            <AiOutlineClose size={40} color="white" />
          </div>
        )}

        <h1 className="text-2xl font-semibold">{isSignup ? "Создание аккаунта" : "Вход"}</h1>
        <LoaderWrapper>
          <form id="auth">
            {isSignup && (
              <FormField
                useState={[name, setAuthProp]}
                type="text"
                placeholder="Полное имя"
                onChange={handleChange}
                name="name"
              />
            )}
            <FormField
              placeholder="Email адрес"
              type="email"
              onChange={handleChange}
              icon={BsFillEnvelopeFill}
              name="email"
              useState={[email, setAuthProp]}
            />
            <FormField
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              useState={[password, setAuthProp]}
              onChange={handleChange}
              name="password"
              icon={AiFillLock}
            >
              {!isSignup && (
                <div className="cursor-pointer" onClick={handleShowPassword}>
                  {showPassword ? <AiFillEye size={24} /> : <AiFillEyeInvisible size={24} />}
                </div>
              )}
            </FormField>
            {isSignup && (
              <FormField
                useState={[confirmPassword, setAuthProp]}
                placeholder="Подтвердите пароль"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                name="confirmPassword"
              />
            )}
            {error && <span className="flex justify-center text-center text-red-500">{error}</span>}
            <Button
              submit
              onClick={isSignup ? () => loadResource(handleSignUp()) : () => loadResource(handleSignIn())}
              title={isSignup ? "Создать аккаунт" : "Войти"}
            />
          </form>
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
