import { ReactNode } from 'react'
import styles from './Wrapper.module.scss'
const IconWrapper = ({ children, onClick, className = "" }: { children: ReactNode, onClick?: Function, className?: string }) => {
    return (
        <span className={`${styles.icon} ${className}`} onClick={() => onClick && onClick()}>
            {children}
        </span>
    )
}

export default IconWrapper
