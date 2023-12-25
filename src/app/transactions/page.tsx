import styles from "./transactions.module.scss";
import SalesChart from "@/components/dashboard/SalesChart";
import PortfolioData from "@/components/dashboard/PortfolioData";
import InvestmentsChart from "@/components/dashboard/InvestmentsChart";
import PortfolioHistory from "@/components/dashboard/PortfolioHistory";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = async () => {
  return (
    <div className={styles.dashboard}>
      <PortfolioData />
      <InvestmentsChart />
      <SalesChart />
      <PortfolioHistory />
    </div>
  );
};
export default Page;
