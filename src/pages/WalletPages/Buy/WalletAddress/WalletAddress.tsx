import { suggestions } from '@app/assets/json/walletSuggestions'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import { useMatch, useNavigate } from '@tanstack/react-location'
import React, { useState } from 'react'
import styles from './WalletAddress.module.scss'
import Input from '@app/compLibrary/Input'
import { Tooltip } from 'react-tooltip'
import Information from '@app/components/Icons/information/icon'
import Button from '@app/compLibrary/Button'

const WalletAddress = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const token = suggestions.find(suggestion => suggestion.value === match.params?.token)
    const [value, setValue] = useState("")

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
            to: '/'
        },
    ]

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.top}>
                    <div className={styles.header}>
                        Enter Wallet Address
                    </div>
                    <p>Please enter your wallet address accurately. Only enter the address of wallet that you own and to which you have access.</p>
                </div>

                <form className={styles.form}>
                    <div className={styles.field}>
                        <Input value={value} onChange={(e) => setValue(e.target.value)} type='text' placeholder='Enter wallet address' />
                        <div className={styles.field_right}>
                            <span>{token?.shortName}</span>
                            <div className={styles.field_thumbnail}>
                                <img src={token?.src} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.detail}>
                            <span className={styles.title}>AM price</span>
                            <span className={styles.price}>$10</span>
                        </div>
                        <div className={styles.detail}>
                            <span className={styles.title}>You get <span id="info"><Information /></span></span>
                            <span className={styles.price}>~ 98.523</span>
                            <Tooltip
                                anchorSelect="#info"
                                content='Estimated amount you receive which may vary due to price volatility.'
                                place='right'
                                style={{ maxWidth: '242px', width: '100%' }}
                            />
                        </div>
                    </div>

                    <Button onClick={() => navigate({ to: `payment` })} rounded style={{ width: '100%', padding: '16px 16px' }} disabled={value === ""} color={value === "" ? 'gray' : 'theme'}>Continue</Button>

                </form>
            </div>
        </>
    )
}

export default WalletAddress
