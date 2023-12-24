import { SucessfulSellTransactions } from "@/actions/transactionActions";
import Slate from "../containers/Slate";
import localeStringPrice from "../priceTable/localeStringPrice";
import styles from "./graphs.module.scss";
const TotalSales = ({ sales }: { sales: SucessfulSellTransactions }) => {
  const total = Object.keys(sales).reduce((count: number, soldCoin) => {
    return count + sales[soldCoin].cash;
  }, 0);
  return (
    <Slate>
      <div className={styles.card}>
        <h2>Объем продаж</h2>
        <div className={styles.value}>
          <span>$ {localeStringPrice(total)}</span>
        </div>
      </div>
    </Slate>
  );
};
export default TotalSales;
