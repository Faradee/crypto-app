import { fetchUser } from "@/actions/userActions";
import styles from "./transactions.module.scss";
import { redirect } from "next/navigation";
const Layout = async ({ children }: { children: JSX.Element }) => {
  const user = await fetchUser();
  if (user)
    return (
      <div className={styles.container}>
        <h1>Транзакции</h1>
        {children}
      </div>
    );
  else redirect("/");
};
export default Layout;
