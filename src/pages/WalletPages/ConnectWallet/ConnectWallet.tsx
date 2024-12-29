import Col from '@app/compLibrary/Grid/Col'
import Row from '@app/compLibrary/Grid/Row'
import StatsCard from '@app/components/StatsCard/StatsCard'
import styles from './ConnectWallet.module.scss'
import Eye from '@app/components/Icons/eye/icon'
import Button from '@app/compLibrary/Button'
import Settings from '@app/components/Icons/settings/icon'
import SizedBox from '@app/components/Sizedbox'
import Table from '@app/compLibrary/Table/Table'
import { suggestions } from '@app/assets/json/walletSuggestions'

const header = [
    {
        label: 'Currency'
    },
    {
        label: 'Amount'
    },
    {
        label: 'Price'
    },
]
const ConnectWallet = () => {
    const renderActions = () => {
        return (
            <Button rounded color='dark' startIcon={<Settings />} linkProps={{ to: '/wallet/manage' }}>Setting Wallet</Button>
        )
    }
    return (
        <div className={styles.main}>
            <Row>
                <Col
                    grid={{
                        xxlg: 12,
                        xlg: 12,
                        md: 12,
                        sm: 12
                    }}
                >
                    <StatsCard
                        percentage='176,127.23'
                        name='Balance'
                        isJungle
                        icon={<Eye />}
                        removeBottomBtn
                        isRenderTopRightActions
                        renderTopRightActions={renderActions}
                    />
                </Col>
            </Row>
            <SizedBox height={16} />

            <Table
                header={header}
                body={suggestions}
            />
        </div>
    )
}

export default ConnectWallet
