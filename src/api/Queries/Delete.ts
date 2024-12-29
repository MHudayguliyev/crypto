import Liquidity from "../queryReturnTypes/Liquidity";
import { api } from "../Services/api_helpers";

export const removeLiquidity = async (id: string): Promise<Liquidity> => {
    return api.delete({
        url: `/liquidities/${id}`
    })
}