"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./dropdown.module.scss";
const DropdownList = ({ cryptoNames }: { cryptoNames?: { cryptoId: string; cryptoName: string }[] }) => {
  const [coin, setCoin] = useState<string>("all");
  const router = useRouter();
  return (
    <select
      value={coin}
      onChange={(e) => {
        setCoin(e.currentTarget.value);
        if (e.currentTarget.value === "all") router.push("/transactions");
        else router.push(`?coin=${e.currentTarget.value}`);
      }}
      className={styles.select}
    >
      <option value={"all"}>Все</option>
      {cryptoNames &&
        cryptoNames.map((coin, index) => {
          return (
            <option key={index} value={coin.cryptoId}>
              {coin.cryptoName}
            </option>
          );
        })}
    </select>
  );
};
export default DropdownList;
