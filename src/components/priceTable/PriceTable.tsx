"use client";
import styles from "./priceTable.module.scss";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import { useEffect, useState } from "react";
type cryptoData = {
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
};
const PriceTable = () => {
  const url = "https://api.coincap.io/v2/assets";
  const [data, setData] = useState<cryptoData[]>();
  useEffect(() => {
    const fetchData = async () => {
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
          priceUsd: crypto.priceUsd,
          changePercent24Hr: crypto.changePercent24Hr,
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
                <td>
                  {
                    <Image
                      src={`https://assets.coincap.io/assets/icons/${crypto.symbol.toLowerCase()}@2x.png`}
                      width={40}
                      height={40}
                      alt={crypto.symbol}
                    />
                  }
                </td>
                <td>{crypto.name}</td>
                <td>${crypto.priceUsd}</td>
                <td>{crypto.changePercent24Hr}%</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default PriceTable;
