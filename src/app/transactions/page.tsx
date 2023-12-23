import Slate from "@/components/containers/Slate";
import styles from "./transactions.module.scss";
import SalesChart from "@/components/dashboard/SalesChart";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async () => {
  return (
    <div className={styles.dashboard}>
      <SalesChart />
      <div className={styles.section}></div>
    </div>
  );
};
export default Page;
