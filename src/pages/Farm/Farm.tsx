import React, { useState } from 'react'
import styles from './Farm.module.scss'
import Tabs, { TabType } from '@app/components/Tabs/Tabs'
import Switch from '@app/compLibrary/Switch/Switch'
import { useQuery } from '@tanstack/react-query'
import { GetFarms, GetPools } from '@app/api/Queries/Getters'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import PoolCard from '@app/components/PoolCard/PoolCard'
import SizedBox from '@app/components/Sizedbox'
import RoiModal from '@app/components/Modals/RoiModal/RoiModal'
import DepositModal from '@app/components/Modals/DepositModal/DepositModal'

import PoolType from '@app/api/queryReturnTypes/Pool'
import { updateAmount } from '@app/api/Queries/Post'
import Pool from '@app/api/queryReturnTypes/Pool'
const tabs = [
    {
        label: 'Active',
        value: 'active'
    },
    {
        label: 'Inactive',
        value: 'inactive'
    }
]
const Farm = () => {
    const [farmToApprove, setFarmToApprove] = useState<Pool | null>()
    const [active, setActive] = useState<TabType>(tabs[0])
    const [checked, setChecked] = useState(false)
    const [isRoiOpen, setOpenRoi] = useState(false)
    const [isDepositOpen, setOpenDeposit] = useState(false)


    const {
        data,
    } = useQuery({
        queryKey: ['Farms'],
        queryFn: () => GetFarms()
    })

    const updateAmountFN = async (farm: PoolType, shouldRefetch = false) => {
        try {
            const res = await updateAmount(farm, 'farms')
            if (res.id && shouldRefetch) window.location.reload()
        } catch (error) {
            console.log("")
        }
    }

    return (
        <>
            <RoiModal
                open={isRoiOpen}
                close={() => {
                    setOpenRoi(false);
                }}
                onGetAM={() => setOpenDeposit(true)}
            />
            <DepositModal
                open={isDepositOpen}
                close={() => setOpenDeposit(false)}
                onConfirm={(amount) => updateAmountFN({ ...farmToApprove as Pool, approved_amount: amount, approved: true }, true)}
            />
            <div className={styles.top__actions}>
                <div className={styles.invisible}>nonce</div>
                <Tabs grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }} className={styles.tabs_controlled} data={tabs} active={active} onChange={(value) => setActive(value)} />
                <span className={styles.checkbox}>
                    <Switch size='small' checked={checked} onClick={() => setChecked(!checked)} />
                    <span>Staked only</span>
                </span>
            </div>
            <SizedBox height={24} />
            <Row colGutter={12} rowGutter={12}>
                {
                    data?.map(pool => (
                        <Col key={pool.id} grid={{ xxlg: 4, xlg: 4, lg: 6, md: 6, sm: 12 }}>
                            <PoolCard
                                id={pool.id}
                                am_earned={pool.am_earned}
                                approved_amount={pool.approved_amount}
                                apr={pool.apr}
                                deposit_fee={pool.deposit_fee}
                                details={pool.details}
                                harvert_lockup={pool.harvert_lockup}
                                lp_type={pool.lp_type}
                                shortName={pool.shortName}
                                sources={pool.sources}
                                approved={pool.approved}
                                onApprove={() => { setOpenRoi(true); setFarmToApprove(pool) }}
                                onAmountUpdate={(amount) => updateAmountFN({ ...pool, approved_amount: amount })}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Farm
