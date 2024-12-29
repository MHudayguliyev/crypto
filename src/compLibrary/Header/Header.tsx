import React, { CSSProperties, ReactNode } from 'react'
import styles from './Header.module.scss'
import classNames from 'classnames/bind'
import { capitalize } from '@utils/helpers'
import IconWrapper from '@app/components/Icons/Wrapper'
const cx = classNames.bind(styles)
interface HeaderProps {
    children: ReactNode
    size?: 'small' | 'middle' | 'big'
    fontWeight?: 'medium' | 'regular' | 'bold'
    className?: string
    style?: CSSProperties
    endIcon?: ReactNode
    /* @default left */
    justify?: 'left' | 'center' | 'right'
}
const Header = (props: HeaderProps) => {
    const {
        children,
        className = "",
        style,
        size = 'middle',
        fontWeight = 'medium',
        endIcon,
        justify = 'left'
    } = props
    return (
        <div style={style} className={`${cx({
            header: true,
            flexible: !!endIcon,
            [`justify${capitalize(justify)}`]: true,
            [`size${capitalize(size)}`]: true,
            [`font${capitalize(fontWeight)}`]: true,
        })} ${className}`}>
            {children}
            {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
        </div>
    )
}

export default Header
