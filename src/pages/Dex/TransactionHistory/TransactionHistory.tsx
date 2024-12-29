import { suggestions } from '@app/assets/json/walletSuggestions'
import Button from '@app/compLibrary/Button'
import Container from '@app/compLibrary/Container/Container'
import { useSearch } from '@tanstack/react-location'
import React from 'react'
import styles from './TransactionHistory.module.scss'
import contract from '@app/assets/images/contract.png'
import Information from '@app/components/Icons/information/icon'

const DexTransactionHistory = () => {
    const searchParams = useSearch()
    const token = suggestions.find(suggestion => suggestion.id === parseInt(searchParams?.tokenId))
    console.log('token', token)
    return (
        <>
            <Container className={styles.container}>
                <div className={styles.header}>Outgoing Transaction</div>

                <div className={styles.name}>
                    <div className={styles.image}>
                        <img src={contract} />
                    </div>
                    <p>{searchParams?.amount} {token?.shortName}</p>
                    <span className={styles.currency}>$7,189.19</span>
                </div>

                <div className={styles.info}>
                    <div className={styles.item}>
                        <div className={styles.label}>Recipient</div>
                        <div className={styles.value}>0xBAD7F7e29Dd829F40B59cB9815719Fa632FfE116</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}><span className={styles.icon}><Information /></span>Network Fee</div>
                        <div className={styles.value}>0.0000105 {token?.shortName} ($0.03)</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Transaction time</div>
                        <div className={styles.value}>{searchParams.date}</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Nonce</div>
                        <div className={styles.value}>{parseInt(searchParams.amount) - 1}</div>
                    </div>
                </div>

                <Button style={{ marginBottom: '40px' }} rounded color='dark'>View On BSC</Button>
            </Container>
        </>
    )
}

export default DexTransactionHistory
