import styles from "./details.module.scss";
import localeStringPrice from "./localeStringPrice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const MarketData = ({
  marketData,
}: {
  marketData?: { high: number; low: number; average: number; change24h: string };
}) => {
  if (marketData)
    return (
      <div className={styles.details}>
        <div className={styles.column}>
          <span>МАКС: {localeStringPrice(marketData.high)}</span>
          <span>МИН: {localeStringPrice(marketData.low)}</span>
        </div>
        <div className={styles.column}>
          <span>СРЕД: {localeStringPrice(marketData.average)}</span>
          <span>Изменение: {marketData.change24h}%</span>
        </div>
      </div>
    );
  else
    return (
      <div className={styles.details}>
        <Skeleton containerClassName={styles.column} width={"100%"} count={2} />
        <Skeleton containerClassName={styles.column} width={"100%"} count={2} />
      </div>
    );
};

export default MarketData;
