import { stats } from '@app/assets/json/stats'
import Col from '@app/compLibrary/Grid/Col'
import Row from '@app/compLibrary/Grid/Row'
import Eye from '@app/components/Icons/eye/icon'
import SizedBox from '@app/components/Sizedbox'
import StatsCard from '@app/components/StatsCard/StatsCard'
import styles from './Home.module.scss'
import { farms } from '@app/assets/json/farms'

const Home = () => {
    return (
        <>
            <Row
                rowGutter={16}
                colGutter={16}
            >
                {
                    stats.map((stat, index) => (
                        <Col
                            grid={{
                                xxlg: 4,
                                xlg: 4,
                                lg: 6,
                                md: 6,
                                sm: 12
                            }}
                        >
                            <StatsCard
                                name={stat.name}
                                percentage={stat.percentage}
                                isJungle
                                special={stat.special}
                                icon={index === 0 && <Eye />}
                                removeBottomBtn={index === 0 || stat.special}
                            />
                        </Col>
                    ))
                }
            </Row>
            <SizedBox height={24} />


            <h1 className={styles.header}>
                Top Farms
            </h1>
            <SizedBox height={16} />
            <Row
                rowGutter={16}
                colGutter={16}
            >
                {
                    farms.map((stat, index) => (
                        <Col
                            grid={{
                                xxlg: 4,
                                xlg: 4,
                                md: 6,
                                sm: 12
                            }}
                        >
                            <StatsCard
                                name={stat.name}
                                percentage={stat.percentage}
                                liqudity={stat.liquidity}
                                isFarm
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    )
}

export default Home
