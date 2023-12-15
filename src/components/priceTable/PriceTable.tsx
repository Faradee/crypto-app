"use client";
import styles from "./priceTable.module.scss";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import { useState } from "react";
import { cryptoData } from "@/app/page";
const PriceTable = ({ data }: { data: cryptoData[] }) => {
  const getIconUrl = (symbol: string) => {
    //API возвращает IOTA а иконка хранится с идентификатором MIOTA
    if (symbol.toLowerCase() === "iota") symbol = "miota";
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  };
  return (
    <table className={styles.priceTable}>
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th></th>
          <th>Имя</th>
          <th>Цена</th>
          <th>Изменение за 24 часа</th>
          <th>График</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((crypto, index) => {
            return (
              <tr key={index}>
                <td>
                  <FavoriteButton id={index} />
                </td>
                <td>{crypto.rank}</td>
                <td>{<Image src={getIconUrl(crypto.symbol)} width={40} height={40} alt={crypto.symbol} />}</td>
                <td>{crypto.name}</td>
                <td>${crypto.priceUsd.toFixed(2)}</td>
                <td>{crypto.changePercent24Hr.toFixed(2)}%</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PriceTable;
