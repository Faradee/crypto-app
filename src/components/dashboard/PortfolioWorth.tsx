import { BuyTransactions } from "@/actions/transactionActions";
import Slate from "../containers/Slate";
import { Rates } from "@/actions/assetActions";
import FieldSkeleton from "./FieldSkeleton";
import styles from "./graphs.module.scss";
import localeStringPrice from "../priceTable/localeStringPrice";
import { useEffect, useRef } from "react";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
//TODO: add swebsocket update
const PortfolioWorth = ({
  investments,
  rates,
}: {
  investments: Exclude<BuyTransactions, false>;
  rates: Exclude<Rates, false>;
}) => {
  const worthRef = useRef<number>();
  const worth = investments.reduce(
    (previousValue: number, investment) => previousValue + investment.amount * rates[investment.cryptoId].priceUsd,
    0
  );
  useEffect(() => {
    worthRef.current = worth;
  }, [worth]);
  return (
    <Slate>
      <div className={styles.card}>
        <h2>Стоимость купленных токенов</h2>
        <div className={styles.value}>
          <span>$ {localeStringPrice(worth)}</span>
          {worthRef.current && worthRef.current < worth ? (
            <VscTriangleUp size={32} color="green" />
          ) : (
            <VscTriangleDown size={32} color="red" />
          )}
        </div>
      </div>
    </Slate>
  );
};
export default PortfolioWorth;
