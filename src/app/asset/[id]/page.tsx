import { getAssetData } from "@/actions/assetActions";
import { Metadata } from "next";
import styles from "./page.module.scss";
import AssetDetails from "@/components/priceTable/AssetDetails";
import TransactionWindow from "@/components/transactionWindow/TransactionWindow";

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
  const crypto = await getAssetData(params.id);
  return (
    <div className={styles.container}>
      <div className={styles.detailsContainer}>
        <AssetDetails crypto={crypto} />
      </div>
      <div className={styles.transactionContainer}>
        <TransactionWindow crypto={crypto} />
      </div>
    </div>
  );
};
export default CryptoData;
