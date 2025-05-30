import PriceTable from "@/components/priceTable/PriceTable";
import { fetchAssets } from "@/actions/assetActions";
import { searchAsset } from "@/actions/assetActions";
export default async function Home({ searchParams }: { searchParams: { search: string } }) {
  const data = searchParams.search ? await searchAsset(searchParams.search) : await fetchAssets();
  console.log(data);
  if (data) return <PriceTable data={data} />;
  else return <h1>Сервер не отвечает</h1>;
}
