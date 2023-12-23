import styles from "./transactions.module.scss";
const Layout = async ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles.container}>
      <h1>Данные о транзакциях</h1>
      {children}
    </div>
  );
};
export default Layout;
