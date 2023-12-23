"use client";
import { useState } from "react";
import styles from "./dashBoardHeader.module.scss";
import Link from "next/link";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
//TODO: MAKE IT A DROPDOWN
const DashBoardHeader = ({ cryptoNames }: { cryptoNames: { cryptoId: string; cryptoName: string }[] }) => {
  const [page, setPage] = useState<number>(0);
  return (
    <div className={styles.headerContainer}>
      {cryptoNames.length >= 4 && (
        <button>
          <BiSolidLeftArrow />
        </button>
      )}

      <ul className={styles.header}>
        <li style={{ marginLeft: `${10 * page}rem` }}>
          <Link href="/transactions">Все</Link>
        </li>
        {cryptoNames &&
          cryptoNames.map((name) => {
            return (
              <li key={name.cryptoName}>
                <Link href={`/transactions/?coin=${name.cryptoId}`}>{name.cryptoName}</Link>
              </li>
            );
          })}
      </ul>
      {cryptoNames.length >= 4 && (
        <button>
          <BiSolidRightArrow />
        </button>
      )}
    </div>
  );
};
export default DashBoardHeader;
