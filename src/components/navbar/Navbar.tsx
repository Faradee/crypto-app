"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useContext } from "react";
import AuthModal from "./AuthModal";
import logo from "/public/placeholder.svg";
import styles from "./navbar.module.scss";
import AuthContext from "./AuthContext";
import { signUserOut } from "@/actions/userActions";
import { RiBitCoinFill, RiLogoutBoxRLine, RiLoginBoxLine } from "react-icons/ri";
//todo: add watched cryptos and dashboard
const Navbar = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { authorized, setAuthorized } = useContext(AuthContext);
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
          <li>
            <Link href="/transactions">
              <div>
                <RiBitCoinFill size={20} />
              </div>
              Мои транзакции
            </Link>
          </li>
          <li>
            {!authorized ? (
              <button className={styles.auth} onClick={() => setIsAuth(true)}>
                <div>
                  <RiLoginBoxLine size={20} />
                </div>
                Войти
              </button>
            ) : (
              <button className={styles.auth} onClick={handleSignOut}>
                <div>
                  <RiLogoutBoxRLine size={20} />
                </div>
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
