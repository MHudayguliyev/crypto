import React, { ReactNode, useRef, useState } from 'react'
import styles from './Accordion.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button'
import ArrowDown from '@app/components/Icons/arrowDown/icon'
import ArrowUp from '@app/components/Icons/arrowUp/icon'

interface AccordionProps {
    children: ReactNode
    /** @default false*/
    expanded?: boolean
}
const cx = classNames.bind(styles)
const Accordion = (props: AccordionProps) => {
    const { children, expanded = false } = props

    const contentRef = useRef<null | HTMLParagraphElement>(null)
    const [isExpanded, setIsExpanded] = useState(expanded);

    return (

        <div className={styles.accordion}>
            <Button onClick={() => setIsExpanded(!isExpanded)} color='transparent' style={{ width: '100%', color: 'var(--primary-6)' }} endIcon={isExpanded ? <ArrowUp /> : <ArrowDown />}>
                {
                    isExpanded ? 'Hide' : 'Details'
                }
            </Button>

            <div ref={contentRef} style={{
                height: isExpanded ? contentRef.current?.scrollHeight : '0px'
            }} className={cx({
                notExpanded: !isExpanded,
                expanded: isExpanded,
            })}>
                {children}
            </div>
        </div>
    )
}

export default Accordion
