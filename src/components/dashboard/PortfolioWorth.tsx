import { BuyTransactions } from "@/actions/transactionActions";
import Slate from "../containers/Slate";
import { Rates } from "@/actions/assetActions";
import FieldSkeleton from "./FieldSkeleton";
import styles from "./graphs.module.scss";
import localeStringPrice from "../priceTable/localeStringPrice";
//TODO: add swebsocket update
const PortfolioWorth = ({ investments, rates }: { investments?: BuyTransactions; rates?: Rates }) => {
  if (investments && rates) {
    const worth = investments.reduce(
      (previousValue: number, investment) => previousValue + investment.amount * rates[investment.cryptoId].priceUsd,
      0
    );
    return (
      <Slate>
        <h2>Стоимость портфолио</h2>
        <span className={styles.worth}>$ {localeStringPrice(worth)}</span>
      </Slate>
    );
  } else return <FieldSkeleton />;
};
export default PortfolioWorth;
