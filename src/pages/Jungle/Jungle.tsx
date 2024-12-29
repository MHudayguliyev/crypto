import React, { useState } from 'react'
import styles from './Jungle.module.scss'
import Tabs, { TabType } from '@app/components/Tabs/Tabs'
import SizedBox from '@app/components/Sizedbox'
import { GetJungles } from '@app/api/Queries/Getters'
import { useQuery } from '@tanstack/react-query'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import PoolCard from '@app/components/PoolCard/PoolCard'
import Pool from '@app/api/queryReturnTypes/Pool'
import { unstakeAmount, updateJungleApproval, updateJungleDepositAmount } from '@app/api/Queries/Post'
import DepositModal from '@app/components/Modals/DepositModal/DepositModal'

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
const Jungle = () => {
    const {
        data,
    } = useQuery({
        queryKey: ['Jungles'],
        queryFn: () => GetJungles()
    })
    const [active, setActive] = useState<TabType>(tabs[0])
    const [jungleToApprove, setJungleToApprove] = useState<Pool | null>()
    const [isDepositOpen, setOpenDeposit] = useState(false)

    const handleUpdateJungleApproval = async (jungle: Pool) => {
        try {
            const res = await updateJungleApproval(jungle)
            console.log('res', res)
        } catch (error) {
            console.log('eror', error)
        }
    }
    const depositConfirmFN = async (jungle: Pool) => {
        try {
            const response = await updateJungleDepositAmount(jungle)
            console.log('res', response)
            if (response.id) window.location.reload()
        } catch (error) {
            console.log('eror updating deposit amount', error)
        }
    }
    const unStakeFN = async (jungle: Pool) => {
        try {
            const response = await unstakeAmount(jungle)
            console.log('res', response)
            if (response.id) window.location.reload()
        } catch (error) {
            console.log('eror updating deposit amount', error)
        }
    }
    return (
        <>
            <DepositModal
                open={isDepositOpen}
                close={() => setOpenDeposit(false)}
                onConfirm={(amount) => depositConfirmFN({ ...jungleToApprove as Pool, deposited_amount: amount, deposited: true, approved: true })}
            />
            <div className={styles.top__actions}>
                <Tabs grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }} className={styles.tabs_controlled} data={tabs} active={active} onChange={(value) => setActive(value)} />
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
                                deposited={pool.deposited}
                                deposited_amount={pool.deposited_amount}
                                onApprove={() => handleUpdateJungleApproval({ ...pool, approved: true })}
                                onDeposit={() => { setJungleToApprove(pool); setOpenDeposit(true) }}
                                onUnStake={() => unStakeFN({ ...pool, approved: false, deposited: false, deposited_amount: 0 })}
                                jungleCard
                            // onAmountUpdate={(amount) => updateAmountFN({ ...pool, approved_amount: amount })}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Jungle
