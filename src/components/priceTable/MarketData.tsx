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
          <span>
            МАКС: <span className={styles.highlight}>{localeStringPrice(marketData.high)}</span>
          </span>
          <span>
            МИН: <span className={styles.highlight}>{localeStringPrice(marketData.low)}</span>
          </span>
        </div>
        <div className={styles.column}>
          <span>
            СРЕД: <span className={styles.highlight}>{localeStringPrice(marketData.average)}</span>
          </span>
          <span>
            Изменение:{" "}
            <span className={marketData.change24h[0] === "-" ? styles.decrease : styles.increase}>
              {marketData.change24h}%
            </span>
          </span>
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
