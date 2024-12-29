import React from 'react'
import styles from './Detail.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { wallet_management } from '@app/assets/json/wallet_management'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import Paper from '@app/compLibrary/Paper'
import Button from '@app/compLibrary/Button'
import ArrowRight from '@app/components/Icons/arrowRight/icon'
import ChecklistShield from '@app/components/Icons/checklistShield/icon'
import Copy from '@app/components/Icons/copy/icon'
import toast from 'react-hot-toast'
const ManagementDetail = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const currentWallet = wallet_management.find(item => item.id === parseInt(match.params?.id))

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
            to: 'wallet/manage'
        },
        {
            label: currentWallet?.name ?? "???",
            to: `wallet/manage/${currentWallet?.id}`
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

    const copyFN = async () => {
        try {
            if (navigator) {
                await navigator.clipboard.writeText(currentWallet?.address as string).then(() => toast.success('Copied'))
            }
        } catch (error) {
            console.log('error to copy')
        }
    }
    return (
        <>
            {
                currentWallet ?
                    <>
                        <Breadcrumb data={breadCrumbData} />
                        <SizedBox height={12} />

                        <div className={styles.main}>
                            <LinkTabs data={tabs} baseUrl='/wallet' />
                            <SizedBox height={24} />

                            <Paper>
                                <div className={styles.header}>
                                    {currentWallet.name}
                                </div>
                                <SizedBox height={12} />
                                <Paper className={styles.field}>
                                    <div>
                                        <span className={styles.name}>Name</span>
                                        <div className={styles.walletname}>{currentWallet.name}</div>
                                    </div>
                                </Paper>

                                <SizedBox height={12} />
                                <div className={styles.backup__options}>
                                    <div className={styles.minHeader}>Backup Options</div>
                                    <Paper className={styles.field} onClick={() => navigate({ to: 'rf-warning' })}>
                                        <div className={styles.content}>
                                            <span className={styles.icon}><ChecklistShield /></span>
                                            <label>Show Recovery Phrase</label>
                                        </div>
                                        <span className={styles.icon}><ArrowRight /></span>
                                    </Paper>
                                    <p className={styles.paragraph}>If you lose access to this device, your funds will be lost, unless you back up!</p>
                                </div>
                                <SizedBox height={8} />
                                <Paper className={styles.field} onClick={copyFN}>
                                    <div className={styles.content}>
                                        <span className={styles.icon}><Copy /></span>
                                        <label>Copy Address</label>
                                    </div>
                                    <span>{currentWallet.address}</span>
                                </Paper>
                                <SizedBox height={24} />

                                <Button rounded color='dark' style={{ padding: '16px', width: '100%' }}>Save</Button>

                            </Paper>
                        </div>

                    </> : "No wallet like this found in database"
            }
        </>
    )
}

export default ManagementDetail
