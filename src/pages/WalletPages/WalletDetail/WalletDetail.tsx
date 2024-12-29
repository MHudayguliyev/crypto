import { useMatch, useNavigate } from '@tanstack/react-location'
import { suggestions } from '@app/assets/json/walletSuggestions'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import styles from './WalletDetail.module.scss'
import classNames from 'classnames/bind'
import Button from '@app/compLibrary/Button'
import Send from '@app/components/Icons/send/icon'
import Receive from '@app/components/Icons/receive/icon'
import Buy from '@app/components/Icons/buy/icon'
import { transaction_history } from '@app/assets/json/transaction_history'

const cx = classNames.bind(styles)
const WalletDetail = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const wallet = suggestions.find(suggestion => suggestion.id === parseInt(match.params?.id))

    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: wallet?.label as string,
            to: 'import'
        },
    ]
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />
            <div className={styles.main}>
                <div className={styles.box}>
                    <div className={styles.content}>
                        <div className={styles.left}>
                            <div className={styles.thumbnail}>
                                <img src={wallet?.src} />
                            </div>
                            <div className={styles.currency}>
                                <div className={styles.amount}>{wallet?.amount} <span>{wallet?.shortName}</span></div>
                                <div className={styles.benefit}>${wallet?.currency} <span> {wallet?.benefit}</span></div>
                            </div>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.top}>
                                <Button rounded color='dark' startIcon={<Send />} onClick={() => navigate({ to: `/wallet/send/${wallet?.id}/${wallet?.value}` })}>Sent</Button>
                                <Button rounded color='dark' startIcon={<Receive />}>Receive</Button>
                            </div>
                            <Button rounded color='dark' startIcon={<Buy />} onClick={() => navigate({ to: '/wallet/buy' })}>Buy</Button>
                        </div>
                    </div>
                </div>

                <div className={styles.transaction_history}>
                    <div className={styles.header}>Transaction History</div>
                    <div className={styles.list}>
                        {
                            transaction_history.map((item, index) => (
                                <div className={styles.history} key={index}>
                                    <div className={styles.date}>{item.date}</div>
                                    <div className={styles.bottom}>
                                        <div className={styles.left}>
                                            <div className={styles.thumbnail}>
                                                <img src={item.src} />
                                            </div>
                                            <div>
                                                <div className={styles.status_text}>{item.statusText}</div>
                                                <div className={cx({
                                                    status: true,
                                                    [`status${item.status}`]: true
                                                })}>{item.status}</div>
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            <div className={styles.amount}>{item.amount}</div>
                                            <div className={styles.currency}>${item.currency}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default WalletDetail
