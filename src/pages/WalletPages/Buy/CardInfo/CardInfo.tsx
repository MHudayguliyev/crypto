import styles from './CardInfo.module.scss'
import { useMatch, useNavigate } from '@tanstack/react-location'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Button from '@app/compLibrary/Button'
import Input from '@app/compLibrary/Input'
import Row from '@app/compLibrary/Grid/Row'
import Col from '@app/compLibrary/Grid/Col'
import { cards } from '@app/assets/json/cards'
import { useState } from 'react'
import ConfirmOrderModal from '@app/components/Modals/ConfirmOrderModal/ConfirmOrderModal'

const CardInfo = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const { token, cardId } = match.params
    const cardDetails = cards.find(item => item.id === parseInt(cardId))

    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Buy AM',
            to: 'wallet/buy'
        },
        {
            label: 'Wallet Address',
            to: `wallet/buy/${token}`
        },
        {
            label: 'Payment Method',
            to: `wallet/buy/${token}/payment`
        },
        {
            label: 'Choose Asset',
            to: `wallet/buy/${token}/payment/select-card`
        },
        {
            label: 'Card info',
            to: `wallet/buy/${token}/payment/select-card/${cardId}`
        },
    ]

    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            {
                cardDetails ?
                    <>
                        <ConfirmOrderModal onSuccess={() => navigate({ to: '/wallet/buy' })} src={cardDetails.src} code={cardDetails?.code} open={isOpen} close={() => setIsOpen(false)} />
                        <div className={styles.main}>
                            <div className={styles.header}>Card Info</div>
                            <form className={styles.form}>
                                <div className={styles.info}>
                                    <div className={styles.field}>
                                        <label>Full name</label>
                                        <Input value={cardDetails.owner} readOnly autoCapitalize='off' type='text' name='fullname' />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Card Number</label>
                                        <Input value={cardDetails.fullCode} readOnly autoCapitalize='off' type='text' name='cardNumber' />
                                    </div>
                                    <Row colGutter={12} rowGutter={12}>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>Expiration Date</label>
                                                <Input value={cardDetails.expireDate} readOnly autoCapitalize='off' type='text' name='expireDate' />
                                            </div>
                                        </Col>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>CVV</label>
                                                <Input value={cardDetails.cvv} readOnly autoCapitalize='off' type='text' name='cvv' />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>


                                <div className={styles.billing_address}>
                                    <div className={styles.address_header}>Billing address</div>
                                    <div className={styles.field}>
                                        <label>Address</label>
                                        <Input value={cardDetails.billAddress} readOnly autoCapitalize='off' type='text' name='address' />
                                    </div>
                                    <Row colGutter={12} rowGutter={12}>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>Postal Code</label>
                                                <Input value={cardDetails.postalCode} readOnly autoCapitalize='off' type='text' name='postalCode' />
                                            </div>
                                        </Col>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>City</label>
                                                <Input value={cardDetails.city} readOnly autoCapitalize='off' type='text' name='city' />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row colGutter={12} rowGutter={12}>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>State</label>
                                                <Input value={cardDetails.state} readOnly autoCapitalize='off' type='text' name='state' />
                                            </div>
                                        </Col>
                                        <Col grid={{ xxlg: 6, xlg: 6, md: 12, sm: 12 }}>
                                            <div className={styles.field}>
                                                <label>Country</label>
                                                <Input value={cardDetails.country} readOnly autoCapitalize='off' type='text' name='country' />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>


                                <Button onClick={() => setIsOpen(true)} rounded style={{ padding: '16px', width: '100%', marginBottom: '40px' }}>Next</Button>
                            </form>
                        </div>
                    </> : "No card found"
            }
        </>
    )
}

export default CardInfo
