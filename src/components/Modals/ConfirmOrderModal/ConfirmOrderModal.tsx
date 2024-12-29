import React, { useEffect, useState } from 'react'
import CommonModalTypes from '../CommonModalI'
import Modal from '@app/compLibrary/Modal'
import styles from './ConfirmOrderModal.module.scss'
import CloseSm from '@app/components/Icons/closeSm/icon'
import Warning from '@app/components/Icons/warning/icon'
import Information from '@app/components/Icons/information/icon'
import { Tooltip } from 'react-tooltip'
import Button from '@app/compLibrary/Button'
import Clock from '@app/components/Icons/clock/icon'
import CheckSelect from '@app/components/Icons/checkSelect/icon'
import { delay } from '@utils/helpers'

interface ConfirmOrderModalProps extends CommonModalTypes {
    code: string
    src: string
    onSuccess: Function
}
const ConfirmOrderModal = (props: ConfirmOrderModalProps) => {
    const {
        open,
        close,
        code,
        src,
        onSuccess
    } = props
    const [mode, setMode] = useState<'confirm' | 'processing' | 'delivered'>('confirm')

    useEffect(() => {
        if (mode === 'processing') {
            delay(5000).then(() => setMode('delivered'))
        } else if (mode === 'delivered') delay(2000).then(() => {
            setMode('confirm');
            close()
            onSuccess()
        })
    }, [mode])

    const content = (
        mode === 'confirm' ?
            <div className={styles.content}>
                <div className={styles.header}>
                    <div></div>
                    <div className={styles.title}>Confirm order</div>
                    <span className={styles.icon} onClick={close}><CloseSm /></span>
                </div>
                <div className={styles.receiveAmount}>
                    <div className={styles.label}>You will receive</div>
                    <div className={styles.value}>98.523 AM</div>
                </div>
                <div className={styles.lookout}>
                    <div className={styles.item}>
                        <div className={styles.label}>Pay with</div>
                        <div className={styles.value}>
                            <span>{code}</span>
                            <div className={styles.image}>
                                <img src={src} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Price</div>
                        <div className={styles.value}>
                            1 AM  ≈ $10
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Fee</div>
                        <div className={styles.value}>
                            $30
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Total spend <span id='info'><Information /></span></div>
                        <div className={styles.value}>
                            1,030 USD
                        </div>
                        <Tooltip
                            anchorSelect="#info"
                            content='Estimated amount you receive which may vary due to price volatility.'
                            place='right'
                            style={{ maxWidth: '242px', width: '100%' }}
                        />
                    </div>
                </div>

                <div className={styles.alert}>
                    <span><Warning /></span>
                    <p>Please review your order carefully as payment cannot be canceled, recalled, or refunded</p>
                </div>

                <Button rounded style={{ padding: '16px' }} onClick={() => setMode('processing')}>Next</Button>
            </div> :
            mode === 'processing' ?
                <div className={styles.processing}>
                    <div className={styles.top}>
                        <span className={styles.icon}><Clock /></span>
                        <div className={styles.title}>Processing Transaction</div>
                        <p>We’re purchasing your crypto. This takes between a few minustes and a few hours. Thanks for your patience!</p>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.bottom__item}>
                            <div className={styles.label}>Order ID</div>
                            <div>f37c93-3d04-4c99-983c-7e93393a142</div>
                        </div>

                        <div className={styles.bottom__item}>
                            <div className={styles.label}>Order ID</div>
                            <div>f37c93-3d04-4c99-983c-7e93393a142</div>
                        </div>
                    </div>
                </div> :
                <div className={styles.delivered}>
                    <span className={styles.icon}><CheckSelect /></span>
                    <div className={styles.title}>Crypto Delivered</div>
                    <Button onClick={close} color='transparent' style={{ color: 'var(--primary-6)' }}>View on Blockchain Explorer</Button>
                </div>
    )

    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.confirmOrderModal}
            >
                {content}
            </Modal>
        </>
    )
}

export default ConfirmOrderModal
