import React, { useState } from 'react'
import styles from './RecoverPhraser.module.scss'
import { wallet_management } from '@app/assets/json/wallet_management'
import { useMatch, useNavigate } from '@tanstack/react-location'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import Paper from '@app/compLibrary/Paper'
import Tabs from '@app/components/Tabs/Tabs'
import Row from '@app/compLibrary/Grid/Row'
import { seeds } from '@app/assets/json/seeds'
import Col from '@app/compLibrary/Grid/Col'
import Seed from '@app/components/Seed/Seed'
import Button from '@app/compLibrary/Button'
import Copy from '@app/components/Icons/copy/icon'
import Warning from '@app/components/Icons/warning/icon'

import qrcode from '@app/assets/images/code.png'

const RecoverPhraser = () => {
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
        {
            label: "Recovery Phrase",
            to: `wallet/manage/${currentWallet?.id}/rf-warning`
        },
        {
            label: "Your Recovery Phrase",
            to: `wallet/manage/${currentWallet?.id}/rf-warning/rf`
        },
    ]
    const tabs = [
        {
            label: "Text",
            value: 'text'
        },
        {
            label: "QR Code",
            value: 'code'
        }
    ]
    const linkTabs = [
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
    const [activeTab, setActiveTab] = useState({ label: "", value: "" })
    return (
        <>
            {
                currentWallet ?
                    <>
                        <Breadcrumb data={breadCrumbData} />
                        <SizedBox height={24} />
                        <div className={styles.main}>
                            <LinkTabs data={linkTabs} baseUrl='/wallet' />
                            <SizedBox height={24} />

                            <Paper>
                                <div className={styles.header}>
                                    Recovery Phrase
                                </div>
                                <SizedBox height={24} />

                                <Tabs className={styles.tabs} grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }} data={tabs} active={activeTab} onChange={(value) => setActiveTab(value)} />
                                <SizedBox height={24} />

                                <div className={styles.row}>
                                    {
                                        activeTab.value === "text" ?
                                            <Row colGutter={8}
                                                rowGutter={8}>
                                                {
                                                    seeds.map(seed => (
                                                        <Col grid={{ xxlg: 3, xlg: 3, md: 4, sm: 6 }} key={seed.value}>
                                                            <Seed
                                                                label={seed.label}
                                                                value={seed.value}
                                                            />
                                                        </Col>
                                                    ))
                                                }
                                            </Row> :
                                            <div className={styles.code}>
                                                <img src={qrcode} />
                                            </div>
                                    }
                                </div>
                                <SizedBox height={24} />
                                <div className={styles.copy}>
                                    <Button startIcon={<Copy />} onClick={() => navigate({ to: 'rf' })} rounded color='dark'>Copy</Button>
                                </div>
                                <SizedBox height={24} />

                                <div className={styles.alert}>
                                    <span><Warning /></span>
                                    <p>Never share recovery phrase with anyone, store it securely!</p>
                                </div>
                            </Paper>
                        </div>

                    </> : "No wallet found"
            }
        </>
    )
}

export default RecoverPhraser
