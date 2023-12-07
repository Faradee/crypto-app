"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/vercel.png";
import styles from "./styles.module.scss";
import { IconType } from "react-icons";
type Button = {
  title: string;
  url: string;
  icon?: IconType;
};
const Navbar = () => {
  const [isNav, setNav] = useState<boolean>(false);
  const [isAuth, setAuth] = useState<boolean>(false);

  const buttons = [
    {
      title: "Создать объявление",
      url: "create",
    },
    { title: "Избранное", url: "?favorites=user" },
    { title: "Мои объявления", url: "?posts=user" },
  ] as Button[];

  return (
    <>
      <nav className={styles.navbar}>
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
        <ul>
          {buttons.map((button) => {
            return (
              <li key={button.url}>
                <Link href={`/${button.url.toLowerCase()}`}>{button.title}</Link>
              </li>
            );
          })}
        </ul>
        <div></div>
      </nav>
      {isAuth && <AuthModal />}
      <span className="styles.navbarIndent" />
    </>
  );
};

export default Navbar;
