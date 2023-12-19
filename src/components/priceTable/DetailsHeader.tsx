import styles from "./details.module.scss";
import DetailsSkeleton from "./DetailsSkeleton";
import localeStringPrice from "./localeStringPrice";
const DetailsHeader = ({
  marketData,
}: {
  marketData?: { high: number; low: number; average: number; change24h: number };
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
          <span>Изменение за 24 часа: {localeStringPrice(marketData.change24h)}%</span>
        </div>
      </div>
    );
  else return <DetailsSkeleton />;
};

export default DetailsHeader;
