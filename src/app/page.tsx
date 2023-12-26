import PriceTable from "@/components/priceTable/PriceTable";
import { fetchAssets } from "@/actions/assetActions";
import { searchAsset } from "@/actions/assetActions";
export default async function Home({ searchParams }: { searchParams: { search: string } }) {
  const data = searchParams.search ? await searchAsset(searchParams.search) : await fetchAssets();
  return <PriceTable data={data} />;
}
