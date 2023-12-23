import styles from "./transactions.module.scss";
import { getUserTransactionCoins } from "@/actions/transactionActions";
import DropdownList from "@/components/dashboard/DropdownList";
const Layout = async ({ children }: { children: JSX.Element }) => {
  const cryptoNames = await getUserTransactionCoins();
  return (
    <div className={styles.container}>
      <DropdownList cryptoNames={cryptoNames} />
      {children}
    </div>
  );
};
export default Layout;
