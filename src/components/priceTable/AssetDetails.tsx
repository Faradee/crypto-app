"use client";
import { useEffect, useState, memo, useRef } from "react";
import Link from "next/link";
import styles from "./details.module.scss";
import MarketData from "./MarketData";
import { Crypto } from "@/actions/assetActions";
import { fetchAssetHistory } from "@/actions/assetActions";
import IntervalSwitch from "./IntervalSwitch";
import Button from "../forms/Button";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import GraphSkeleton from "../dashboard/GraphSkeleton";
import ImageFallback from "../utils/ImageFallback";
import { getIconUrl } from "./getIconUrl";

const PriceGraph = dynamic(() => import("./PriceGraph"));
const AssetDetails = ({ crypto }: { crypto: Crypto }) => {
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
  const [loading, setLoading] = useState<boolean>(true);
  const historyRef = useRef<typeof history>();
  const rangeRef = useRef<typeof range>();
  useEffect(() => {
    const fetchData = async () => {
      setHistory(undefined);
      const history = await fetchAssetHistory(crypto.id, range);
      setHistory(history);
      historyRef.current = history;
      rangeRef.current = range;
      setLoading(false);
    };
    fetchData();
  }, [crypto.id, range]);
  if (!loading && history?.historyData.length)
    return (
      <>
        <div className={styles.headContainer}>
          <div className={styles.title}>
            <div className={styles.logo}>
              <ImageFallback width={64} height={64} src={getIconUrl(crypto.symbol)} alt={crypto.symbol} />
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
  else if (loading) return <GraphSkeleton />;
  else return <div>Нету данных</div>;
};

export default memo(AssetDetails);
