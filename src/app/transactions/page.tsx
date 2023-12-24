import styles from "./transactions.module.scss";
import SalesChart from "@/components/dashboard/SalesChart";
import PortfolioData from "@/components/dashboard/PortfolioData";
import Slate from "@/components/containers/Slate";
import InvestmentsChart from "@/components/dashboard/InvestmentsChart";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async () => {
  return (
    <div className={styles.dashboard}>
      <PortfolioData />
      <InvestmentsChart />
      <SalesChart />
    </div>
  );
};
export default Page;
