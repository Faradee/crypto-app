import styles from "./transactions.module.scss";
import SalesChart from "@/components/dashboard/SalesChart";
import PortfolioData from "@/components/dashboard/PortfolioData";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async () => {
  return (
    <div className={styles.dashboard}>
      <SalesChart />
      <div className={styles.section}>
        <PortfolioData />
      </div>
    </div>
  );
};
export default Page;
