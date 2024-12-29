import React from 'react'
import styles from './Seed.module.scss'
import classNames from 'classnames/bind'

interface SeedProps {
    disabled?: boolean
    index?: number
    label: string
    value: string
    onClick?: (value: string) => void
}
const cx = classNames.bind(styles)
const Seed = ({ disabled = false, label, value, index, onClick }: SeedProps) => {
    return (
        <button disabled={disabled} onClick={() => onClick && onClick(value)} className={cx({
            seed: true,
            disabled: disabled
        })}>
            <span>
                {index ? `${index}. ` : null}
                {label}
            </span>
        </button>
    )
}

export default Seed
