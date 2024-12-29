import React, { useState } from 'react'
import styles from './SelectToken.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Container from '@app/compLibrary/Container/Container'
import Header from '@app/compLibrary/Header'
import Question from '@app/components/Icons/question/icon'
import Dropdown from '@app/compLibrary/Dropdown'
import { suggestions } from '@app/assets/json/walletSuggestions'
import { SearchValue } from '@app/compLibrary/Autocomplete/Autocomplete'
import Paper from '@app/compLibrary/Paper'
import IconWrapper from '@app/components/Icons/Wrapper'
import ArrowDown from '@app/components/Icons/arrowDown/icon'
import Plus from '@app/components/Icons/plus/icon'
import Button from '@app/compLibrary/Button'
const SelectToken = () => {
    const breadCrumbData = [
        {
            label: 'Dex',
            to: 'dex'
        },
        {
            label: 'Select Token',
            to: 'select-token'
        },
    ]
    const [activeToken1, setActiveToken1] = useState<SearchValue>()
    const [activeToken2, setActiveToken2] = useState<SearchValue>()

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

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <Container>
                <Header justify='center' fontWeight='bold' size='big' endIcon={<Question />}>
                    Add Liquidity
                </Header>
                <SizedBox height={24} />

                <div className={styles.select_token}>
                    <Dropdown
                        activeSuggestion={activeToken1}
                        onClick={(value) => setActiveToken1(value)}
                        suggestions={suggestions}
                        renderHeader={() => renderDropdownHeader(activeToken1)}
                        style={{ right: 0, left: 'auto', maxWidth: '100%', top: '80px' }}
                    />
                </div>
                <SizedBox height={12} />
                <IconWrapper className={styles.plus_icon}><Plus /></IconWrapper>
                <SizedBox height={12} />

                <div className={styles.select_token}>
                    <Dropdown
                        activeSuggestion={activeToken2}
                        onClick={(value) => setActiveToken2(value)}
                        suggestions={suggestions}
                        renderHeader={() => renderDropdownHeader(activeToken2)}
                        style={{ right: 0, left: 'auto', maxWidth: '100%', top: '80px' }}
                        defaultValue={suggestions[1]}
                    />
                </div>
                <SizedBox height={40} />

                <p className={styles.paragraph}>Select a token to find your liquidity.</p>

                <Button linkProps={{ to: `${activeToken1?.id}/${activeToken2?.id}` }} style={{ width: '100%', padding: '16px' }} rounded disabled={(!activeToken1?.value && !activeToken2?.value)}>Add Liquidity</Button>

            </Container>
        </>
    )
}

export default SelectToken
