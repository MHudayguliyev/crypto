import React from 'react'
import styles from './Table.module.scss'
import { useNavigate } from '@tanstack/react-location'

interface TableProps {
    header: {
        label: string
    }[]
    body: {
        id: number
        src: string
        shortName: string
        value: string
        currency: string
        benefit: string
        amount: string
        price: string
    }[]
}
const Table = (props: TableProps) => {
    const navigate = useNavigate()
    const {
        header,
        body
    } = props

    const redirectTo = (event: any, type: 'send' | 'buy' | 'receive', id?: number, value?: string) => {
        event.stopPropagation()
        if (type === 'buy') navigate({ to: '/wallet/buy' })
        else if (type === 'send') navigate({ to: `/wallet/send/${id}/${value}` })
    }

    return (
        <div className={styles.table_wrapper}>
            <div className={styles.table_header}>
                {
                    header.map((item, index) => (
                        <div className={styles.head_col} key={index}>
                            {item.label}
                        </div>
                    ))
                }
            </div>
            <div className={styles.table_body}>
                {
                    body.map(item => (
                        <div className={styles.box} key={item.value} onClick={() => navigate({ to: `/wallet/detail/${item.id}/${item.value}` })}>
                            <div className={styles.row}>
                                <div className={`${styles.list_col} ${styles.currency_col}`}>
                                    <div className={styles.flag}>
                                        <img src={item.src} />
                                    </div>
                                    <div className={styles.currency}>
                                        <div className={styles.wallet_name}>{item.shortName}</div>
                                        <div className={styles.benefit}>${item.currency} <span> {item.benefit}</span></div>
                                    </div>
                                </div>
                                <div className={`${styles.list_col} ${styles.amount_col}`}>
                                    {item.amount}
                                </div>
                                <div className={`${styles.list_col} ${styles.price_col}`}>
                                    {item.price}
                                </div>
                                <div className={`${styles.list_col} ${styles.actions_col}`}>
                                    <span onClick={(e) => redirectTo(e, 'send', item.id, item.value)}>Send</span>
                                    <span>Receive</span>
                                    <span onClick={(e) => redirectTo(e, 'buy')}>Buy</span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default Table
