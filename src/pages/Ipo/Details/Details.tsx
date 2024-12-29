import React, { useEffect, useState } from 'react'
import styles from './Details.module.scss'
import classNames from 'classnames/bind'
import Container from '@app/compLibrary/Container/Container'
import Paper from '@app/compLibrary/Paper'
import { useMatch } from '@tanstack/react-location'
import { ipo_data } from '@app/assets/json/ipo'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Button from '@app/compLibrary/Button'
import Accordion from '@app/compLibrary/Accordion'
import ShareDirect from '@app/components/Icons/shareDirect/icon'
import Header from '@app/compLibrary/Header'
import Input from '@app/compLibrary/Input'
import { setIn } from 'formik'

const cx = classNames.bind(styles)
const IpoDetails = () => {
    const { params: { ipoId } } = useMatch()
    const ipo = ipo_data.find(item => item.id === parseInt(ipoId))

    const breadCrumbData = [
        {
            label: 'Ipo',
            to: 'ipo'
        },
        {
            label: ipo?.short_name as string,
            to: `ipo/${ipo?.id}`
        },
    ]
    const [mode, setMode] = useState<'approve' | 'buy' | 'claim'>('approve')
    const [input, setInput] = useState<number | any>(0)
    const [isClaimed, setClaimed] = useState<boolean>(false)

    useEffect(() => {
        if (mode === 'claim') setInput(0)
    }, [mode])
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />
            <Container>
                <Paper className={styles.top}>
                    <div className={styles.image} />
                    <SizedBox height={24} />

                    <div className={styles.name_block}>
                        <div className={styles.name}>{ipo?.name}</div>
                        <SizedBox height={8} />
                        <p className={styles.description}>{ipo?.description}</p>
                    </div>
                    <SizedBox height={24} />

                    <div className={styles.info}>
                        <div className={styles.item}>
                            <label>Launch time:</label>
                            <div className={styles.value}>{ipo?.launch_time}</div>
                        </div>
                        <div className={styles.item}>
                            <label>For sale:</label>
                            <div className={styles.value}>{ipo?.for_sale}</div>
                        </div>
                        <div className={styles.item}>
                            <label>To raise (USD):</label>
                            <div className={styles.value}>${ipo?.to_raise}</div>
                        </div>
                        <div className={styles.item}>
                            <label>Total raised (% of target):</label>
                            <div className={styles.value}>{ipo?.total_raised}%</div>
                        </div>
                        <div className={styles.item}>
                            <label>Start block:</label>
                            <div className={styles.value}>{ipo?.start_block}</div>
                        </div>
                    </div>
                    <SizedBox height={24} />

                    {mode !== 'approve' &&
                        <>
                            <Paper className={cx({
                                field_paper: true,
                                field_paper_align_left: mode === 'claim'
                            })}>
                                <p className={styles.description}>Available: 4.22 AM-BNB LP</p>
                                <div className={styles.field}>
                                    <Input readOnly={isClaimed} type={isClaimed ? 'text' : 'number'} value={input as number} onChange={(e) => setInput(parseInt(e.target.value))} />
                                    {mode === 'buy' && <span className={styles.max}>Max</span>}
                                </div>
                            </Paper>
                            <span className={`${styles.description} ${styles.max_percentage}`}>
                                {mode === 'buy' ? '0.05%' : "You'll be refunded any axcess tokens when you claim"}
                            </span>
                            <SizedBox height={24} />
                        </>
                    }
                    <Button onClick={() => {
                        if (mode === 'approve') {
                            setMode('buy')
                        } else if (input) {
                            if (mode === 'buy') {
                                console.log('comes toe her to a claim mode')
                                setMode("claim")
                            } else {
                                setClaimed(true)
                                setInput('Claimed')
                            }
                        }
                    }} rounded style={{ width: '100%', padding: '16px' }} disabled={isClaimed} color={isClaimed ? 'gray' : 'theme'}>
                        {
                            mode === 'approve' ? 'Approve' :
                                mode === 'buy' ? 'Buy' :
                                    'Claim'
                        }
                    </Button>
                    <SizedBox height={24} />
                    <Accordion>
                        <p className={styles.description}>
                            AMDS is a Fork from PancakeBunny and similar to how PancakeBunny is to PancakeSwap, AMDS is able to be built on multiple platforms but to start off, we will build on AM. The DeFi ecosystem is a robust landscape, with multiple Dapps looking to participate in certain segments of the market. From lending, to gamification, to NFT marketplaces, the goal of AMDS is to capture interest through the use of yield optimizing for the Binance Smart Chain. Through automation and auto-compounding, AMDS allows individuals to reap the benefits of compounding without any additional steps. This makes for a easy way to increase yields on your assets as there will be minimal action taken. There are no hidden fees or extra charges when you get on the platform. Sit back and let AMDS do the work for you!
                        </p>
                    </Accordion>
                    <SizedBox height={8} />
                    <Button endIcon={<ShareDirect />} rounded color='transparent' style={{ width: '100%', padding: '16px', color: 'var(--primary-6)' }}>View Project</Button>
                </Paper>
                <SizedBox height={24} />


                <div className={styles.takepart_faq}>
                    <Header fontWeight='bold'>How to take part?</Header>
                    <SizedBox height={16} />

                    <div className={styles.step}>
                        <Header fontWeight='bold' size='small'>STEP 1. Before Sale</Header>
                        <ul>
                            <li className={styles.description}>Buy AM and BNB tokens</li>
                            <li className={styles.description}>Get AM-BNB LP tokens by adding AM and BNB liquidity</li>
                        </ul>
                        <div className={styles.btn_group}>
                            <Button linkProps={{ to: '/wallet/buy' }} endIcon={<ShareDirect />} color='transparent' style={{ color: 'var(--primary-6)' }}>Buy AM</Button>
                            <Button linkProps={{ to: '/wallet/buy' }} endIcon={<ShareDirect />} color='transparent' style={{ color: 'var(--primary-6)' }}>Get LP Tokens</Button>
                        </div>
                    </div>

                    <div className={styles.step}>
                        <Header fontWeight='bold' size='small'>STEP 2. During Sale</Header>
                        <ul>
                            <li className={styles.description}>While the sale is live, commit your AM-BNB LP tokens to buy the IPO tokens</li>
                        </ul>
                    </div>
                    <div className={styles.step}>
                        <Header fontWeight='bold' size='small'>STEP 3. After Sale</Header>
                        <ul>
                            <li className={styles.description}>Claim the tokens you purchased, along with any unspent funds.</li>
                            <li className={styles.description}>Done!</li>
                        </ul>
                        <Button color='transparent' style={{ color: 'var(--primary-6)', textDecoration: 'underline' }}>Readmore</Button>
                    </div>

                </div>
                <SizedBox height={24} />
                <div className={styles.launch_ipo}>
                    <Header fontWeight='bold' size='small'>Want To Launch Your Own IPO?</Header>
                    <SizedBox height={16} />
                    <p className={styles.description}>Launch your project with AM, Binance Smart Chain's fastest growing AM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on BSC.</p>
                    <SizedBox height={16} />
                    <Button rounded style={{ width: '100%' }} linkProps={{ to: `/ipo/${ipo?.id}/app-form` }}>Apply to Launch</Button>
                </div>
                <SizedBox height={24} />
            </Container>
        </>
    )
}

export default IpoDetails
