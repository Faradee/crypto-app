import React, { useContext, useState } from "react";
import { BsFillEnvelopeFill } from "react-icons/bs";
import { Auth } from "./AuthModal";
import { createUser, signUser } from "@/actions/userActions";
import FormField from "../forms/FormField";
import Button from "../forms/Button";
import { signInSchema, signUpSchema, userSchema } from "@/actions/userSchemas";
import zod from "zod";
import LoadingContext from "../loader/LoadingContext";
import { iconColor } from "@/app/variables";
import { AiFillLock, AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import styles from "./auth.module.scss";
import AuthContext from "./AuthContext";
type User = {
  uuid: string;
  email: string;
};
const AuthForm = ({
  auth,
  setAuth,
  setIsAuth,
}: {
  auth: Auth;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}) => {
  const [user, setUser] = useState<User>();
  const { setAuthorized } = useContext(AuthContext);
  const loadResource = useContext(LoadingContext);
  const [error, setError] = useState<string>("");
  const { email, password, confirmPassword, isSignup, showPassword } = auth;

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
        setUser(fetchedUser as User);
        setAuthorized(true);
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
        setUser(createdUser as User);
        setAuthorized(true);
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
  return (
    <form
      onSubmit={
        isSignup
          ? (e) => {
              e.preventDefault();
              loadResource(handleSignUp());
            }
          : (e) => {
              e.preventDefault();
              loadResource(handleSignIn());
            }
      }
      className={styles.form}
      id="auth"
    >
      <div className={styles.field}>
        <FormField
          placeholder="Email адрес"
          type="email"
          onChange={handleChange}
          icon={BsFillEnvelopeFill}
          name="email"
          useState={[email, setAuthProp]}
        />
      </div>
      <div className={styles.field}>
        <FormField
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          useState={[password, setAuthProp]}
          onChange={handleChange}
          name="password"
          icon={AiFillLock}
        >
          {!isSignup && (
            <div className={styles.visibilitySwitch} onClick={handleShowPassword}>
              {showPassword ? (
                <AiFillEye color={iconColor} size={20} />
              ) : (
                <AiFillEyeInvisible color={iconColor} size={20} />
              )}
            </div>
          )}
        </FormField>
      </div>
      <div className={styles.field}>
        {isSignup && (
          <FormField
            useState={[confirmPassword, setAuthProp]}
            placeholder="Подтвердите пароль"
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="confirmPassword"
          />
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
      <Button submit title={isSignup ? "Создать аккаунт" : "Войти"} />
    </form>
  );
};

export default AuthForm;
