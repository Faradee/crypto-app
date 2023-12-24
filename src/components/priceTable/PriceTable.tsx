"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { CryptoData, fetchAssets } from "@/actions/assetActions";
import Asset from "./Asset";
import styles from "./priceTable.module.scss";
import Button from "../forms/Button";

const PriceTable = ({ data }: { data: CryptoData }) => {
  const [currentData, setCurrentData] = useState<CryptoData>(data);
  const priceWsRef = useRef<WebSocket | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const url = useMemo(() => {
    const assets = Object.keys(currentData).join(",");
    return `wss://ws.coincap.io/prices?assets=${assets}`;
  }, [currentData]);
  const handleActive = (index: number) => {
    if (index === activeIndex) return true;
    else return false;
  };
  const handleIndex = (index: number) => {
    if (activeIndex !== index) setActiveIndex(index);
    else setActiveIndex(undefined);
  };
  const handlePagination = async () => {
    const newData = await fetchAssets(20 * page, 20 * (page + 1));
    setCurrentData({ ...currentData, ...newData });
    setPage(page + 1);
  };
  //Из за стрикт мода первое подключение всегда будет проваливатся в development, в production должно вести себя правильно
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
      const newData: CryptoData = {};
      Object.keys(data).map((key) => {
        data[key] = parseFloat(data[key]);
        newData[key] = {
          ...currentData[key],
          priceUsd: data[key],
        };
      });

      setCurrentData({ ...currentData, ...newData });
    };
  }, [currentData]);
  return (
    <div className={styles.tableContainer}>
      <table className={styles.priceTable}>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Имя</th>
            <th>Цена</th>
            <th>Капитализация</th>
            <th>Изменение за 24 часа</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {currentData &&
            Object.keys(currentData).map((key, index) => {
              const crypto = currentData[key];
              return (
                <Asset
                  crypto={crypto}
                  key={index}
                  active={handleActive(index)}
                  onClick={() => {
                    handleIndex(index);
                  }}
                />
              );
            })}
        </tbody>
      </table>
      <div className={styles.loadButton}>
        <Button title="Загрузить еще" onClick={handlePagination} async />
      </div>
    </div>
  );
};

export default PriceTable;
