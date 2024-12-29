import React from 'react'
import styles from './Sidebar.module.scss'
import logo from '@app/assets/images/logo-coin.png'
import { routes } from '@app/assets/json/routes'
import SidebarIcon from '@app/assets/icons/sidebar_icon'
import { useRouter, useNavigate } from '@tanstack/react-location'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)
const Sidebar = () => {
    // getting location
    const {
        state: { location },
    } = useRouter();
    const navigate = useNavigate()
    const activeItem = routes.findIndex(route => {
        return route.route === location.pathname
    })

    return (
        <>
            <div className={styles.sidebar}>
                <a href='/' className={styles.header}>
                    <div className={styles.logo}>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className={styles.head}>
                        Amando
                    </div>
                </a>

                <nav>
                    <ul className={styles.routes}>
                        {

                            routes.map((route, index) => (
                                <li onClick={() => navigate({ to: `/${route.route}` })} className={cx({
                                    route: true,
                                    active: activeItem === index
                                })} key={index}>
                                    <a href={route.route}>
                                        <span><SidebarIcon type={route.icon} /></span>
                                        <span>{route.display_name.en}</span>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className={styles.deals}>
                    <div className={styles.deal_head}>
                        Live Trading Deals
                    </div>

                    <div className={styles.deal_item}>
                        <div className={styles.deal_child}>
                            <div className={styles.swap}>Swap</div>
                            <div className={styles.time}>10:20:01 AM</div>
                        </div>
                        <div className={styles.deal_child}>
                            <div className={styles.swap}>WBNB/BUSD</div>
                            <div className={styles.cash}>$ 3,122.51</div>
                        </div>
                    </div>
                    <div className={styles.deal_item}>
                        <div className={styles.deal_child}>
                            <div className={styles.swap}>Swap</div>
                            <div className={styles.time}>10:20:01 AM</div>
                        </div>
                        <div className={styles.deal_child}>
                            <div className={styles.swap}>WBNB/BUSD</div>
                            <div className={styles.cash}>$ 3,122.51</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar
