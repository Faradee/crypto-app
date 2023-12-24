"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Slate from "../containers/Slate";
import { BuyTransactions, getBuyTransactions } from "@/actions/transactionActions";
import PortfolioWorth from "./PortfolioWorth";
import { CryptoData, fetchAssetList } from "@/actions/assetActions";
import FieldSkeleton from "./FieldSkeleton";

const PortfolioData = () => {
  const [investments, setInvestments] = useState<BuyTransactions>();
  const [rates, setRates] = useState<CryptoData>({});
  const ratesWsRef = useRef<WebSocket | null>(null);
  const url = useMemo(() => {
    const assets = Object.keys(rates).join(",");
    return `wss://ws.coincap.io/prices?assets=${assets}`;
  }, [rates]);
  //TODO: ADD WEBSOCKET RATE UPDATE
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
  return (
    <>
      {investments && rates ? <PortfolioWorth investments={investments} rates={rates} /> : <FieldSkeleton />}

      <Slate></Slate>
      <Slate></Slate>
      <Slate></Slate>
      <Slate></Slate>
      <Slate></Slate>
    </>
  );
};
export default PortfolioData;
