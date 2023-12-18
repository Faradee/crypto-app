import styles from "./root.module.scss";
import PriceTable from "@/components/priceTable/PriceTable";
export type Crypto = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: number;
  changePercent24Hr: number;
};
export type CryptoData = {
  [key: string]: Crypto;
};
//TODO ADD SEARCH
export default async function Home() {
  const fetchData = async () => {
    const headers = new Headers({
      Authorization: `Bearer ${process.env.COINCAP_KEY}`,
    });
    const url = "https://api.coincap.io/v2/assets";
    const res = await fetch(url, { method: "GET", headers });
    const { data } = await res.json();
    const newData: CryptoData = {};
    data.map((crypto: any) => {
      newData[crypto.id] = {
        id: crypto.id,
        rank: crypto.rank,
        symbol: crypto.symbol,
        name: crypto.name,
        priceUsd: parseFloat(crypto.priceUsd),
        changePercent24Hr: parseFloat(crypto.changePercent24Hr),
      };
    });
    return newData;
  };
  const data = await fetchData();
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <PriceTable data={data} />
      </div>
    </main>
  );
}
