"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, createContext } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/vercel.png";
import styles from "./navbar.module.scss";
import { IconType } from "react-icons";
import Button from "../forms/Button";
type Button = {
  title: string;
  url: string;
  icon?: IconType;
};
type User = {
  uuid: string;
};
const Navbar = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const contextValue = { user, setUser };
  const UserContext = createContext<typeof contextValue>(contextValue);
  const buttons = [
    {
      title: "Создать объявление",
      url: "create",
    },
    { title: "Избранное", url: "?favorites=user" },
    { title: "Мои объявления", url: "?posts=user" },
  ] as Button[];

  return (
    <UserContext.Provider value={contextValue}>
      <nav className={styles.navbar}>
        <div className={styles.leftContainer}>
          <Link href="/">
            <Image
              src={logo}
              width={0}
              height={0}
              style={{
                width: "auto",
                height: "100%",
              }}
              alt="На главную страницу"
            />
          </Link>
        </div>
        <ul className={styles.optionList}>
          {buttons.map((button) => {
            return (
              <li key={button.url}>
                <Link href={`/${button.url.toLowerCase()}`}>{button.title}</Link>
              </li>
            );
          })}
          <li>
            <button className={styles.signIn} onClick={() => setIsAuth(true)}>
              Войти
            </button>
          </li>
        </ul>
        {isAuth && <AuthModal setIsAuth={setIsAuth} />}
      </nav>

      <div className={styles.navbarIndent} />
    </UserContext.Provider>
  );
};

export default Navbar;