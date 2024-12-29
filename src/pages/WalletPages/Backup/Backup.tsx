import React, { useState } from 'react'
import styles from './Backup.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import backup from '@app/assets/images/backup.png'
import Checkbox from '@app/components/Icons/checkbox/icon'
import Button from '@app/compLibrary/Button'
import CheckboxFilled from '@app/components/Icons/checkbox-filled/icon'
import { useNavigate } from '@tanstack/react-location'

const Backup = () => {
    const navigate = useNavigate()
    const [checked, setChecked] = useState<boolean>(false)
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Create a New Wallet',
            to: 'wallet/create'
        },
        {
            label: 'Back Up Your Wallet',
            to: 'backup'
        }
    ]
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.head}>
                        Back Up Your Wallet
                    </div>
                    <p>In the next step you will see 12 words that allows you
                        to recover a wallet</p>
                </div>

                <div className={styles.backup}>
                    <img src={backup} />
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

                    <Button onClick={() => navigate({ to: 'confirm-seed' })} rounded disabled={!checked} color={checked ? 'theme' : 'gray'}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default Backup
