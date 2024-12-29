import styles from './LinkTabsVertical.module.scss'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)
type TabTypes = {
    value: string
    name: string
    text: string
}
interface TabProps {
    data: Array<TabTypes>
    active: TabTypes
    onClick: (value: TabTypes) => void
    className?: string
}

const LinkTabsVertical = (props: TabProps) => {
    const { data, onClick, active, className = "" } = props
    return (
        <div className={`${styles.tabs_wrapper} ${className}`}>
            <ul className={styles.nav}>
                {
                    data.map((item) => (
                        <li onClick={() => onClick(item)} key={item.value} className={cx({
                            list: true,
                            active: item.value === active.value
                        })}>
                            {item.name}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LinkTabsVertical
