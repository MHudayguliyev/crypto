import React from 'react'
import styles from './ImportWallet.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Autocomplete from '@app/compLibrary/Autocomplete'
import { suggestions } from '@app/assets/json/walletSuggestions'
import { useNavigate } from '@tanstack/react-location'
import Check from '@app/components/Icons/check/icon'


const ImportWallet = () => {
    const navigate = useNavigate()
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Import Wallet',
            to: 'import'
        },
    ]

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />
            <div className={styles.main}>
                <div className={styles.header}>
                    Import Wallet
                </div>

                <Autocomplete
                    value={''}
                    onChange={(value) => { }}
                    onClick={(value) => navigate({ to: `/wallet/import/${value.id}/${value.value}` })}
                    suggestions={suggestions}
                />
                <SizedBox height={24} />

            </div>
        </>
    )
}

export default ImportWallet
