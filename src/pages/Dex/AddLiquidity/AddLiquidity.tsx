import { suggestions } from '@app/assets/json/walletSuggestions'
import Container from '@app/compLibrary/Container/Container'
import Header from '@app/compLibrary/Header'
import Paper from '@app/compLibrary/Paper'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import Question from '@app/components/Icons/question/icon'
import SizedBox from '@app/components/Sizedbox'
import { useMatch } from '@tanstack/react-location'
import styles from './AddLiquidity.module.scss'
import Input from '@app/compLibrary/Input'
import Dropdown from '@app/compLibrary/Dropdown'
import { SearchValue } from '@app/compLibrary/Autocomplete/Autocomplete'
import { useState } from 'react'
import IconWrapper from '@app/components/Icons/Wrapper'
import ArrowDown from '@app/components/Icons/arrowDown/icon'
import Plus from '@app/components/Icons/plus/icon'
import Button from '@app/compLibrary/Button'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import AddLiquidityModal from '@app/components/Modals/AddLiquidityModal/AddLiquidityModal'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import { addLiquidity } from '@app/api/Queries/Post'

import { v4 as uuidv4 } from 'uuid';


const AddLiquidity = () => {
    const breadCrumbData = [
        {
            label: 'Dex',
            to: 'dex'
        },
        {
            label: 'Select Token',
            to: 'dex/select-token'
        },
        {
            label: 'Add Liquity',
            to: 'add-liquidity'
        }
    ]
    const { params } = useMatch()
    const token1 = suggestions.find(suggestion => suggestion.id === parseInt(params.token1))
    const token2 = suggestions.find(suggestion => suggestion.id === parseInt(params.token2))

    const [isOpen, setOpen] = useState(false)
    const [isOpenSuccessModal, setOpenSuccessModal] = useState(false)
    const [guid, setGuid] = useState("")

    const [token1Amount, setToken1Amount] = useState<number>()
    const [token2Amount, setToken2Amount] = useState<number>()

    const [activeToken1, setActiveToken1] = useState<SearchValue | undefined>(token1 ? token1 : undefined)
    const [activeToken2, setActiveToken2] = useState<SearchValue | undefined>(token2 ? token2 : undefined)

    const renderDropdownHeader = (token: SearchValue | undefined) => {
        return (
            <Paper className={styles.paper_controlled}>
                <div className={styles.content}>
                    <div className={styles.image}>
                        <img src={token?.src} />
                    </div>
                    <span>{token?.shortName}</span>
                    <IconWrapper><ArrowDown /></IconWrapper>
                </div>
            </Paper>
        )
    }

    const renderModalContent = () => (
        <>
            <Header fontWeight='bold' justify='center' size='big'>Transaction Submitted</Header>
            <Button linkProps={{ to: `/dex/liquidity/${guid}`, replace: true }} color='transparent' style={{ color: 'var(--primary-6)' }}>View Details</Button>
        </>
    )

    const handleAddLiquidity = async () => {
        try {
            if (activeToken1 && activeToken2 && token1Amount && token2Amount) {
                const baseUrl = 'http://localhost:5173'
                const guid = uuidv4()
                setGuid(guid)
                const response = await addLiquidity({
                    id: guid,
                    token1: {
                        amount: token1Amount,
                        shortName: activeToken1.shortName as string,
                        src: `${baseUrl}${activeToken1.src}`
                    },
                    token2: {
                        amount: token2Amount,
                        shortName: activeToken2.shortName as string,
                        src: `${baseUrl}${activeToken2.src}`
                    }
                })
                if (response.id) setOpenSuccessModal(true)
            }
        } catch (error) {
            console.log("add error", error)
        }
    }

    return (
        <>
            <AddLiquidityModal
                open={isOpen}
                close={() => setOpen(false)}
                tokens={{
                    token1: {
                        amount: token1Amount as number,
                        shortName: activeToken1?.shortName as string,
                        src: activeToken1?.src as string
                    },
                    token2: {
                        amount: token2Amount as number,
                        shortName: activeToken2?.shortName as string,
                        src: activeToken2?.src as string
                    }
                }}
                onSuccess={handleAddLiquidity}
            />
            <SuccessModal open={isOpenSuccessModal} close={() => setOpenSuccessModal(false)} renderContent={renderModalContent} />
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />
            <Container>
                <Header justify='center' fontWeight='bold' size='big' endIcon={<Question />}>
                    Add Liquidity
                </Header>
                <SizedBox height={20} />

                <form className={styles.form} onSubmit={e => e.preventDefault()}>
                    <Paper className={styles.field}>
                        <div className={styles.balance}>Balance: {token1?.amount}</div>
                        <div className={styles.amount_field}>
                            <Input value={token1Amount} onChange={(e) => setToken1Amount(parseInt(e.target.value))} type='number' placeholder='Amount' />
                            <span className={styles.max}>Max</span>

                            <Dropdown
                                activeSuggestion={activeToken1}
                                onClick={(value) => setActiveToken1(value)}
                                suggestions={suggestions}
                                renderHeader={() => renderDropdownHeader(activeToken1)}
                                style={{ right: 0, left: 'auto', maxWidth: '100%' }}
                                defaultValue={activeToken1}
                            />
                        </div>
                    </Paper>

                    <SizedBox height={12} />
                    <IconWrapper className={styles.plus_icon}><Plus /></IconWrapper>
                    <SizedBox height={12} />

                    <Paper className={styles.field}>
                        <div className={styles.balance}>Balance: {token1?.amount}</div>
                        <div className={styles.amount_field}>
                            <Input value={token2Amount} onChange={(e) => setToken2Amount(parseInt(e.target.value))} type='number' placeholder='Amount' />
                            <span className={styles.max}>Max</span>

                            <Dropdown
                                activeSuggestion={activeToken2}
                                onClick={(value) => setActiveToken2(value)}
                                suggestions={suggestions}
                                renderHeader={() => renderDropdownHeader(activeToken2)}
                                style={{ right: 0, left: 'auto', maxWidth: '100%' }}
                                defaultValue={activeToken2}
                            />
                        </div>
                    </Paper>
                    <SizedBox height={40} />

                    <div>
                        <Header fontWeight='bold' size='small'>Prices and Pool Share</Header>
                        <SizedBox height={16} />

                        <Paper className={styles.prices_box}>
                            <Row rowGutter={16} colGutter={16}>
                                <Col
                                    grid={{
                                        xxlg: 4,
                                        xlg: 4,
                                        md: 4,
                                        sm: 6
                                    }}
                                >
                                    <div className={styles.item}>
                                        <div className={styles.title}>
                                            165.41
                                        </div>
                                        <div className={styles.value}>
                                            {activeToken1?.shortName} per {activeToken2?.shortName}
                                        </div>
                                    </div>
                                </Col>
                                <Col grid={{
                                    xxlg: 4,
                                    xlg: 4,
                                    md: 4,
                                    sm: 6
                                }}>
                                    <div className={styles.item}>
                                        <div className={styles.title}>
                                            0.00000604446
                                        </div>
                                        <div className={styles.value}>
                                            {activeToken2?.shortName} per {activeToken1?.shortName}
                                        </div>
                                    </div>
                                </Col>
                                <Col grid={{
                                    xxlg: 4,
                                    xlg: 4,
                                    md: 4,
                                    sm: 6
                                }}>
                                    <div className={styles.item}>
                                        <div className={styles.title}>
                                            0.01%
                                        </div>
                                        <div className={styles.value}>
                                            Share of Pool
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Paper>
                    </div>
                    <SizedBox height={40} />
                    <Button rounded style={{ width: '100%' }} onClick={() => {
                        if (token1Amount && token2Amount) setOpen(true)
                    }}>Supply</Button>
                </form>

                <SizedBox height={40} />

                <div className={styles.token_in_wallet}>
                    <Header fontWeight='bold' size='small'>LP Token in your wallet</Header>
                    <SizedBox height={16} />

                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.images}>
                                <div className={styles.image}>
                                    <img src={activeToken1?.src} />
                                </div>
                                <div className={styles.image}>
                                    <img src={activeToken2?.src} />
                                </div>
                            </div>
                            <div className={styles.shorNames}>{activeToken1?.shortName} / {activeToken2?.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.shorNames}>{activeToken1?.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>
                            <div className={styles.shorNames}>{activeToken2?.shortName}</div>
                        </div>
                        <span>0</span>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddLiquidity
