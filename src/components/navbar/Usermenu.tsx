"use client";
import Image from "next/image";
import defaultUserImage from "/public/Default_pfp.png";
import styles from "./styles.module.scss";
import { useState, Suspense, useEffect, memo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchUser, getAvatar, signUserOut } from "@/actions/userActions";
import Skeleton from "react-loading-skeleton";
import { useRef } from "react";
import DropDownContainer, { useClickOutside } from "../containers/DropDownContainer";
const Usermenu = () => {
  const activationRef = useRef(null);
  const router = useRouter();
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const handleSignOut = () => {
    dispatch(signOut());
    dispatch(resetAvatar());
    signUserOut();
    router.replace("/");
  };
  useClickOutside(activationRef, () => setIsMenu(false));
  useEffect(() => {
    const setUser = async () => {
      const newUser = await fetchUser();
      if (newUser) {
        dispatch(signIn(newUser));
        const avatar = await getAvatar();
        if (avatar) {
          dispatch(setAvatar(avatar));
        }
      } else dispatch(signOut());
    };
    setUser();
  }, [dispatch]);
  return (
    <div className="w-min" ref={activationRef}>
      <div
        onClick={() => setIsMenu(true)}
        className="poop relative h-[3rem] w-[3rem] cursor-pointer overflow-hidden rounded-full bg-slate-400 outline-1 outline-blue-400 active:outline"
      >
        <Suspense
          fallback={<Skeleton circle={true} inline={false} style={{ lineHeight: "unset" }} className="h-full w-full" />}
        >
          <Image src={avatar ? avatar : defaultUserImage} width={48} height={48} alt="user avatar" />
        </Suspense>
      </div>

      <DropDownContainer active={isMenu}>
        <>
          <div className="mb-2 flex">
            <div className="relative mr-2 max-h-[3rem] min-w-[3rem] overflow-hidden rounded-full bg-slate-400">
              <Suspense
                fallback={
                  <Skeleton circle={true} inline={false} style={{ lineHeight: "unset" }} className="h-full w-full" />
                }
              >
                <Image
                  onClick={() => setIsMenu(true)}
                  src={avatar ? avatar : defaultUserImage}
                  width={48}
                  height={48}
                  alt="user avatar"
                />
              </Suspense>
            </div>
            <div className="flex w-full flex-col overflow-hidden break-words">
              {userData && (
                <>
                  <Suspense fallback={<Skeleton width={"100%"} height={20} />}>
                    <span>{userData.name}</span>
                  </Suspense>
                  <Suspense fallback={<Skeleton width={"100%"} height={20} />}>
                    <span>{userData.email}</span>
                  </Suspense>
                </>
              )}
            </div>
          </div>
          <ul className={`${styles.list}`} tabIndex={1}>
            <li onClick={() => setIsMenu(false)}>
              <Link className={`${styles.navButton}`} href={"/user/settings"}>
                Настройки аккаунта
              </Link>
            </li>
            <li className={`${styles.navButton}`} onClick={handleSignOut}>
              <span>Выйти</span>
            </li>
          </ul>
        </>
      </DropDownContainer>
    </div>
  );
};

export default memo(Usermenu);
