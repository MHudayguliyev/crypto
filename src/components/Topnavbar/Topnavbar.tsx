import Button from '@app/compLibrary/Button'
import Bell from '../Icons/bell/icon'
import Facebook from '../Icons/facebook/icon'
import Reddit from '../Icons/reddit/icon'
import Telegram from '../Icons/telegram/icon'
import Youtube from '../Icons/youtube/icon'
import styles from './Topnavbar.module.scss'
import Moon from '../Icons/moon/icon'
import { useMemo, useState } from 'react'
import ConnectToWallet from '../Modals/ConnectToWallet/ConnectToWallet'
import { useQuery } from '@tanstack/react-query'
import { GetWallets } from '@app/api/Queries/Getters'
import TopAvatar from '../Icons/topAvatar/icon'
import en from '@app/assets/images/flags/en.png'

const Topnavbar = () => {
    // const [isOpen, setIsOpen] = useState<boolean>(false)
    const {
        data
    } = useQuery({
        queryKey: ['wallets'],
        queryFn: () => GetWallets()
    })
    const wallet = useMemo(() => {
        return data ? data[0] : ''
    }, [data])

    return (
        <>
            {/* <ConnectToWallet open={isOpen} close={() => setIsOpen(false)} /> */}

            <div className={styles.topnavbar}>
                <div className={styles.content}>
                    <div className={styles.the_left}>
                        <a href='/'><span><Telegram /></span></a>
                        <a href='/'><span><Facebook /></span></a>
                        <a href='/'><span><Reddit /></span></a>
                        <a href='/'><span><Youtube /></span></a>
                    </div>

                    <div className={styles.the_right}>
                        <span className={styles.bell}>
                            {wallet && <span className={styles.notification_number}>3</span>}
                            <Bell />
                        </span>
                        <Button style={{ padding: '8px 16px' }} endIcon={wallet ? <TopAvatar /> : undefined} rounded linkProps={{ to: `/wallet/connect` }} color={wallet ? 'dark' : 'theme'}>
                            {
                                wallet ? wallet.id : 'Connect Wallet'
                            }
                        </Button>
                        <span className={styles.divider} />
                        <Button style={{ padding: '8px 16px' }} rounded color='dark'><span><Moon /></span></Button>
                        <div className={styles.image}>
                            <img src={en} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Topnavbar
