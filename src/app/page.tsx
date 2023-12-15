import styles from "./page.module.scss";
import PriceTable from "@/components/priceTable/PriceTable";
export type cryptoData = {
  rank: string;
  symbol: string;
  name: string;
  priceUsd: number;
  changePercent24Hr: number;
};
export default async function Home() {
  const fetchData = async () => {
    const url = "https://api.coincap.io/v2/assets";
    const res = await fetch(url);
    const { data } = await res.json();
    const newData: cryptoData[] = data.map((crypto: any) => {
      return {
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
