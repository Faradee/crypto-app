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
      if (priceRef.current > crypto.priceUsd) rowRef.current.className = styles.flashRed;
      else if (priceRef.current < crypto.priceUsd) rowRef.current.className = styles.flashGreen;
      setTimeout(() => {
        rowRef.current!.className = "";
      }, 500);
    }

    priceRef.current = crypto.priceUsd;
  }, [crypto]);
  return (
    <tr ref={rowRef}>
      <td>
        <FavoriteButton id={parseInt(crypto.rank)} />
      </td>
      <td>{crypto.rank}</td>
      <td>{<Image src={getIconUrl(crypto.symbol)} width={40} height={40} alt={crypto.symbol} />}</td>
      <td>{crypto.name}</td>
      <td>${crypto.priceUsd.toFixed(2)}</td>
      <td>{crypto.changePercent24Hr.toFixed(2)}%</td>
    </tr>
  );
};

export default memo(Asset);
