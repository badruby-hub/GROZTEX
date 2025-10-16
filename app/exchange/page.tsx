import Exchange from "@/components/Exchange/Exchange";
import { getWellRate } from "@/lib/getWellRate";

export default async function Page() {
    const rate = await getWellRate();
    return <Exchange rate={rate}/>
}