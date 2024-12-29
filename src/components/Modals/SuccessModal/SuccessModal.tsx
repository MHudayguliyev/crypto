import React from 'react'
import CommonModalTypes from '../CommonModalI'
import Modal from '@app/compLibrary/Modal'
import styles from './SuccessModal.module.scss'
import CheckSelect from '@app/components/Icons/checkSelect/icon'
import SizedBox from '@app/components/Sizedbox'

interface ModalProps extends CommonModalTypes {
    renderContent: () => React.ReactNode
}
const SuccessModal = (props: ModalProps) => {
    const {
        open,
        close,
        renderContent
    } = props
    return (
        <>
            <Modal
                isOpen={open}
                close={close}
                className={styles.successModal}
            >
                <div className={styles.content}>
                    <span className={styles.icon}><CheckSelect /></span>
                    {renderContent()}
                </div>

            </Modal>
        </>
    )
}

export default SuccessModal
