import Modal from '@app/compLibrary/Modal'
import CommonModalTypes from '../CommonModalI'
import styles from './ConnectToWallet.module.scss'
import CloseSm from '@app/components/Icons/closeSm/icon'
import { wallets } from '@app/assets/json/wallets'
import { useNavigate } from '@tanstack/react-location'

const ConnectToWallet = (props: CommonModalTypes) => {
    const {
        open,
        close
    } = props
    const navigate = useNavigate()
    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.connectToWalletmodal}
            >
                <div className={styles.header}>
                    <div className={styles.head}>Connect to a wallet</div>
                    <span onClick={close}><CloseSm /></span>
                </div>

                <div className={styles.wallets}>
                    {
                        wallets.map(wallet => (
                            <div onClick={() => {
                                navigate({ to: `/create-wallet/${wallet.id}` })
                                close()
                            }} key={wallet.id} className={styles.wallet}>
                                <div className={styles.image}>
                                    <img src={wallet.src} />
                                </div>
                                <div className={styles.wallet_name}>{wallet.name}</div>
                            </div>
                        ))
                    }
                </div>
            </Modal>
        </>
    )
}

export default ConnectToWallet
