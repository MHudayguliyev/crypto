import React, { useMemo, useState } from 'react'
import styles from './PoolCard.module.scss'
import classNames from 'classnames/bind'
import IconWrapper from '../Icons/Wrapper'
import Calculator from '../Icons/calculator/icon'
import Question from '../Icons/question/icon'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import Button from '@app/compLibrary/Button'
import SizedBox from '../Sizedbox'
import Accordion from '@app/compLibrary/Accordion'
import ShareDirect from '../Icons/shareDirect/icon'
import Pool from '@app/api/queryReturnTypes/Pool'
import Minus from '../Icons/minus/icon'
import Plus3 from '../Icons/plus3/icon'
import Header from '@app/compLibrary/Header'
interface PoolCardProps extends Pool {
    onApprove: Function
    onAmountUpdate?: (value: number) => void
    onDeposit?: () => void
    onUnStake?: () => void
    jungleCard?: boolean
}
const cx = classNames.bind(styles)
const PoolCard = (props: PoolCardProps) => {
    const {
        id,
        apr,
        deposit_fee,
        harvert_lockup,
        shortName,
        sources,
        lp_type,
        am_earned,
        approved,
        approved_amount,
        details,
        your_staked,
        onApprove,
        onAmountUpdate,
        onDeposit,
        onUnStake,
        jungleCard = false,
        deposited = false,
        deposited_amount
    } = props

    const [approvedState, setApproved] = useState<boolean>(approved)
    const [approvedAmount, setApprovedAmount] = useState<number>(approved_amount)

    const amEarnedContent = useMemo(() => {
        return (
            <div className={styles.am_earned}>
                <div className={styles.title_original}>
                    AM <span>Earned</span>
                </div>
                <SizedBox height={8} />
                <div className={cx({
                    am_earned_flex: jungleCard
                })}>
                    <span className={cx({
                        am_earned_amount: true,
                        am_earned_amount_jungle: (approvedState && deposited) && jungleCard
                    })}>{(deposited && jungleCard) ? '0.00520' : am_earned}</span>
                    <SizedBox height={8} />

                    {
                        jungleCard ? <Button color={deposited ? 'dark' : 'faded'} rounded>Harvest</Button> : <Row colGutter={8} rowGutter={8}>
                            <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}>
                                <Button color='faded' style={{ width: '100%' }} rounded >Harvest</Button>
                            </Col>
                            <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}>
                                <Button color='faded' style={{ width: '100%' }} rounded >Compound</Button>
                            </Col>
                        </Row>
                    }
                </div>
            </div>
        )
    }, [jungleCard, approvedState, deposited])

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={cx({
                    images: true,
                    jungle_images: jungleCard
                })}>
                    {
                        sources.map(src => (
                            <div key={src} className={styles.image}>
                                <img src={src} />
                            </div>
                        ))
                    }
                </div>
                <div className={styles.deposit}>
                    <span>X10</span>
                    <div className={styles.deposit_title}>{details.deposit}</div>
                </div>
            </div>
            <SizedBox height={24} />

            {jungleCard && <>{amEarnedContent} <SizedBox height={24} /></>}

            <div className={styles.pool_info}>
                <div className={styles.item}>
                    <label>APR:</label>
                    <div className={styles.item_value}>
                        <IconWrapper><Calculator /></IconWrapper>
                        {apr}
                    </div>
                </div>
                {
                    !jungleCard && <>
                        <div className={styles.item}>
                            <label>Earn:</label>
                            <div className={styles.item_value}>
                                {shortName}
                            </div>
                        </div>
                        <div className={styles.item}>
                            <label>Deposit Fee:</label>
                            <div className={styles.item_value}>
                                {deposit_fee} %
                            </div>
                        </div>
                    </>
                }
                <div className={styles.item}>
                    <label>{jungleCard ? 'Withdrawl' : 'Harvert'} Lockup: <IconWrapper><Question /></IconWrapper></label>
                    <div className={styles.item_value}>
                        {harvert_lockup}
                    </div>
                </div>
                <div className={styles.item}>
                    <label>{jungleCard ? 'Your Staked' : 'LP Type'}:</label>
                    <div className={styles.item_value}>
                        {lp_type}
                    </div>
                </div>
            </div>
            <SizedBox height={24} />

            {!jungleCard && <>{amEarnedContent} <SizedBox height={24} /></>}

            <div className={styles.am_staked}>
                {
                    !jungleCard && <>
                        <div className={styles.title_original}>
                            {shortName} <span>Staked</span>
                        </div>
                        <SizedBox height={8} />
                    </>
                }
                {
                    approvedState ?
                        <div className={styles.approved}>
                            {
                                !jungleCard && <div className={styles.approved_amount}>
                                    <Header fontWeight='bold' size='big'>{approvedAmount}</Header>
                                    <div className={styles.equals}>≈ $2,200</div>
                                </div>
                            }
                            <div className={cx({
                                approved_actions: true,
                                approved_actions_jungle: jungleCard
                            })}>
                                <Button onClick={() => {
                                    if (onAmountUpdate) {
                                        const updatedAmount = approvedAmount - 1
                                        setApprovedAmount(updatedAmount)
                                        onAmountUpdate(updatedAmount)
                                    } else if (onUnStake && deposited) onUnStake()
                                }} style={{ width: `${jungleCard ? '100%' : 'auto'}`, border: `${jungleCard ? '0' : '1'}px solid var(--primary-6)`, color: `${(jungleCard && approvedState && !deposited) ? 'var(--gray-18)' : 'var(--primary-6)'}` }} rounded color={(approvedState && !deposited) ? 'faded' : deposited ? 'gray' : 'transparent'}>
                                    {
                                        jungleCard ? 'Unstake' : <IconWrapper><Minus /></IconWrapper>
                                    }
                                </Button>
                                <Button style={{ width: `${jungleCard ? '100%' : 'auto'}`, }} onClick={() => {
                                    if (onAmountUpdate) {
                                        const updatedAmount = approvedAmount + 1
                                        setApprovedAmount(updatedAmount)
                                        onAmountUpdate(updatedAmount)
                                    } else if (onDeposit) onDeposit()
                                }} rounded>
                                    {jungleCard ? 'Deposit' : <IconWrapper><Plus3 /></IconWrapper>}
                                </Button>
                            </div>
                        </div> :
                        <Button onClick={async () => {
                            if (jungleCard) {
                                setApproved(true)
                            }
                            await onApprove()
                        }} rounded style={{ padding: '16px', width: '100%' }}>Approve {shortName}</Button>
                }
            </div>
            <SizedBox height={24} />

            <Accordion>
                <div className={styles.pool_info}>
                    {
                        !jungleCard &&
                        <div className={styles.item}>
                            <label>Deposit:</label>
                            <div className={styles.item_value}>
                                {details.deposit}
                                <IconWrapper><ShareDirect /></IconWrapper>
                            </div>
                        </div>
                    }
                    <div className={styles.item}>
                        <label>Total {jungleCard ? 'Staked' : 'Liquidity'}:</label>
                        <div className={styles.item_value}>
                            {!jungleCard && '$'}{details.total_liquidity}
                        </div>
                    </div>
                    <div className={styles.item}>
                        <label>{jungleCard ? 'End' : 'LP Worth'}:</label>
                        <div className={styles.item_value}>
                            {!jungleCard && '$'}{details[jungleCard ? 'end' : 'lp_worth']}
                        </div>
                    </div>
                </div>
                <SizedBox height={12} />
                <Button color='transparent' style={{ width: '100%', color: 'var(--primary-6)', textDecoration: 'underline' }} >
                    {jungleCard ? 'View Project Site' : 'View On BSC Scan'}
                </Button>
                {
                    jungleCard && <Button color='transparent' style={{ width: '100%', color: 'var(--primary-6)', textDecoration: 'underline' }} >
                        View Contract
                    </Button>
                }
            </Accordion>
        </div>
    )
}

export default PoolCard
