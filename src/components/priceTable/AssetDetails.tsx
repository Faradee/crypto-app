import { useEffect, useState, memo } from "react";
import Image from "next/image";
import styles from "./details.module.scss";
import MarketData from "./MarketData";
import { Crypto } from "@/actions/assetActions";
import { fetchAssetHistory } from "@/actions/assetActions";
import PriceGraph from "./PriceGraph";
import IntervalSwitch from "./IntervalSwitch";
import FavoriteButton from "./FavoriteButton";
const AssetDetails = ({ crypto, icon }: { crypto: Crypto; icon: string }) => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleString("ru", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .slice(0, -3);
  const [range, setRange] = useState<"day" | "week" | "month" | "half-year" | "year">("day");
  const [history, setHistory] = useState<Awaited<ReturnType<typeof fetchAssetHistory>>>();
  useEffect(() => {
    const fetchData = async () => {
      const history = await fetchAssetHistory(crypto.id, range);
      setHistory(history);
    };
    fetchData();
  }, [crypto.id, range]);
  return (
    <tr className={styles.detailsTr}>
      <td colSpan={6}>
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
          <FavoriteButton id={crypto.id} />
        </div>
        {history?.historyData && (
          <PriceGraph
            range={range}
            history={history.historyData}
            color={history.marketData.change[0] === "-" ? "red" : "green"}
          />
        )}
      </td>
    </tr>
  );
};

export default memo(AssetDetails);
