interface Pool {
    id: string,
    apr: string,
    deposit_fee: number,
    harvert_lockup: string,
    shortName: string
    sources: Array<string>
    lp_type: string
    approved_amount: number,
    am_earned: number
    your_staked?: number
    approved: boolean
    deposited?: boolean,
    deposited_amount?: number,
    details: {
        deposit: string,
        total_liquidity: string,
        lp_worth: string
        end?: string
    }
}
export default Pool