import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import React, { useState } from 'react'
import styles from './Buy.module.scss'
import Autocomplete from '@app/compLibrary/Autocomplete'
import { suggestions } from '@app/assets/json/walletSuggestions'
import Check from '@app/components/Icons/check/icon'
import ArrowUp from '@app/components/Icons/arrowUp/icon'
import { currencies } from '@app/assets/json/currencies'
import Information from '@app/components/Icons/information/icon'

import { Tooltip } from 'react-tooltip';
import Button from '@app/compLibrary/Button'
import { useMatch, useNavigate } from '@tanstack/react-location'


const Buy = () => {
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Buy AM',
            to: 'buy'
        },
    ]
    const navigate = useNavigate()
    const [activeCurrency, setActiveCurrency] = useState("")
    const [activeWallet, setActiveWallet] = useState("")
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>
                    Buy AM
                </div>

                <Autocomplete
                    value={''}
                    onChange={(value) => setActiveWallet(value.value)}
                    suggestions={suggestions}
                    suggestionEndIcon={<Check />}
                    endIcon={<ArrowUp />}
                />
                <SizedBox height={16} />
                <Autocomplete
                    value={''}
                    onChange={(value) => setActiveCurrency(value?.shortName as string)}
                    suggestions={currencies}
                    suggestionEndIcon={<Check />}
                    endIcon={<>{activeCurrency + " "}<ArrowUp /></>}
                />
                <SizedBox height={16} />

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

                <Button onClick={() => navigate({ to: `/wallet/buy/${activeWallet}` })} style={{ width: '100%', padding: '16px 16px' }} rounded disabled={(!activeCurrency && !activeWallet)} color={(activeCurrency !== "" && activeWallet !== "") ? 'theme' : 'gray'}>Continue</Button>
            </div>
        </>
    )
}

export default Buy