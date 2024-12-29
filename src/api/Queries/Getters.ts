import Liquidity from "../queryReturnTypes/Liquidity"
import Pool from "../queryReturnTypes/Pool"
import { api } from "../Services/api_helpers"

export const GetLiquidities = async (): Promise<Liquidity[]> => {
    return api.get({ url: '/liquidities' })
}
export const GetPools = async (): Promise<Pool[]> => {
    return api.get({ url: '/pools' })
}
export const GetFarms = async (): Promise<Pool[]> => {
    return api.get({ url: '/farms' })
}
export const GetJungles = async (): Promise<Pool[]> => {
    return api.get({ url: '/jungles' })
}
export const GetLiquiditiy = async (id: string): Promise<Liquidity> => {
    return api.get({ url: `/liquidities/${id}` })
}
export const GetWallets = async (): Promise<{ id: string, name: string }[]> => {
    return api.get({ url: `/wallets` })
}