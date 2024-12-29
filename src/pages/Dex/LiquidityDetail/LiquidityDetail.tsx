import React from 'react'
import styles from './LiquidityDetail.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Container from '@app/compLibrary/Container/Container'
import Header from '@app/compLibrary/Header'
import { useQuery } from '@tanstack/react-query'
import { GetLiquiditiy } from '@app/api/Queries/Getters'
import { useMatch } from '@tanstack/react-location'
import Button from '@app/compLibrary/Button'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'

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
        to: '#'
    },
]
const LiquidityDetail = () => {
    const { params } = useMatch()
    const {
        data
    } = useQuery({
        queryKey: ['Liquidity'],
        queryFn: () => GetLiquiditiy(params.liquidityId)
    })

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <Container>
                <Header justify='center' fontWeight='bold' size='big'>Liquidity Details</Header>
                <SizedBox height={24} />

                <div className={styles.transaction_details}>
                    <div className={styles.title}>
                        <div className={styles.images}>
                            <div className={styles.image}>
                                <img src={data?.token1?.src} />
                            </div>
                            <div className={styles.image}>
                                <img src={data?.token2?.src} />
                            </div>
                        </div>
                        <div className={styles.shortNames}>
                            {data?.token1?.shortName}/{data?.token2?.shortName}
                        </div>
                    </div>
                    <SizedBox height={24} />

                    <div className={styles.item}>
                        <div className={styles.label}>Pooled {data?.token1.shortName}</div>
                        <div className={styles.value}>
                            <div className={styles.deposite_amount}>{data?.token1.amount}</div>
                            <div className={styles.image}>
                                <img src={data?.token1.src} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.label}>Pooled{data?.token1.shortName}</div>
                        <div className={styles.value}>
                            <div className={styles.deposite_amount}>{data?.token2.amount}</div>
                            <div className={styles.image}>
                                <img src={data?.token2.src} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.label}>Your Pool Tokens</div>
                        <div className={styles.value}>
                            <div className={styles.deposite_amount}>
                                149.36
                            </div>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.label}>Your Pool share</div>
                        <div className={styles.value}>
                            <div className={styles.deposite_amount}>
                                0.00%
                            </div>
                        </div>
                    </div>
                </div>

                <SizedBox height={24} />

                <Row colGutter={8} rowGutter={24}>
                    <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}><Button style={{ width: '100%', padding: '16px' }} rounded color='dark' linkProps={{ to: `/dex/remove-liquidity/${data?.id}` }}>Remove</Button></Col>
                    <Col grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }}><Button linkProps={{ to: '/dex/select-token' }} style={{ width: '100%', padding: '16px' }} rounded >Add</Button></Col>
                </Row>
            </Container>
        </>
    )
}

export default LiquidityDetail
