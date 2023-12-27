import { SucessfulSellTotalTransactions } from "@/actions/transactionActions";
import { memo } from "react";
import Slate from "../containers/Slate";
import styles from "./graphs.module.scss";
import localeStringPrice from "../priceTable/localeStringPrice";
import Image from "next/image";
import { getIconUrl } from "../priceTable/getIconUrl";
import ImageFallback from "../utils/ImageFallback";
const BiggestWorth = ({ sales, symbolMap }: { sales: SucessfulSellTotalTransactions; symbolMap: any }) => {
  let biggest: { cash: number; coin: string } = { cash: 0, coin: "none" };
  Object.keys(sales).forEach((sale) => {
    if (biggest.cash < sales[sale].cash) {
      biggest.cash = sales[sale].cash;
      biggest.coin = sale;
    }
  });
  return (
    <Slate>
      <div className={styles.card}>
        <h2>Наиболее проданный токен</h2>
        <div className={styles.value}>
          <span>
            {symbolMap[biggest.coin] && (
              <ImageFallback
                src={getIconUrl(symbolMap[biggest.coin])}
                width={30}
                height={30}
                alt={`${symbolMap[biggest.coin]} icon`}
              />
            )}
            {symbolMap[biggest.coin]}: $ {localeStringPrice(biggest.cash)}{" "}
          </span>
        </div>
      </div>
    </Slate>
  );
};
export default memo(BiggestWorth);
