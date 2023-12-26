import React, { useEffect, memo, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "./priceTable.module.scss";
import { Crypto } from "@/actions/assetActions";
import localeStringPrice from "./localeStringPrice";
import { getIconUrl } from "./getIconUrl";
import ImageFallback from "../utils/ImageFallback";
const AssetDetails = dynamic(() => import("./AssetDetails"));
const Asset = ({ crypto, active, onClick }: { crypto: Crypto; active: boolean; onClick: () => void }) => {
  const priceRef = useRef<number>();
  const rowRef = useRef<HTMLTableRowElement>(null);
  useEffect(() => {
    if (rowRef.current && priceRef.current) {
      rowRef.current.className = "";
      if (priceRef.current > crypto.priceUsd) rowRef.current.className = styles.flashRed;
      else if (priceRef.current < crypto.priceUsd) rowRef.current.className = styles.flashGreen;
      const flash = setTimeout(() => {
        rowRef.current!.className = "";
      }, 500);
      return () => clearInterval(flash);
    }
    priceRef.current = crypto.priceUsd;
  }, [crypto.priceUsd]);
  return (
    <>
      <tr ref={rowRef} onClick={onClick}>
        <td>{crypto.rank}</td>
        <td>
          <ImageFallback width={40} height={40} src={getIconUrl(crypto.symbol)} alt={crypto.symbol} />
        </td>
        <td>{crypto.name}</td>
        <td>${localeStringPrice(crypto.priceUsd)}</td>
        <td>${Math.floor(crypto.marketCap).toLocaleString()}</td>
        <td
          className={
            crypto.changePercent24Hr > 0 ? styles.increase : crypto.changePercent24Hr < 0 ? styles.decrease : ""
          }
        >
          {crypto.changePercent24Hr.toFixed(2)}%
        </td>
      </tr>
      {active && (
        <tr className={styles.detailsTr}>
          <td colSpan={6} className={styles.detailsTd}>
            <AssetDetails crypto={crypto} />
          </td>
        </tr>
      )}
    </>
  );
};

export default memo(Asset);
