import PriceTable from "@/components/priceTable/PriceTable";
import { fetchAssets } from "@/actions/assetActions";
import { CryptoData, searchAsset } from "@/actions/assetActions";
//TODO ADD SEARCH
export default async function Home({ searchParams }: { searchParams: { search: string } }) {
  const data = searchParams.search ? await searchAsset(searchParams.search) : await fetchAssets();
  return <PriceTable data={data} />;
}
