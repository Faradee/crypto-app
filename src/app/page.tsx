import styles from "./root.module.scss";
import PriceTable from "@/components/priceTable/PriceTable";
import { fetchAssets } from "@/actions/assetActions";
//TODO ADD SEARCH
export default async function Home() {
  const data = await fetchAssets();
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <PriceTable data={data} />
      </div>
    </main>
  );
}
