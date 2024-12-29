import React from 'react'
import CommonModalTypes from '../CommonModalI'
import Modal from '@app/compLibrary/Modal'
import styles from './AddLiquidityModal.module.scss'
import Header from '@app/compLibrary/Header'
import IconWrapper from '@app/components/Icons/Wrapper'
import CloseSm from '@app/components/Icons/closeSm/icon'
import SizedBox from '@app/components/Sizedbox'
import Button from '@app/compLibrary/Button'

interface AddLiquidityModal extends CommonModalTypes {
    tokens: {
        token1: {
            src: string
            amount: number
            shortName: string
        },
        token2: {
            src: string
            amount: number
            shortName: string
        }
    }
    onSuccess: Function
}
const AddLiquidityModal = (props: AddLiquidityModal) => {
    const { tokens: { token1, token2 }, open, close, onSuccess } = props
    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.addLiquidityModal}
            >
                <div className={styles.content}>
                    <div className={styles.top}>
                        <Header fontWeight='bold' size='big'>
                            You Will Receive
                        </Header>
                        <IconWrapper onClick={close} className={styles.close}><CloseSm /></IconWrapper>
                    </div>
                    <SizedBox height={24} />

                    <div className={styles.center}>
                        <div className={styles.receiveAmount}>
                            <div className={styles.amount}>
                                149.364
                            </div>
                            <div className={styles.images}>
                                <div className={styles.image}>
                                    <img src={token1?.src} />
                                </div>
                                <div className={styles.image}>
                                    <img src={token2?.src} />
                                </div>
                            </div>
                        </div>
                        <SizedBox height={24} />
                        <div className={styles.pool_tokens}>{token1.shortName}/{token2.shortName} Pool Tokens</div>
                        <SizedBox height={24} />
                        <div className={styles.output_text}>Output is estimated. If the price changes by more than 6.5% your transaction will revert.</div>
                        <SizedBox height={24} />

                        <div className={styles.transaction_details}>
                            <div className={styles.item}>
                                <div className={styles.label}>{token1.shortName} <span>Deposited</span></div>
                                <div className={styles.value}>
                                    <div className={styles.deposite_amount}>{token1.amount}</div>
                                    <div className={styles.image}>
                                        <img src={token1.src} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.label}>{token1.shortName} <span>Deposited</span></div>
                                <div className={styles.value}>
                                    <div className={styles.deposite_amount}>{token2.amount}</div>
                                    <div className={styles.image}>
                                        <img src={token2.src} />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.label}>Rates</div>
                                <div className={styles.value}>
                                    <div className={styles.rate_pool}>
                                        1 {token1.shortName} = 35,78 {token2.shortName}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.label} />
                                <div className={styles.value}>
                                    <div className={styles.rate_pool}>
                                        1 {token2.shortName} = 0.02 {token1.shortName}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.item}>
                                <div className={styles.label}>Share of Pool</div>
                                <div className={styles.value}>
                                    <div className={styles.rate_pool}>
                                        0.0001455%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SizedBox height={24} />

                    <Button onClick={() => { close(); onSuccess() }} rounded style={{ padding: '16px', width: '100%' }}>Confirm Supply</Button>
                </div>
            </Modal>
        </>
    )
}

export default AddLiquidityModal
