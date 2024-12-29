import { CSSProperties, ReactNode } from 'react'
import styles from './Paper.module.scss'
interface PaperProps {
    className?: string
    style?: CSSProperties
    children: ReactNode
    onClick?: Function
}
const Paper = (props: PaperProps) => {
    const { className = "", style, children, onClick } = props
    return (
        <div onClick={() => onClick && onClick()} className={`${className} ${styles.paper}`} style={style}>
            {children}
        </div>
    )
}

export default Paper
