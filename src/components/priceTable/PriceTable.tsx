"use client";
import styles from "./priceTable.module.scss";
import { useState, useEffect, useRef, useMemo } from "react";
import { cryptoData } from "@/app/page";
import Asset from "./Asset";
const PriceTable = ({ data }: { data: cryptoData }) => {
  const [currentData, setCurrentData] = useState<cryptoData>(data);
  const priceWsRef = useRef<WebSocket | null>(null);

  const url = useMemo(() => {
    const assets = Object.keys(currentData).join(",");
    return `wss://ws.coincap.io/prices?assets=${assets}`;
  }, [currentData]);
  //TODO: CONFIRM CORRECT WEBSOCKET CONNECTION BEHAVIOR IN PRODUCTION
  useEffect(() => {
    priceWsRef.current = new WebSocket(url);
    priceWsRef.current.onopen = () => {
      console.log("Opening new Websocket connection");
    };
    priceWsRef.current.onclose = () => {
      console.log("Closing Websocket connection");
    };
    priceWsRef.current.onerror = () => {
      console.log("Connection with the server has failed");
    };
    const wsCurrent = priceWsRef.current;
    return () => {
      wsCurrent.close();
    };
  }, [url]);
  useEffect(() => {
    if (!priceWsRef.current) return;
    priceWsRef.current.onmessage = (message) => {
      const data = JSON.parse(message.data);
      const newData: cryptoData = {};
      //TODO: ADD MATHEMATIC CHANGE TO CHANGE IN 24H
      Object.keys(data).map((key) => {
        data[key] = parseFloat(data[key]);
        newData[key] = {
          ...currentData[key],
          priceUsd: data[key],
          changePercent24Hr: currentData[key].changePercent24Hr * (data[key] / currentData[key].priceUsd),
        };
      });

      setCurrentData({ ...currentData, ...newData });
    };
  }, [currentData]);
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
        {currentData &&
          Object.keys(currentData).map((key, index) => {
            const crypto = currentData[key];
            return <Asset crypto={crypto} key={index} />;
          })}
      </tbody>
    </table>
  );
};

export default PriceTable;
