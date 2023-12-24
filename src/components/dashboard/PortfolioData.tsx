"use client";

import { useEffect, useRef, useState } from "react";
import Slate from "../containers/Slate";
import { BuyTransactions, getBuyTransactions } from "@/actions/transactionActions";
import PortfolioWorth from "./PortfolioWorth";
import { CryptoData, fetchAssetList } from "@/actions/assetActions";

const PortfolioData = () => {
  const [investments, setInvestments] = useState<BuyTransactions>();
  const [rates, setRates] = useState<CryptoData>();
  const ratesWs = useRef<WebSocket>();
  //TODO: ADD WEBSOCKET RATE UPDATE
  useEffect(() => {
    const fetchRates = async (list: string[]) => {
      const rates = await fetchAssetList(list);
      if (rates) return rates;
    };
    const fetchData = async () => {
      const investments = await getBuyTransactions();
      console.log(investments);
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
  return (
    <>
      <PortfolioWorth investments={investments} rates={rates} />
      <Slate></Slate>
      <Slate></Slate>
      <Slate></Slate>
    </>
  );
};
export default PortfolioData;
