export type Ipo = {
    id: number
    name: string,
    short_name: string,
    description: string
    launch_time: string
    for_sale: string
    to_raise: string
    total_raised: string
    start_block: number,
    status: "open-limited" | 'open' | 'ended' | string
}