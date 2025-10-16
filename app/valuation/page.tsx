import Valuation from "@/components/Valuation/Valuation"
import { getWellRate } from "@/lib/getWellRate";

export default async function Page() {

    const rate = await getWellRate();

    return<Valuation rate={rate}/>
}