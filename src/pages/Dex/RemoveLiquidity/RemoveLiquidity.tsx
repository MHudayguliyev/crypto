import React, { useState } from 'react'
import styles from './RemoveLiquidity.module.scss'
import classNames from 'classnames/bind'
import { useMatch } from '@tanstack/react-location'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Container from '@app/compLibrary/Container/Container'
import Header from '@app/compLibrary/Header'
import Paper from '@app/compLibrary/Paper'
import { useQuery } from '@tanstack/react-query'
import { GetLiquiditiy } from '@app/api/Queries/Getters'
import IconWrapper from '@app/components/Icons/Wrapper'
import ChevronDown from '@app/components/Icons/chevronDown/icon'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import Button from '@app/compLibrary/Button'
import AddLiquidityModal from '@app/components/Modals/AddLiquidityModal/AddLiquidityModal'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import { removeLiquidity } from '@app/api/Queries/Delete'

const renderModalContent = () => (
    <>
        <Header fontWeight='bold' justify='center' size='big'>Transaction Submitted</Header>
        <Button linkProps={{ to: '/dex', replace: true }} color='transparent' style={{ color: 'var(--primary-6)' }}>View Details</Button>
    </>
)
const cx = classNames.bind(styles)
const RemoveLiquidity = () => {
    const { params } = useMatch()
    const breadCrumbData = [
        {
            label: 'Dex',
            to: 'dex'
        },
        {
            label: 'Add Liquidity',
            to: 'dex/select-token'
        },
        {
            label: 'Liquidity Details',
            to: `dex/liquidity/${params.liquidityId}`
        },
        {
            label: 'Remove Liquidity',
            to: `dex/remove-liquidity/${params.liquidityId}`
        },
    ]
    const amountVariants = [
        {
            value: '25',
            label: '25'
        },
        {
            value: '50',
            label: '50'
        },
        {
            value: '75',
            label: '75'
        },
        {
            value: '100',
            label: 'Max'
        },
    ]

    const {
        data
    } = useQuery({
        queryKey: ['LiquidityToRemove'],
        queryFn: () => GetLiquiditiy(params.liquidityId)
    })

    const [isOpen, setOpen] = useState(false)
    const [isOpenSuccessModal, setOpenSuccessModal] = useState(false)
    const [activeTab, setActiveTab] = useState<{ label: string, value: string }>(amountVariants[amountVariants.length - 1])

    const handleRemoveLiquidity = async () => {
        try {
            const response = await removeLiquidity(params.liquidityId)
            if (response.id) setOpenSuccessModal(true)
        } catch (error) {
            console.log('delete error', error)
        }
    }
    return (
        <>
            <AddLiquidityModal
                open={isOpen}
                close={() => setOpen(false)}
                tokens={{
                    token1: {
                        amount: data?.token1.amount as number,
                        shortName: data?.token1?.shortName as string,
                        src: data?.token1?.src as string
                    },
                    token2: {
                        amount: data?.token2.amount as number,
                        shortName: data?.token2?.shortName as string,
                        src: data?.token2?.src as string
                    }
                }}
                onSuccess={handleRemoveLiquidity}
            />
            <SuccessModal open={isOpenSuccessModal} close={() => setOpenSuccessModal(false)} renderContent={renderModalContent} />

            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <Container>
                <Header fontWeight='bold' size='big' justify='center'>
                    Remove Liquidity
                </Header>
                <SizedBox height={24} />

                <Paper className={styles.amount_paper}>
                    <div className={styles.labels}>
                        <span>Amount</span>
                        <span>Detailed</span>
                    </div>

                    <div className={styles.values}>
                        <span className={styles.amount}>
                            {activeTab.value}%
                        </span>
                        <div className={styles.tabs}>
                            {
                                amountVariants.map((item, index) => (
                                    <span onClick={() => setActiveTab(item)} key={item.value} className={cx({
                                        tab: true,
                                        active: activeTab?.value === item.value
                                    })}>
                                        {item.label} {amountVariants.length - 1 !== index ? '%' : null}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </Paper>
                <SizedBox height={24} />
                <IconWrapper className={styles.chevronDown}><ChevronDown /></IconWrapper>
                <SizedBox height={24} />


                <Paper className={styles.wallet_info_paper}>
                    <div className={styles.item}>
                        <span className={styles.label}>{data?.token1.shortName}</span>
                        <div className={styles.value}>
                            <span className={styles.amount}>{data?.token1.amount}</span>
                            <div className={styles.image}>
                                <img src={data?.token1.src} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.label}>{data?.token2.shortName}</span>
                        <div className={styles.value}>
                            <span className={styles.amount}>{data?.token2.amount}</span>
                            <div className={styles.image}>
                                <img src={data?.token2.src} />
                            </div>
                        </div>
                    </div>
                </Paper>
                <SizedBox height={24} />

                <div className={styles.price_info}>
                    <span className={styles.price}>Price</span>
                    <div>
                        <div className={styles.shortName}>1 {data?.token1.shortName} = 35,78 {data?.token2.shortName}</div>
                        <div className={styles.shortName}>1 {data?.token2.shortName} = 0.0279  {data?.token1.shortName}</div>
                    </div>
                </div>
                <SizedBox height={24} />

                <div className={styles.token_in_wallet}>
                    <Header fontWeight='bold' size='small'>LP Token in your wallet</Header>
                    <SizedBox height={16} />

                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.images}>
                                <div className={styles.image}>
                                    <img src={data?.token1?.src} />
                                </div>
                                <div className={styles.image}>
                                    <img src={data?.token2.src} />
                                </div>
                            </div>
                            <div className={styles.shorNames}>{data?.token1?.shortName} / {data?.token2.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.shorNames}>{data?.token1?.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.shorNames}>{data?.token2.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                </div>

                <SizedBox height={24} />

                <Row colGutter={8} rowGutter={12}>
                    <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}><Button style={{ width: '100%', padding: '16px' }} rounded color='dark' onClick={() => setOpen(true)}>Approve</Button></Col>
                    <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}><Button style={{ width: '100%', padding: '16px' }} rounded onClick={() => setOpen(true)}>Remove</Button></Col>
                </Row>

            </Container>
        </>
    )
}

export default RemoveLiquidity
