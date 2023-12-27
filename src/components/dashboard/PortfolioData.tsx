"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Slate from "../containers/Slate";
import {
  BuyTransactions,
  SellTotalTransactions,
  getBuyTransactions,
  getTotalSellTransactions,
} from "@/actions/transactionActions";
import PortfolioWorth from "./PortfolioWorth";
import { CryptoData, fetchAssetList } from "@/actions/assetActions";
import FieldSkeleton from "./FieldSkeleton";
import TotalSales from "./TotalSales";
import BiggestWorth from "./BiggestWorth";
import styles from "./graphs.module.scss";
const PortfolioData = () => {
  const [investments, setInvestments] = useState<BuyTransactions>();
  const [rates, setRates] = useState<CryptoData>({});
  const [totalSales, setTotalSales] = useState<SellTotalTransactions>({});
  const [loading, setLoading] = useState<boolean>(true);
  const symbolMap = useMemo(() => {
    const map: { [key: string]: string } | undefined | false = {};
    if (investments)
      investments.filter((investment) => {
        map[investment.cryptoName] = investment.cryptoSymbol;
      });
    return map;
  }, [investments]);
  const ratesWsRef = useRef<WebSocket | null>(null);
  const url = useMemo(() => {
    const assets = Object.keys(rates).join(",");
    return `wss://ws.coincap.io/prices?assets=${assets}`;
  }, [rates]);
  useEffect(() => {
    const fetchData = async () => {
      const totalSales = await getTotalSellTransactions();
      if (totalSales) setTotalSales(totalSales);
      setLoading(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchRates = async (list: string[]) => {
      const rates = await fetchAssetList(list);
      if (rates) return rates;
    };
    const fetchData = async () => {
      const investments = await getBuyTransactions();
      if (investments) {
        const assetList = investments.map((investment) => {
          return investment.cryptoId;
        });
        const rates = await fetchRates(assetList);
        if (rates) setRates(rates);
      }
      setInvestments(investments);
    };
    fetchData();
  }, []);
  useEffect(() => {
    ratesWsRef.current = new WebSocket(url);
    ratesWsRef.current.onopen = () => {
      console.log("Opening new Websocket connection");
    };
    ratesWsRef.current.onclose = () => {
      console.log("Closing Websocket connection");
    };
    ratesWsRef.current.onerror = () => {
      console.log("Connection with the server has failed");
    };
    const wsCurrent = ratesWsRef.current;
    return () => {
      wsCurrent.close();
    };
  }, [url]);
  useEffect(() => {
    if (ratesWsRef.current && rates)
      ratesWsRef.current.onmessage = (message) => {
        const data = JSON.parse(message.data);
        const newData: CryptoData = {};
        Object.keys(data).map((key) => {
          data[key] = parseFloat(data[key]);
          newData[key] = {
            ...rates[key],
            priceUsd: data[key],
          };
        });
        setRates({ ...rates, ...newData });
      };
  }, [rates]);
  console.log(totalSales);
  return (
    <>
      {investments && rates ? <PortfolioWorth investments={investments} rates={rates} /> : <FieldSkeleton />}
      {totalSales && Object.keys(totalSales).length ? (
        <TotalSales sales={totalSales} />
      ) : loading ? (
        <FieldSkeleton />
      ) : (
        <Slate>
          <div className={styles.card}>
            <h2>Объем продаж токенов</h2>
            <div className={styles.value}>
              <span>Список продаж пуст</span>
            </div>
          </div>
        </Slate>
      )}
      {symbolMap && totalSales && Object.keys(totalSales).length ? (
        <BiggestWorth symbolMap={symbolMap} sales={totalSales} />
      ) : loading ? (
        <FieldSkeleton />
      ) : (
        <Slate>
          <div className={styles.card}>
            <h2>Наиболее проданный токен</h2>
            <div className={styles.value}>
              <span>Список продаж пуст</span>
            </div>
          </div>
        </Slate>
      )}
    </>
  );
};
export default PortfolioData;
