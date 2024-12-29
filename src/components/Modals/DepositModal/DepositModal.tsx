import React, { useState } from 'react'
import CommonModalTypes from '../CommonModalI'
import styles from './DepositModal.module.scss'
import Modal from '@app/compLibrary/Modal'
import Header from '@app/compLibrary/Header'
import IconWrapper from '@app/components/Icons/Wrapper'
import CloseSm from '@app/components/Icons/closeSm/icon'
import SizedBox from '@app/components/Sizedbox'
import Paper from '@app/compLibrary/Paper'
import Input from '@app/compLibrary/Input'
import Button from '@app/compLibrary/Button'

interface DepositModalProps extends CommonModalTypes {
    onConfirm: (amount: number) => void
}
const DepositModal = (props: DepositModalProps) => {
    const {
        open,
        close,
        onConfirm
    } = props
    const [input, setInput] = useState<number | null>()
    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.depositModal}
            >
                <div>
                    <div className={styles.top}>
                        <Header fontWeight='bold' size='big'>Deposit AM Token</Header>
                        <IconWrapper onClick={close} className={styles.close_icon}><CloseSm /></IconWrapper>
                    </div>
                    <SizedBox height={24} />


                    <SizedBox height={24} />     <Paper className={styles.field}>
                        <div className={styles.balance}>Available: 10,000.00 AM</div>
                        <div className={styles.amount_field}>
                            <Input value={input as number} onChange={(e) => setInput(parseInt(e.target.value))} type='number' placeholder='0.000' />
                            <span className={styles.max}>Max</span>
                        </div>
                    </Paper>
                    <SizedBox height={24} />

                    <Button onClick={() => { close(); onConfirm(input as number); setInput(null) }} style={{ padding: '16px', width: '100%' }} rounded color={input ? 'theme' : 'faded'} disabled={!input}>Confirm</Button>
                </div>
            </Modal>
        </>
    )
}

export default DepositModal
