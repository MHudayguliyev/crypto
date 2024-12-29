import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import { useMatch, useNavigate } from '@tanstack/react-location'
import React, { useState } from 'react'
import styles from './PaymentMethod.module.scss'
import bank from '@app/assets/images/bank.png'
import atm from '@app/assets/images/atm.png'
import ArrowRight from '@app/components/Icons/arrowRight/icon'
import CheckboxFilled from '@app/components/Icons/checkbox-filled/icon'
import Checkbox from '@app/components/Icons/checkbox/icon'
import Button from '@app/compLibrary/Button'


const PaymentMethod = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Buy AM',
            to: 'wallet/buy'
        },
        {
            label: 'Wallet Address',
            to: `wallet/buy/${match.params?.token}`
        },
        {
            label: 'Payment Method',
            to: 'payment'
        },
    ]

    const channels = [
        {
            src: bank,
            name: 'Bank Account',
            description: 'Add a bank account to trade up to USD $12,000.00.'
        },
        {
            src: atm,
            name: 'Credit/Debit Card',
            description: 'Add any Visa or Mastercard for transactions up to USD $12,000.00.'
        }
    ]

    const [checked, setChecked] = useState<boolean>(false)


    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        Payment Method
                    </div>
                    <p>30 AM</p>
                    <p>≈ 300 USD</p>
                </div>

                <div className={styles.channels}>
                    <div className={styles.label}>Fiat channels</div>
                    {
                        channels.map((channel, index) => (
                            <div className={styles.channel} key={index}>
                                <div className={styles.content}>
                                    <div className={styles.image}>
                                        <img src={channel.src} />
                                    </div>
                                    <div>
                                        <div className={styles.name}>{channel.name}</div>
                                        <div className={styles.description}>{channel.description}</div>
                                    </div>
                                </div>
                                <span className={styles.icon}><ArrowRight /></span>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.bottom}>
                    <p onClick={() => {
                        if (checked) setChecked(false)
                        else setChecked(true)
                    }}>
                        <span className={styles.icon} >{
                            checked ? <CheckboxFilled /> : <Checkbox />
                        }</span>
                        I understand that if i lose my recovery words, I will not be able to access my wallet
                    </p>

                    <Button style={{ padding: '16px 16px' }} onClick={() => navigate({ to: 'select-card' })} rounded disabled={!checked} color={checked ? 'theme' : 'gray'}>Confirm</Button>
                </div>
            </div>
        </>
    )
}

export default PaymentMethod
