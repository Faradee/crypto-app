import DashBoardHeader from "@/components/dashboard/DashBoardHeader";
import styles from "./transactions.module.scss";
import { getUserTransactionCoins } from "@/actions/transactionActions";
const Layout = async ({ children }: { children: JSX.Element }) => {
  const cryptoNames = await getUserTransactionCoins();
  return (
    <div>
      <div className={styles.header}>{cryptoNames && <DashBoardHeader cryptoNames={cryptoNames} />}</div>
      {children}
    </div>
  );
};
export default Layout;
