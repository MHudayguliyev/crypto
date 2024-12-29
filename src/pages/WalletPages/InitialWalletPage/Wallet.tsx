import styles from './Wallet.module.scss'
import Button from '@app/compLibrary/Button'

const InitialWalletPage = () => {
    return (
        <>
            <div className={styles.main}>
                <div className={styles.top}>
                    <div className={styles.name}>Welcome To Amando Wallet</div>
                    <p>Secure and trusted multi-chain crypto wallet</p>
                </div>

                <div className={styles.bottom}>
                    <Button rounded linkProps={{ to: 'create' }}>Create A Wallet</Button>
                    <Button rounded color='dark' linkProps={{ to: 'import' }}>I Already Have a Wallet</Button>
                </div>
            </div>
        </>
    )
}

export default InitialWalletPage
