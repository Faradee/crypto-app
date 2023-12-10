import React, { useContext, useState } from "react";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Auth } from "./AuthModal";
import { createUser, signUser } from "@/actions/userActions";
import FormField from "../forms/FormField";
import Button from "../forms/Button";
import { signInSchema, signUpSchema, userSchema } from "@/actions/userSchemas";
import zod from "zod";
import LoadingContext from "../loader/LoadingContext";
import { AiFillLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
const AuthForm = ({
  auth,
  setAuth,
  setIsAuth,
}: {
  auth: Auth;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}) => {
  const handleShowPassword = () => {
    setAuth({ ...auth, showPassword: !showPassword });
  };
  const handleSignIn = async () => {
    const userData = {
      email,
      password,
    } as zod.infer<typeof signInSchema>;
    const validate = signInSchema.safeParse(userData);
    if (validate.success) {
      const fetchedUser = await signUser(userData);
      const validate = userSchema.safeParse(fetchedUser);
      if (validate.success) {
        setIsAuth(false);
      } else setError(fetchedUser as string);
    } else setError(validate.error.issues[0].message);
  };
  const handleSignUp = async () => {
    const userData = {
      email,
      password,
      confirmPassword,
    } as zod.infer<typeof signUpSchema>;
    const validate = signUpSchema.safeParse(userData);
    if (validate.success) {
      const createdUser = await createUser(validate.data);
      const validated = userSchema.safeParse(createdUser);
      if (validated.success) {
        setIsAuth(false);
        return;
      } else setError("Ошибка при создании акаунта, попробуйте еще раз");
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
  const loadResource = useContext(LoadingContext);
  const [error, setError] = useState<string>("");
  const { email, password, confirmPassword, isSignup, showPassword } = auth;
  return (
    <form id="auth">
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
  );
};

export default AuthForm;
