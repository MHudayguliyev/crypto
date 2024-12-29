import Paper from '@app/compLibrary/Paper'
import styles from './Management.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import SizedBox from '@app/components/Sizedbox'
import { wallet_management } from '@app/assets/json/wallet_management'
import Information from '@app/components/Icons/information/icon'
import Button from '@app/compLibrary/Button'
import { useNavigate } from '@tanstack/react-location'

const Management = () => {
    const navigate = useNavigate()
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Setting Wallet',
            to: '#'
        },
        {
            label: 'Wallet Management',
            to: 'manage'
        },
    ]
    const tabs = [
        {
            name: 'Wallet',
            url: 'manage'
        },
        {
            name: 'Preferences',
            url: 'preference'
        },
        {
            name: 'About',
            url: 'about'
        }
    ]
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />


            <div className={styles.main}>
                <LinkTabs data={tabs} baseUrl='/wallet' />
                <SizedBox height={24} />

                <Paper style={{ marginBottom: '40px' }}>
                    <div className={styles.header}>
                        Wallet Management
                    </div>
                    <SizedBox height={12} />
                    <div>
                        {
                            wallet_management.map(item => (
                                <Paper className={styles.item} key={item.id} onClick={() => navigate({ to: `${item.id}` })}>
                                    <div className={styles.details}>
                                        <div className={styles.image}>
                                            <img src={item.src} />
                                        </div>
                                        <div>
                                            <div className={styles.name}>{item.name}</div>
                                            <div className={styles.address}>{item.address}</div>
                                        </div>
                                    </div>
                                    <span className={styles.icon}><Information /></span>
                                </Paper>
                            ))
                        }
                    </div>
                    <SizedBox height={24} />

                    <div className={styles.btn_group}>
                        <Button linkProps={{ to: '/wallet/create' }} rounded style={{ padding: '16px', width: '100%' }}>Create a New Wallet</Button>
                        <SizedBox height={12} />
                        <Button linkProps={{ to: '/wallet/import' }} rounded color='dark' style={{ padding: '16px', width: '100%' }}>I Already have a Wallet</Button>
                    </div>
                </Paper>

            </div>

        </>
    )
}

export default Management
