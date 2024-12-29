import Container from '@app/compLibrary/Container/Container'
import Paper from '@app/compLibrary/Paper'
import Tabs, { TabType } from '@app/components/Tabs/Tabs'
import React, { useState } from 'react'
import styles from './Dex.module.scss'
import classNames from 'classnames/bind'

import Input from '@app/compLibrary/Input'
import ArrowDown from '@app/components/Icons/arrowDown/icon'
import { suggestions } from '@app/assets/json/walletSuggestions'
import { SearchValue } from '@app/compLibrary/Autocomplete/Autocomplete'
import Dropdown from '@app/compLibrary/Dropdown'
import SizedBox from '@app/components/Sizedbox'
import Swap from '@app/components/Icons/swap/icon'
import Button from '@app/compLibrary/Button'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import { useNavigate } from '@tanstack/react-location'
import moment from 'moment'
import Header from '@app/compLibrary/Header'
import Settings from '@app/components/Icons/settings/icon'
import ClockSm from '@app/components/Icons/clockSm/icon'
import Question from '@app/components/Icons/question/icon'
import IconWrapper from '@app/components/Icons/Wrapper'
import Plus from '@app/components/Icons/plus/icon'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import { useQuery } from '@tanstack/react-query'
import { GetLiquidities } from '@app/api/Queries/Getters'

const tabs = [
    {
        label: "Swap",
        value: 'swap'
    },
    {
        label: "Add Liquidity",
        value: 'add-liqudity'
    }
]
const cx = classNames.bind(styles)
const Dex = () => {
    const navigate = useNavigate()
    const [isModalOpen, setModalOpen] = useState(false)
    const [isSettingsOpen, setSettingsOpen] = useState(false)
    const [active, setActive] = useState<TabType>(tabs[0])
    const [activeSuggestion, setActiveSuggestion] = useState<SearchValue>()
    const [activeSuggestion2, setActiveSuggestion2] = useState<SearchValue>()
    const [inputUp, setInputUp] = useState("")
    const [inputDown, setInputDown] = useState("")
    const [slippageValue, setSlippageValue] = useState("")
    const [txValue, setTxValue] = useState("")


    const renderDropdownHeader = (activeSuggestion: SearchValue | undefined) => (
        <div className={styles.actions}>
            <div className={styles.image}>
                <img src={activeSuggestion?.src} />
            </div>
            <span className={styles.text}>{activeSuggestion?.shortName}</span>
            <span className={styles.icon}><ArrowDown /></span>
        </div>
    )
    const renderModalContent = () => (
        <>
            <div className={styles.header}>
                Transaction Submitted
            </div>
            <Button onClick={() => navigate({ to: `transaction-history?date=${moment().format('HH:mm,MMMM D,YYYY')}&tokenId=${activeSuggestion?.id}&amount=${inputUp}` })} style={{ color: 'var(--primary-6)' }} color='transparent'>View Details</Button>
        </>
    )

    //query
    const {
        data
    } = useQuery({
        queryKey: ['Liquidities', active],
        queryFn: () => GetLiquidities(),
        enabled: active.value === 'add-liqudity'
    })

    return (
        <>
            <SuccessModal
                open={isModalOpen}
                close={() => setModalOpen(false)}
                renderContent={renderModalContent}
            />
            <Container>
                <Tabs className={styles.tabs_controlled} grid={{ xxlg: 6, xlg: 6, md: 6, sm: 12 }} data={tabs} active={active} onChange={(value) => setActive(value)} />
                <SizedBox height={24} />

                {
                    active.value === 'swap' ?
                        <>
                            <Paper>
                                <div className={styles.labels}>
                                    <span>You Pay</span>
                                    <span>Balance: 209.99</span>
                                </div>
                                <div className={styles.content}>
                                    <Input value={inputUp} onChange={(e) => setInputUp(e.target.value)} type='text' placeholder='0.000' />
                                    <div>
                                        <Dropdown
                                            activeSuggestion={activeSuggestion}
                                            onClick={(value) => setActiveSuggestion(value)}
                                            suggestions={suggestions}
                                            renderHeader={() => renderDropdownHeader(activeSuggestion)}
                                            style={{ right: 0, left: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </Paper>
                            <SizedBox height={8} />
                            <span className={styles.icon}><Swap /></span>
                            <SizedBox height={8} />

                            <Paper>
                                <div className={styles.labels}>
                                    <span>You Get</span>
                                    <span>Balance: 10,000.00</span>
                                </div>
                                <div className={styles.content}>
                                    <Input value={inputDown} onChange={(e) => setInputDown(e.target.value)} type='text' placeholder='0.000' />
                                    <div>
                                        <Dropdown
                                            activeSuggestion={activeSuggestion2}
                                            onClick={(value) => setActiveSuggestion2(value)}
                                            suggestions={suggestions}
                                            renderHeader={() => renderDropdownHeader(activeSuggestion2)}
                                            style={{ right: 0, left: 'auto' }}
                                        />
                                    </div>
                                </div>
                            </Paper>
                            <SizedBox height={8} />

                            <span className={styles.aciklama}>1 {activeSuggestion?.shortName} ≈ 35.78 {activeSuggestion2?.shortName}</span>

                            <SizedBox height={24} />
                            <Button onClick={() => setModalOpen(true)} style={{ width: '100%', padding: '16px' }} disabled={inputUp === "" && inputDown === ""} rounded color={(inputUp !== "" && inputDown !== "") ? 'theme' : 'gray'}>Swap</Button>
                        </> :
                        <>

                            <Paper>
                                <div className={styles.top}>
                                    <Header size='big' fontWeight='bold'>Liquidity</Header>
                                    <div className={styles.icons}>
                                        <IconWrapper className={cx({
                                            settings_icon: true,
                                            is_settings_open: isSettingsOpen
                                        })} onClick={() => setSettingsOpen(!isSettingsOpen)}><Settings /></IconWrapper>
                                        <IconWrapper><ClockSm /></IconWrapper>
                                    </div>

                                    <Paper className={cx({
                                        settings: true,
                                        open_settings: isSettingsOpen
                                    })}>
                                        <div className={styles.slippage_tolerance}>
                                            <div className={styles.center_header}>
                                                <Header style={{ width: 'auto' }} size='small' fontWeight='bold'>Slippage Tolerance</Header>
                                                <IconWrapper><Question /></IconWrapper>
                                            </div>

                                            <Row rowGutter={12} colGutter={12}>
                                                <Col
                                                    grid={{
                                                        xxlg: 4,
                                                        xlg: 4,
                                                        md: 4,
                                                        sm: 6
                                                    }}
                                                >
                                                    <div className={styles.box}>
                                                        <span>0.1%</span>
                                                    </div>
                                                </Col>
                                                <Col grid={{
                                                    xxlg: 4,
                                                    xlg: 4,
                                                    md: 4,
                                                    sm: 6
                                                }}>
                                                    <div className={styles.box}>
                                                        <span>0.5%</span>
                                                    </div>
                                                </Col>
                                                <Col grid={{
                                                    xxlg: 4,
                                                    xlg: 4,
                                                    md: 4,
                                                    sm: 6
                                                }}>
                                                    <div className={styles.box}>
                                                        <span>1%</span>
                                                    </div>
                                                </Col>
                                            </Row>

                                            <Paper className={`${styles.field} ${styles.border}`}>
                                                <Input type='number' value={slippageValue} onChange={(e) => setSlippageValue(e.target.value)} />
                                                <span>%</span>
                                            </Paper>
                                        </div>

                                        <div className={styles.tx_deadline}>
                                            <div className={styles.center_header}>
                                                <Header style={{ width: 'auto' }} size='small' fontWeight='bold'>Tx Deadline</Header>
                                                <IconWrapper><Question /></IconWrapper>
                                            </div>
                                            <Paper className={styles.field}>
                                                <Input type='number' value={txValue} onChange={(e) => setTxValue(e.target.value)} />
                                                <span>Minutes</span>
                                            </Paper>
                                        </div>
                                    </Paper>
                                </div>

                                <div className={styles.center}>
                                    <div className={styles.center_header}>
                                        <Header style={{ width: 'auto' }} size='small' fontWeight='bold'>Your liqudity</Header>
                                        <IconWrapper><Question /></IconWrapper>
                                    </div>
                                    <>
                                        {
                                            data?.length ?
                                                <div className={styles.liquidities}>
                                                    {
                                                        data.map(item => (
                                                            <Paper onClick={() => navigate({ to: `/dex/liquidity/${item.id}` })} key={item.id} className={styles.liquidity}>
                                                                <div className={styles.liquidity_top}>
                                                                    <div className={styles.images}>
                                                                        <div className={styles.image}>
                                                                            <img src={item.token1?.src} />
                                                                        </div>
                                                                        <div className={styles.image}>
                                                                            <img src={item.token2?.src} />
                                                                        </div>
                                                                    </div>
                                                                    <span className={styles.id}>{item.id}</span>
                                                                </div>
                                                                <div className={styles.amounts}>
                                                                    <span>{item.token1?.amount} {item.token1?.shortName}</span>
                                                                    <span>/ {item.token2?.amount} {item?.token2?.shortName}</span>
                                                                </div>
                                                            </Paper>
                                                        ))
                                                    }
                                                </div> :
                                                <Paper className={styles.not_found}>
                                                    <span>No liqudity found</span>
                                                </Paper>
                                        }
                                    </>

                                    <p>
                                        Don't see a pool you joined? <span>  Import it</span>
                                    </p>
                                    <p>
                                        Or, if you staked your AM-LP tokens in a farm, unstake them to see them here.
                                    </p>
                                </div>

                                <div className={styles.bottom}>
                                    <p>Add liquidity to receive AM-LP tokens</p>
                                    <Button linkProps={{ to: 'select-token' }} rounded startIcon={<Plus />}>Add Liquidity</Button>
                                </div>
                            </Paper>
                        </>
                }

            </Container>
        </>
    )
}

export default Dex
