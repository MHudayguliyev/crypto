type Token = {
    src: string
    shortName: string
    amount: number
}

interface Liquidity {
    id: string
    token1: Token,
    token2: Token
}
export default Liquidity