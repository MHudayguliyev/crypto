import styles from './TransactionHistory.module.scss'
import { useMatch, useSearch } from '@tanstack/react-location'
import { suggestions } from '@app/assets/json/walletSuggestions'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Button from '@app/compLibrary/Button'
import Information from '@app/components/Icons/information/icon'
import ExportUp from '@app/components/Icons/exportUp/icon'

const TransactionHistory = () => {
    const searchParams = useSearch()
    const { params } = useMatch()
    const token = suggestions.find(suggestion => suggestion.id === parseInt(params.tokenId))
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: `Send ${token?.shortName ?? "nothing"}`,
            to: 'send'
        },
    ]
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>Outgoing Transaction</div>

                <div className={styles.name}>
                    <span className={styles.icon}><ExportUp /></span>
                    <p>{searchParams?.amount} {token?.shortName}</p>
                    <span className={styles.currency}>$7,189.19</span>
                </div>

                <div className={styles.info}>
                    <div className={styles.item}>
                        <div className={styles.label}>Recipient</div>
                        <div className={styles.value}>{searchParams.recipient}</div>
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

                <Button rounded color='dark'>View On BSC</Button>
            </div>
        </>
    )
}

export default TransactionHistory
