import { ipo_data } from '@app/assets/json/ipo'
import { useMatch } from '@tanstack/react-location'
import styles from './AppForm.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Container from '@app/compLibrary/Container/Container'
import Header from '@app/compLibrary/Header'
import Paper from '@app/compLibrary/Paper'
import Input from '@app/compLibrary/Input'
import { useState } from 'react'
import IconWrapper from '@app/components/Icons/Wrapper'
import RadioBoxFilled from '@app/components/Icons/radioboxFilled/icon'
import RadioBox from '@app/components/Icons/radiobox/icon'

const radioVariants = [
    {
        label: 'Farm',
        value: 'farm'
    },
    {
        label: 'Jungle',
        value: 'jungle'
    },
    {
        label: 'IPO',
        value: 'ipo'
    },
]
const radioAudited = [
    {
        label: 'Yes',
        value: 'yes'
    },
    {
        label: 'No',
        value: 'no'
    },
    {
        label: 'In progress',
        value: 'in-progress'
    },
]
const AppForm = () => {
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
        {
            label: ipo?.short_name as string,
            to: `ipo/${ipo?.id}/app-form`
        },
    ]

    const [activeIndex1, setActiveIndex1] = useState<number>(-1)
    const [activeIndex2, setActiveIndex2] = useState<number>(-1)

    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <Container>
                <Header justify='center' fontWeight='bold' size='big'>
                    AM Application Forms
                </Header>
                <SizedBox height={40} />
                <form className={styles.form}>
                    <Header fontWeight='bold' size='small'>
                        <span className={styles.starcik}>*</span> Obligatory
                    </Header>
                    <SizedBox height={16} />
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder="Email *" />
                    </Paper>

                    <Paper className={`${styles.field} ${styles.radiobox}`}>
                        <Header fontWeight='bold' size='small'>
                            What do you want to apply for? <span className={styles.starcik}>*</span>
                        </Header>
                        <ul className={styles.radioVariants}>
                            {
                                radioVariants.map((item, index) => (
                                    <li key={item.value} className={styles.item} onClick={() => setActiveIndex1(index)}>
                                        <IconWrapper>
                                            {activeIndex1 === index ? <RadioBoxFilled /> : <RadioBox />}
                                        </IconWrapper>
                                        {item.label}
                                    </li>
                                ))
                            }
                        </ul>
                    </Paper>
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder='Project Name *' />
                    </Paper>
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder='Ticker Symbol *' />
                    </Paper>
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder='Website *' />
                    </Paper>
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder='Twitter *' />
                    </Paper>

                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='Project Description *' />
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='What stage are you at? Is your token in circulation? *' />
                    <Paper className={`${styles.field} ${styles.radiobox}`}>
                        <Header fontWeight='bold' size='small'>
                            Have you been audited? <span className={styles.starcik}>*</span>
                        </Header>
                        <ul className={styles.radioVariants}>
                            {
                                radioAudited.map((item, index) => (
                                    <li key={item.value} className={styles.item} onClick={() => setActiveIndex2(index)}>
                                        <IconWrapper>
                                            {activeIndex2 === index ? <RadioBoxFilled /> : <RadioBox />}
                                        </IconWrapper>
                                        {item.label}
                                    </li>
                                ))
                            }
                        </ul>
                    </Paper>
                    <Paper className={styles.field}>
                        <Input type='text' autoComplete='off' placeholder='If audited, by which auditor?' />
                    </Paper>
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='(If Farm) What can you provide for us?' />
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='(If Jungle) What budget are you willing to provide for a jungle?' />
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='(If IPO) How much are you looking to aise?' />
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='How can we contact you? *' />
                    <textarea autoComplete='off' className={`${styles.field} ${styles.textarea}`} placeholder='Anything else we should know? *' />
                </form>
            </Container>
        </>
    )
}

export default AppForm
