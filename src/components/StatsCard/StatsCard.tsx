import React, { useMemo } from 'react'
import styles from './StatsCard.module.scss'
import classNames from 'classnames/bind'
import Button from '@app/compLibrary/Button'

import logoCoin from '@app/assets/images/logo-coin.png'
import dollarCoin from '@app/assets/images/coin-icon (1).png'

import Header from '@app/compLibrary/Header'
import SizedBox from '../Sizedbox'

interface CardProps {
    isJungle?: boolean
    isFarm?: boolean
    name: string
    icon?: React.ReactNode
    percentage: string
    liqudity?: string
    removeBottomBtn?: boolean
    isRenderTopRightActions?: boolean
    special?: boolean
    renderTopRightActions?: () => React.ReactNode
    getCoin1?: () => React.ReactNode
    getCoin2?: () => React.ReactNode
}
const cx = classNames.bind(styles)
const StatsCard = (props: CardProps) => {
    const {
        isJungle = false,
        isFarm = false,
        removeBottomBtn = false,
        name,
        icon,
        percentage,
        liqudity,
        isRenderTopRightActions = false,
        special = false,
        renderTopRightActions
    } = props

    const mainContent = useMemo(() => {
        return (
            <div>
                {
                    (isJungle && !special) ?
                        <div className={cx({
                            jungle: true,
                            jungle_flexible: isRenderTopRightActions
                        })}>
                            <div>
                                <div className={styles.top}>
                                    <div className={styles.name}>{name}</div>
                                    {icon && <span className={styles.icon}>{icon}</span>}
                                </div>
                                <div className={styles.percentage}>{percentage} % APR</div>
                            </div>
                            {(isRenderTopRightActions && renderTopRightActions) && renderTopRightActions()}
                        </div> :
                        isFarm ?
                            <div className={styles.farm}>
                                <div className={styles.top}>
                                    <div className={styles.topContent}>
                                        <div className={styles.coins}>
                                            <div className={styles.coin}>
                                                <img src={logoCoin} />
                                            </div>
                                            <div className={styles.coin}>
                                                <img src={dollarCoin} />
                                            </div>
                                        </div>
                                        <span>HOT</span>
                                    </div>
                                    <div className={styles.bottomContent}>
                                        <div className={styles.name}>{name}</div>
                                        <div className={styles.liqudity}>Liquidity {liqudity}</div>
                                    </div>
                                </div>
                                <div className={styles.percentage}>{percentage} % APR</div>
                            </div> :
                            special ?
                                <div className={styles.special_card}>


                                    <div className={styles.start_earning}>
                                        <Header fontWeight='bold'>Stake your AM in exchange for more tokens </Header>
                                        <SizedBox height={16} />
                                        <Button style={{ padding: '8px 16px' }} rounded>Earn Crypto</Button>
                                    </div>

                                    <div className={styles.box}>
                                        <div className={styles.gradient_left} />
                                        <div className={styles.gradient_right} />
                                        <div className={styles.box_header}>
                                            <div className={styles.box_image}>
                                                <img src={logoCoin} />
                                            </div>
                                            <Header fontWeight='bold' size='middle'>Earn AM</Header>
                                        </div>
                                        <Header justify='center' fontWeight='bold' size='middle' className={styles.apr}>{percentage} % APR</Header>
                                    </div>
                                </div> :
                                <div className={styles.noneof}>
                                    <div className={styles.head}>
                                        Stake your AM in exchange for even more tokens
                                    </div>
                                    <Button rounded>Star Earning Crypto</Button>
                                </div>
                }
            </div>
        )
    }, [isJungle, isFarm, special, removeBottomBtn, percentage, name, icon])

    return (
        <div className={styles.card}>
            {mainContent}
            {!special && !removeBottomBtn && <SizedBox height={24} />}
            {
                (isJungle || isFarm) && (!removeBottomBtn && !special) &&
                <div className={styles.bottom}>
                    <Button linkProps={{ to: `${isJungle ? '/jungle' : '/farm'}` }} style={{ width: '100%' }} rounded color={isJungle ? 'dark' : 'theme'}>{isJungle ? 'Start Jungle' : 'Farm'}</Button>
                </div>
            }
        </div >
    )
}

export default StatsCard
