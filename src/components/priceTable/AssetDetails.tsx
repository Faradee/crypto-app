import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./details.module.scss";
import MarketData from "./MarketData";
import { Crypto } from "@/actions/assetActions";
import { fetchAssetHistory } from "@/actions/assetActions";
const AssetDetails = ({ crypto, icon }: { crypto: Crypto; icon: string }) => {
  const currentDate = new Date();
  const formattedDate =
    currentDate.getDate() + " " + currentDate.toLocaleString("ru", { month: "long" }) + " " + currentDate.getFullYear();
  //m1- день 1d - год
  const [interval, setInterval] = useState<string>("m1");
  const [history, setHistory] = useState<Awaited<ReturnType<typeof fetchAssetHistory>>>();
  useEffect(() => {
    const fetchData = async () => {
      const history = await fetchAssetHistory(crypto.id, interval);
      setHistory(history);
    };
    fetchData();
  }, [crypto.id, interval]);
  return (
    <tr>
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
        <div></div>
      </td>
    </tr>
  );
};

export default AssetDetails;
