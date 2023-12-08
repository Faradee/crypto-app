import Image from "next/image";
import styles from "./page.module.scss";
import PriceTable from "@/components/priceTable/PriceTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <PriceTable />
      </div>
    </main>
  );
}
