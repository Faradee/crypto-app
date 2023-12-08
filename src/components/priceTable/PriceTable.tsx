"use client";
import styles from "./priceTable.module.scss";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import { useEffect, useState } from "react";
type cryptoData = {
  rank: string;
  symbol: string;
  name: string;
  priceUsd: number;
  changePercent24Hr: number;
};
const PriceTable = () => {
  const [data, setData] = useState<cryptoData[]>();
  const getIconUrl = (symbol: string) => {
    //API возвращает IOTA а иконка хранится с идентификатором MIOTA
    if (symbol.toLowerCase() === "iota") symbol = "miota";
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  };
  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.coincap.io/v2/assets";
      const headers = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      });
      const res = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const { data } = await res.json();
      const newData: cryptoData[] = data.map((crypto: any) => {
        return {
          rank: crypto.rank,
          symbol: crypto.symbol,
          name: crypto.name,
          priceUsd: parseFloat(crypto.priceUsd),
          changePercent24Hr: parseFloat(crypto.changePercent24Hr),
        };
      });
      setData(newData);
    };
    fetchData();
  }, []);
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
