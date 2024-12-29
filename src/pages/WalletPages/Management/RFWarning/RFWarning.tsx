import React, { useState } from 'react'
import styles from './RFWarning.module.scss'
import { useMatch, useNavigate } from '@tanstack/react-location'
import { wallet_management } from '@app/assets/json/wallet_management'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import Paper from '@app/compLibrary/Paper'
import Key from '@app/components/Icons/key/icon'
import Warning from '@app/components/Icons/warning/icon'
import Error from '@app/components/Icons/error/icon'
import Button from '@app/compLibrary/Button'
import CheckboxFilled from '@app/components/Icons/checkbox-filled/icon'
import Checkbox from '@app/components/Icons/checkbox/icon'
import WarningLg from '@app/components/Icons/warningLg/icon'
const RFWarning = () => {
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
    const warns = [
        {
            icon: <Key />,
            text: "The recovery phrase is the master key to your funds. Never share it with anyone else."
        },
        {
            icon: <Error />,
            text: "AM Wallet will never ask you to share your recovery phrase."
        },
        {
            icon: <WarningLg />,
            text: "If you lose your recovery phrase, not event AM Wallet can recover your funds."
        }
    ]

    const [checked, setChecked] = useState<boolean>(false)

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
                                    Recovery Phrase
                                </div>
                                <SizedBox height={24} />

                                <div>
                                    {
                                        warns.map((item, index) => (
                                            <div className={styles.warn} key={index}>
                                                <span className={styles.icon}>{item.icon}</span>
                                                <span>{item.text}</span>
                                            </div>
                                        ))
                                    }
                                </div>
                                <SizedBox height={24} />

                                <div>
                                    <p className={styles.checkbox} onClick={() => {
                                        if (checked) setChecked(false)
                                        else setChecked(true)
                                    }}>
                                        <span className={styles.icon} >{
                                            checked ? <CheckboxFilled /> : <Checkbox />
                                        }</span>
                                        I understand the risks
                                    </p>
                                    <SizedBox height={24} />
                                    <Button style={{ width: '100%' }} onClick={() => navigate({ to: 'rf' })} rounded disabled={!checked} color={checked ? 'theme' : 'gray'}>Next</Button>

                                </div>
                            </Paper>
                        </div>

                    </> : <>No Wallet found</>
            }
        </>
    )
}

export default RFWarning
