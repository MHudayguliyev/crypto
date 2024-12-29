import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import React from 'react'
import styles from './ConfirmSeed.module.scss'
import Row from '@app/compLibrary/Grid/Row'
import { seeds } from '@app/assets/json/seeds'
import Col from '@app/compLibrary/Grid/Col'
import Seed from '@app/components/Seed/Seed'
import Button from '@app/compLibrary/Button'
import Copy from '@app/components/Icons/copy/icon'
import Warning from '@app/components/Icons/warning/icon'
import { useNavigate } from '@tanstack/react-location'

const ConfirmSeed = () => {
    const navigate = useNavigate()
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
            to: 'wallet/create/backup'
        },
        {
            label: 'Confirm Your Seed Phrase',
            to: 'confirm-seed'
        }
    ]
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.head}>
                        Confirm Your Seed Phrase
                    </div>
                    <p>Write down or copy these words in the right order
                        and save them somewhere safe.</p>
                </div>

                <Row
                    className={styles.row}
                    colGutter={8}
                    rowGutter={8}
                >
                    {
                        seeds.map((seed, index) => (
                            <Col grid={{
                                xxlg: 3,
                                xlg: 3,
                                md: 4,
                                sm: 6
                            }} key={index}>
                                <Seed
                                    index={index + 1}
                                    label={seed.label}
                                    value={seed.value}
                                />
                            </Col>
                        ))
                    }
                </Row>

                <div className={styles.bottom}>
                    <Button style={{ alignSelf: 'center' }} rounded color='dark' startIcon={<Copy />}>Copy</Button>
                    <div className={styles.warning}>
                        <span><Warning /></span>
                        Never share recovery phrase with anyone, store it securely!
                    </div>
                    <Button rounded onClick={() => navigate({ to: 'verify-seed' })}>Next</Button>
                </div>
            </div>
        </>
    )
}

export default ConfirmSeed
