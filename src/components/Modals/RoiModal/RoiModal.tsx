import React from 'react'
import styles from './RoiModal.module.scss'
import CommonModalTypes from '../CommonModalI'
import Modal from '@app/compLibrary/Modal'
import Header from '@app/compLibrary/Header'
import IconWrapper from '@app/components/Icons/Wrapper'
import CloseSm from '@app/components/Icons/closeSm/icon'
import SizedBox from '@app/components/Sizedbox'
import Button from '@app/compLibrary/Button'
import ShareDirect from '@app/components/Icons/shareDirect/icon'

interface RoiModalProps extends CommonModalTypes {
    onGetAM: Function
}
const RoiModal = (props: RoiModalProps) => {
    const {
        open,
        close,
        onGetAM,
    } = props
    const body = [
        {
            time_frame: '1d',
            roi: '0.69',
            am_per: '32.23'
        },
        {
            time_frame: '1d',
            roi: '0.69',
            am_per: '32.23'
        },
        {
            time_frame: '1d',
            roi: '0.69',
            am_per: '32.23'
        },
        {
            time_frame: '1d',
            roi: '0.69',
            am_per: '32.23'
        },
    ]
    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.roiModal}
            >
                <div className={styles.content}>
                    <div className={styles.top}>
                        <Header fontWeight='bold' size='big'>Roi</Header>
                        <IconWrapper onClick={close} className={styles.close_icon}><CloseSm /></IconWrapper>
                    </div>
                    <SizedBox height={24} />
                    <div className={styles.table}>
                        <div className={styles.table_header}>
                            {
                                ['Time Frame', 'Roi', 'AM per $1,000'].map((item, index) => (
                                    <div className={styles.head_col} key={index}>
                                        {item}
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            {
                                body.map((item, i) => (
                                    <div className={styles.box} key={i}>
                                        <div className={styles.row}>
                                            <div className={`${styles.list_col}`}>
                                                {item.time_frame}
                                            </div>
                                            <div className={`${styles.list_col}`}>
                                                {item.roi} %
                                            </div>
                                            <div className={`${styles.list_col}`}>
                                                {item.am_per}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <SizedBox height={24} />
                    <p className={styles.paragraph}>
                        Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.
                    </p>
                    <SizedBox height={24} />
                    <Button onClick={() => { close(); onGetAM() }} style={{ padding: '16px', width: '100%' }} rounded color='dark' endIcon={<ShareDirect />}>Get AM</Button>
                </div>
            </Modal>
        </>
    )
}

export default RoiModal
