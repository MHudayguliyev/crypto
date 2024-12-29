import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import styles from './Send.module.scss'
import { suggestions } from '@app/assets/json/walletSuggestions'
import { useMatch } from '@tanstack/react-location'
import Button from '@app/compLibrary/Button'
import Input from '@app/compLibrary/Input'
import Scan from '@app/components/Icons/scan/icon'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useState } from 'react'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import moment from 'moment'


interface FormikValues {
    address: string
    amount: number | undefined
}
const Send = () => {
    const { params } = useMatch()
    const token = suggestions.find(suggestion => suggestion.id === parseInt(params.tokenId))
    const [isOpen, setIsOpen] = useState(false)
    const [submitDate, setSubmitDate] = useState("")

    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: `Send ${token?.shortName ?? "nothing"}`,
            to: 'send'
        },
    ]

    const formik = useFormik<FormikValues>({
        initialValues: {
            address: "",
            amount: undefined,
        },
        validationSchema: Yup.object({
            address: Yup.string().required("This field is required"),
            amount: Yup.string().required("This field is required")
        }),
        onSubmit: async (values, { resetForm }) => {
            const date = moment().format('HH:mm,MMMM D,YYYY')
            setSubmitDate(date)
            setIsOpen(true)
        }
    })

    const onPaste = async (event: any) => {
        try {
            const pastedText = await navigator.clipboard.readText();
            formik.setFieldValue('address', pastedText);
        } catch (error) {
            console.error('Error pasting text:', error);
        }
    }

    const renderModalContent = () => (
        <>
            <div className={styles.modalHeader}>Transaction Submitted</div>
            <Button linkProps={{ to: `transaction-history?recipient=${formik.values.address}&amount=${formik.values.amount}&date=${submitDate}` }} color='transparent' style={{ color: 'var(--primary-6)' }}>View Details</Button>
        </>
    )


    return (
        <>
            <SuccessModal open={isOpen} close={() => setIsOpen(false)} renderContent={renderModalContent} />
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                {
                    token ?
                        <>
                            <div className={styles.header}>
                                {token.label}
                            </div>

                            <form className={styles.form} onSubmit={formik.handleSubmit}>
                                <div className={styles.fields}>
                                    <div className={styles.field}>
                                        <Input value={formik.values.address} onChange={formik.handleChange} type='text' name='address' placeholder='Enter recipient address' autoComplete='off' />
                                        <div className={styles.actions}>
                                            <span onClick={onPaste}>Paste</span>
                                            <span><Scan /></span>
                                        </div>
                                    </div>
                                    <div className={styles.field}>
                                        <Input value={formik.values.amount as number} onChange={formik.handleChange} type='number' name='amount' placeholder='Enter amount' autoComplete='off' />
                                        <div className={styles.actions}>
                                            <span>Max</span>
                                            <span>{token.shortName}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button disabled={!formik.isValid} color={(formik.isValid && formik.values.address !== "" && typeof formik.values.amount !== 'undefined') ? 'theme' : 'gray'} htmlType='submit' style={{ width: '100%', padding: '16px' }} rounded >Continue</Button>
                            </form>
                        </> :
                        <div className={styles.header}>
                            No token found to send
                        </div>
                }
            </div>
        </>
    )
}

export default Send
