import styles from './Breadcrumb.module.scss'
import ArrowLeft from '../Icons/arrowLeft/icon'
interface BreadcrumbProps {
    data: {
        label: string
        to: string
    }[]
}
const Breadcrumb = (props: BreadcrumbProps) => {
    const { data } = props

    return (
        <>
            <div className={styles.breadcrumb}>
                <span className={styles.icon} onClick={() => window.history.back()}><ArrowLeft /></span>
                <div className={styles.content}>
                    {
                        data.map((item, index) => {
                            if (index === data.length - 1) {
                                return <span key={item.to} className={styles.active}>{item.label}</span>
                            }
                            return (
                                <a href={`/${item.to}`} key={item.to} className={styles.item}>
                                    {item.label}/
                                </a>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Breadcrumb
