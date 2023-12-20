import { getAssetData } from "@/actions/assetActions";
import { Metadata } from "next";
import styles from "./page.module.scss";
import AssetDetails from "@/components/priceTable/AssetDetails";
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | null> {
  const { id } = params;
  const data = await getAssetData(id);
  if (data) {
    return {
      title: `${data.name} (${data.symbol.toUpperCase()})`,
    };
  } else return null;
}

const CryptoData = async ({ params }: { params: { id: string } }) => {
  const getIconUrl = (symbol: string) => {
    //API возвращает IOTA а иконка хранится с идентификатором MIOTA
    if (symbol.toLowerCase() === "iota") symbol = "miota";
    return `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`;
  };
  const crypto = await getAssetData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <AssetDetails icon={getIconUrl(crypto.symbol)} crypto={crypto} />
      </div>
      <div className={styles.transactionContainer}></div>
    </div>
  );
};
export default CryptoData;
