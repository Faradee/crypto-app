import React, { useEffect, memo, useRef } from "react";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import styles from "./priceTable.module.scss";
import { crypto } from "@/app/page";
const Asset = ({ crypto }: { crypto: crypto }) => {
  const priceRef = useRef<number>();
  const rowRef = useRef<HTMLTableRowElement>(null);
  const getIconUrl = (symbol: string) => {
    //API возвращает IOTA а иконка хранится с идентификатором MIOTA
    if (symbol.toLowerCase() === "iota") symbol = "miota";
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  };
  useEffect(() => {
    if (rowRef.current && priceRef.current) {
      rowRef.current.className = "";
      if (priceRef.current > crypto.priceUsd) rowRef.current.className = styles.flashRed;
      else if (priceRef.current < crypto.priceUsd) rowRef.current.className = styles.flashGreen;
      const flash = setTimeout(() => {
        rowRef.current!.className = "";
      }, 500);
      return () => clearInterval(flash);
    }
    priceRef.current = crypto.priceUsd;
  }, [crypto.priceUsd]);
  return (
    <tr ref={rowRef}>
      <td>
        <FavoriteButton id={parseInt(crypto.rank)} />
      </td>
      <td>{crypto.rank}</td>
      <td>{<Image src={getIconUrl(crypto.symbol)} width={40} height={40} alt={crypto.symbol} />}</td>
      <td>{crypto.name}</td>
      <td>${crypto.priceUsd.toFixed(2)}</td>
      <td
        className={crypto.changePercent24Hr > 0 ? styles.increase : crypto.changePercent24Hr < 0 ? styles.decrease : ""}
      >
        {crypto.changePercent24Hr.toFixed(2)}%
      </td>
    </tr>
  );
};

export default memo(Asset);
