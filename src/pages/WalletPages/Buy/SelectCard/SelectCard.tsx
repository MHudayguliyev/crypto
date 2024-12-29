import React, { useState } from 'react'
import styles from './SelectCard.module.scss'
import { useMatch, useNavigate } from '@tanstack/react-location'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'


import Check from '@app/components/Icons/check/icon'
import Button from '@app/compLibrary/Button'
import Plus from '@app/components/Icons/plus/icon'
import { cards } from '@app/assets/json/cards'


const SelectCard = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const token = match.params?.token
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
            to: `wallet/buy/${token}`
        },
        {
            label: 'Payment Method',
            to: `wallet/buy/${token}/payment`
        },
        {
            label: 'Choose Asset',
            to: `wallet/buy/${token}/payment/select-card`
        },
    ]


    const [activeIndex, setActiveIndex] = useState(-1)

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>Choose Asset</div>
                <div>
                    {
                        cards.map((item, index) => (
                            <div onClick={() => setActiveIndex(index)} className={styles.asset} key={index}>
                                <div className={styles.content}>
                                    <div className={styles.image}>
                                        <img src={item.src} />
                                    </div>
                                    <div>
                                        <div className={styles.label}>{item.label}</div>
                                        <div className={styles.code}>{item.code}</div>
                                    </div>
                                </div>
                                {activeIndex === index ? <span><Check /></span> : null}
                            </div>
                        ))
                    }
                </div>
                <Button startIcon={<Plus />} type='dashed' color='transparent' rounded>Add Card</Button>
                <Button rounded color={activeIndex === -1 ? 'gray' : 'theme'} disabled={activeIndex === -1} onClick={() => navigate({ to: `${cards[activeIndex].id}` })}>Next</Button>

            </div>
        </>
    )
}

export default SelectCard
