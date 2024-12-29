import React, { CSSProperties, ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'
import classNames from 'classnames/bind'

interface MOdalProps {
    isOpen: boolean
    close: Function
    children: ReactNode
    className?: string
    style?: CSSProperties
}

const cx = classNames.bind(styles);
const Modal = (props: MOdalProps) => {
    const {
        isOpen,
        close,
        children,
        className = '',
        style,
    } = props;

    useEffect(() => {
        if (isOpen)
            document.getElementsByTagName('body')[0].classList.add('modal-opened');
        else
            document.getElementsByTagName('body')[0].classList.remove('modal-opened');
    }, [isOpen])

    const modalContent = isOpen ? (
        <div className={styles.modal}>
            <div className={`${cx({
                modalContent: true,
                modalAnimation: isOpen
            })}`}>
                <div className={`${className} ${styles.modalBody}`}>
                    {children}
                </div>
            </div>
        </div>
    ) : null

    return ReactDOM.createPortal(
        <>
            {modalContent}
        </>,
        document.getElementById('modal-root')!
    );
}

export default Modal
