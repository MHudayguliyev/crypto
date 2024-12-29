import React, { useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './Tabs.module.scss'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
const cx = classNames.bind(styles)
export type TabType = {
    label: string
    value: string
}
type ColType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

interface CommonGrid {
    xs?: ColType
    sm?: ColType
    md?: ColType
    lg?: ColType
    xlg?: ColType
    xxlg?: ColType
}
interface TabProps {
    data: Array<TabType>
    className?: string
    active: TabType
    onChange: (value: TabType) => void
    grid?: CommonGrid
}
const Tabs = (props: TabProps) => {
    const { data, className = "", active, onChange, grid } = props
    useEffect(() => {
        onChange(data[0])
    }, [])
    return (
        <div className={`${styles.tabs_filled} ${className}`}>
            <Row>
                {
                    data.map((item) => (
                        <Col grid={grid ? { ...grid } : { xxlg: 4, xlg: 4, md: 6, sm: 12 }} key={item.value}>
                            <div onClick={() => onChange(item)} className={cx({
                                item: true,
                                active: active.value === item.value
                            })} >
                                {item.label}
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Tabs
