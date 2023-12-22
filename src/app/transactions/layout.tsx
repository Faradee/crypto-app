import DashBoardHeader from "@/components/dashboard/DashBoardHeader";
import styles from "./transactions.module.scss";
const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div>
      <div className={styles.header}>
        <DashBoardHeader />
      </div>
      {children}
    </div>
  );
};
export default Layout;
