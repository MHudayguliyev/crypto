import React from 'react'
import styles from './LinkTabs.module.scss'
import classNames from 'classnames/bind'
import { useRouter } from '@tanstack/react-location'
const cx = classNames.bind(styles)

interface TabProps {
    data: {
        url: string
        name: string
    }[]
    baseUrl: string
}
const LinkTabs = (props: TabProps) => {
    const { data, baseUrl } = props
    // getting location
    const {
        state: { location },
    } = useRouter();
    console.log("location", location)
    const activeRouteIndex = data.findIndex(item => location.pathname.toLowerCase().includes(item.url.toLowerCase()))
    console.log('activeRouteIndex', activeRouteIndex)
    return (
        <div className={styles.tabs_wrapper}>
            <ul className={styles.nav}>
                {
                    data.map((item, index) => (
                        <li key={item.url} className={cx({
                            list: true,
                            active: activeRouteIndex === index
                        })}>
                            <a href={`${baseUrl}/${item.url}`}>{item.name}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LinkTabs
