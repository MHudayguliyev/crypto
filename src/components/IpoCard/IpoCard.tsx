import React from 'react'
import styles from './IpoCard.module.scss'
import classNames from 'classnames/bind'
import { Ipo } from '@app/types'
import SizedBox from '../Sizedbox'
import Button from '@app/compLibrary/Button'
import Paper from '@app/compLibrary/Paper'
import { useNavigate } from '@tanstack/react-location'

interface IpoCardProps {
    ipo: Ipo
}
const cx = classNames.bind(styles)
const IpoCard = (props: IpoCardProps) => {
    const navigate = useNavigate()
    const { ipo } = props
    return (
        <Paper className={styles.card}>
            <div className={styles.content}>
                <div className={styles.image} />
                <SizedBox height={24} />

                <div className={styles.name_block}>
                    <div className={styles.name}>{ipo.name}</div>
                    <SizedBox height={8} />
                    <p className={styles.description}>{ipo.description}</p>
                </div>
                <SizedBox height={24} />

                <div className={styles.info}>
                    <div className={styles.item}>
                        <label>Launch time:</label>
                        <div className={styles.value}>{ipo.launch_time}</div>
                    </div>
                    <div className={styles.item}>
                        <label>For sale:</label>
                        <div className={styles.value}>{ipo.for_sale}</div>
                    </div>
                    <div className={styles.item}>
                        <label>To raise (USD):</label>
                        <div className={styles.value}>${ipo.to_raise}</div>
                    </div>
                </div>

                <SizedBox height={24} />
                <Button disabled={ipo.status === 'ended'} onClick={() => navigate({ to: `/ipo/${ipo.id}` })} style={{ width: '100%' }} rounded color={ipo.status === 'open' ? 'theme' : ipo.status === 'open-limited' ? 'dark' : 'faded'}>
                    {
                        ipo.status === 'open' ? 'Participate' : ipo.status === 'open-limited' ? '5d : 20h : 04m' : 'Ended'
                    }
                </Button>
            </div>
        </Paper>
    )
}

export default IpoCard
