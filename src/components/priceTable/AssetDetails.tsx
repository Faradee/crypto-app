"use client";
import { useEffect, useState, memo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./details.module.scss";
import MarketData from "./MarketData";
import { Crypto } from "@/actions/assetActions";
import { fetchAssetHistory } from "@/actions/assetActions";
import IntervalSwitch from "./IntervalSwitch";
import Button from "../forms/Button";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
const PriceGraph = dynamic(() => import("./PriceGraph"));
const AssetDetails = ({ crypto, icon }: { crypto: Crypto; icon: string }) => {
  const currentDate = new Date();
  const pathname = usePathname();
  const formattedDate = currentDate
    .toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .slice(0, -3);
  const [range, setRange] = useState<"day" | "week" | "month" | "half-year" | "year">("day");
  const [history, setHistory] = useState<Awaited<ReturnType<typeof fetchAssetHistory>>>();
  const historyRef = useRef<typeof history>();
  const rangeRef = useRef<typeof range>();
  useEffect(() => {
    const fetchData = async () => {
      setHistory(undefined);
      const history = await fetchAssetHistory(crypto.id, range);
      setHistory(history);
      historyRef.current = history;
      rangeRef.current = range;
    };
    fetchData();
  }, [crypto.id, range]);
  return (
    <>
      <div className={styles.headContainer}>
        <div className={styles.title}>
          <div className={styles.logo}>
            <Image src={icon} alt={crypto.id} width={64} height={64} />
          </div>
          <div className={styles.column}>
            <span className={styles.name}>{`${crypto.name} (${crypto.symbol.toUpperCase()})`}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
        <MarketData marketData={history?.marketData} />
      </div>
      <div className={styles.options}>
        <IntervalSwitch range={range} setRange={setRange} />
        {pathname === "/" ? (
          <Link href={`/asset/${crypto.id}`} className={styles.buttonContainer}>
            <Button title="Создать транзакцию" />
          </Link>
        ) : (
          <div className={styles.price}>
            1 {crypto.symbol} = ${crypto.priceUsd}
          </div>
        )}
      </div>
      {historyRef.current?.historyData && rangeRef.current && (
        <PriceGraph
          range={rangeRef.current}
          history={historyRef.current.historyData}
          color={historyRef.current.marketData.change[0] === "-" ? "red" : "green"}
        />
      )}
    </>
  );
};

export default memo(AssetDetails);
