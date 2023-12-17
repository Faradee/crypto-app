"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/vercel.png";
import styles from "./navbar.module.scss";
import { IconType } from "react-icons";
import Button from "../forms/Button";
import AuthContext from "./AuthContext";
import { signUserOut } from "@/actions/userActions";
type Button = {
  title: string;
  url: string;
  icon?: IconType;
};
const Navbar = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { authorized, setAuthorized } = useContext(AuthContext);

  const buttons = [
    { title: "Избранное", url: "?favorites=user" },
    { title: "Мои объявления", url: "?posts=user" },
  ] as Button[];
  const handleSignOut = () => {
    signUserOut();
    setAuthorized(false);
  };
  return (
    <>
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
            {!authorized ? (
              <button className={styles.auth} onClick={() => setIsAuth(true)}>
                Войти
              </button>
            ) : (
              <button className={styles.auth} onClick={handleSignOut}>
                Выйти
              </button>
            )}
          </li>
        </ul>
        {isAuth && <AuthModal setIsAuth={setIsAuth} />}
      </nav>

      <div className={styles.navbarIndent} />
    </>
  );
};

export default Navbar;
