import React, { useState } from 'react'
import styles from './Preference.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import Paper from '@app/compLibrary/Paper'
import ArrowDown from '@app/components/Icons/arrowDown/icon'
import Switch from '@app/compLibrary/Switch/Switch'
import Dropdown from '@app/compLibrary/Dropdown'
import { currencies } from '@app/assets/json/currencies'
import { SearchValue } from '@app/compLibrary/Autocomplete/Autocomplete'
import { locales } from '@app/assets/json/locales'

const Preference = () => {
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
            label: 'Preference',
            to: 'preference'
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

    const [checked, setChecked] = useState<boolean>(false)
    const [activeCurrency, setActiveCurrency] = useState<SearchValue>()
    const [activeLocale, setActiveLocale] = useState<SearchValue>()

    const renderCurrencyHeader = () => {
        return (
            <div className={styles.value}>
                <span className={styles.text}>{activeCurrency?.shortName}</span>
                <span className={styles.icon}><ArrowDown /></span>
            </div>
        )
    }
    const renderLocaleHeader = () => {
        return (
            <div className={styles.value}>
                <span className={styles.text}>{activeLocale?.label}</span>
                <span className={styles.icon}><ArrowDown /></span>
            </div>
        )
    }

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <LinkTabs data={tabs} baseUrl='/wallet' />
                <SizedBox height={24} />

                <Paper style={{ marginBottom: '40px' }}>
                    <div className={styles.header}>
                        Preferences
                    </div>
                    <SizedBox height={12} />

                    <div>
                        <div className={styles.item}>
                            <div className={styles.label}>Currency</div>
                            <Dropdown
                                suggestions={currencies}
                                activeSuggestion={activeCurrency}
                                renderHeader={renderCurrencyHeader}
                                onClick={(value) => setActiveCurrency(value)}
                                style={{ right: 0, left: 'auto' }}
                            />
                        </div>
                        <div className={styles.item}>
                            <div className={styles.label}>App Language</div>
                            <Dropdown
                                suggestions={locales}
                                activeSuggestion={activeLocale}
                                renderHeader={renderLocaleHeader}
                                onClick={(value) => setActiveLocale(value)}
                                style={{ right: 0, left: 'auto' }}
                            />
                        </div>
                    </div>
                    <SizedBox height={12} />

                    <div>
                        <div className={styles.minHeader}>
                            Ask Authentication For
                        </div>
                        <div className={styles.item}>
                            <div className={styles.label}>Trasaction Signing</div>
                            <Switch size='small' checked={checked} onClick={() => setChecked(!checked)} />
                        </div>
                    </div>
                </Paper>
            </div>

        </>
    )
}

export default Preference
