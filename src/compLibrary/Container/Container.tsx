import React, { CSSProperties, ReactNode } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
    className?: string
    style?: CSSProperties
    children: ReactNode
    /**@default middle */
    size?: 'small' | 'middle' | 'big'
}
const Container = (props: ContainerProps) => {
    const { className = "", size = "middle", style, children } = props
    return (
        <div style={style} className={`${styles.main} ${styles[size]} ${className}`}>
            {children}
        </div>
    )
}

export default Container
