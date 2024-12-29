import Liquidity from "../queryReturnTypes/Liquidity"
import Pool from "../queryReturnTypes/Pool"
import { api } from "../Services/api_helpers"

export const addLiquidity = async (data: Liquidity): Promise<Liquidity> => {
    return api.post({
        url: '/liquidities',
        data
    })
}
export const updateAmount = async (data: Pool, jsonType: 'farms' | 'pools'): Promise<Pool> => {
    return api.update({
        url: `/${jsonType}/${data.id}`,
        data
    })
}
export const updateJungleApproval = async (data: Pool): Promise<Pool> => {
    return api.update({
        url: `/jungles/${data.id}`,
        data
    })
}
export const updateJungleDepositAmount = async (data: Pool): Promise<Pool> => {
    return api.update({
        url: `/jungles/${data.id}`,
        data
    })
}
export const unstakeAmount = async (data: Pool): Promise<Pool> => {
    return api.update({
        url: `/jungles/${data.id}`,
        data
    })
}
export const importNewWallet = async (data: { id: string, name: string }): Promise<{ id: string, name: string }> => {
    return api.post({
        url: '/wallets',
        data
    })
}