import { getAssetData } from "@/actions/assetActions";
import { Metadata } from "next";
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata | null> {
  const { id } = params;
  const data = await getAssetData(id);

  if (data) {
    return {
      title: `${data.name} (${data.symbol.toUpperCase()})`,
    };
  } else return null;
}
const page = ({ params }: { params: { id: string } }) => {
  return <div>page</div>;
};
export default page;
