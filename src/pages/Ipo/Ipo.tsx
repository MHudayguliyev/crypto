import React, { useState } from 'react'
import styles from './Ipo.module.scss'
import Tabs, { TabType } from '@app/components/Tabs/Tabs'
import SizedBox from '@app/components/Sizedbox'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import { ipo_data } from '@app/assets/json/ipo'
import IpoCard from '@app/components/IpoCard/IpoCard'

const tabs = [
    {
        label: "Next Ipo's",
        value: 'next'
    },
    {
        label: "Past Ipo's",
        value: 'past'
    }
]
const Ipo = () => {
    const [active, setActive] = useState<TabType>(tabs[0])
    return (
        <>
            <div className={styles.top__actions}>
                <Tabs grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }} className={styles.tabs_controlled} data={tabs} active={active} onChange={(value) => setActive(value)} />
            </div>
            <SizedBox height={24} />

            <Row colGutter={16} rowGutter={16}>
                {
                    ipo_data.map((item, i) => (
                        <Col key={i} grid={{ xxlg: 4, xlg: 4, lg: 6, md: 6, sm: 12 }}>
                            <IpoCard ipo={item} />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Ipo
