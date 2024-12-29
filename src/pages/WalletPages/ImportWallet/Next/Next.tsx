import { suggestions } from '@app/assets/json/walletSuggestions'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import { useMatch, useNavigate } from '@tanstack/react-location'
import styles from './Next.module.scss'
import Tabs from '@app/components/Tabs/Tabs'
import Scan from '@app/components/Icons/scan/icon'
import Input from '@app/compLibrary/Input'
import Button from '@app/compLibrary/Button'

// form controller
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from 'react'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import { importNewWallet } from '@app/api/Queries/Post'


const breadCrumbData = [
    {
        label: 'Wallet',
        to: 'wallet'
    },
    {
        label: 'Import Wallet',
        to: 'import'
    },
]
const tabs = [
    {
        label: 'Recovery phrase',
        value: 'phrase'
    },
    {
        label: 'Private Key',
        value: 'private-key'
    },
    {
        label: 'Address',
        value: 'address'
    }
]

interface FormikValues {
    text: string
    name: string
}
const Next = () => {
    const navigate = useNavigate()
    const match = useMatch()
    const currentWallet = suggestions.find(suggestion => suggestion.id === parseInt(match.params?.id))
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [active, setActive] = useState<{
        label: string
        value: string
    }>(tabs[0])

    const formik = useFormik<FormikValues>({
        initialValues: {
            name: "",
            text: ""
        },
        validationSchema: Yup.object({
            text: Yup.string().required("This field is required").matches(/^[a-zA-Z0-9]{1,64}$/, 'Text doesnt contain needed characters'),
            name: Yup.string().required("This field is required")
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('values.', values)
            setIsOpen(true)
            // resetForm()
        }
    })
    const confirmFN = async () => {
        try {
            const response = await importNewWallet({ id: formik.values.text, name: formik.values.name })
            if (response.id) {
                setIsOpen(false)
                navigate({ to: '/wallet' })
            }
        } catch (error) {
            console.log("get wallet id error", error)
        }
    }
    const renderModalContent = () => {
        return (
            <>
                <div className={styles.success}>Successfully Import</div>
                <Button rounded style={{ padding: "16px", width: '100%' }} onClick={confirmFN}>Confirm</Button>
            </>
        )
    }

    const onPaste = async (event: any) => {
        try {
            const pastedText = await navigator.clipboard.readText();
            formik.setFieldValue('text', pastedText);
        } catch (error) {
            console.error('Error pasting text:', error);
        }
    }

    return (
        <>
            <SuccessModal open={isOpen} close={close} renderContent={renderModalContent} />
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                {
                    !currentWallet ? <div className={styles.header}>No wallet found</div> :
                        <>
                            <div className={styles.header}>
                                Import {currentWallet?.label}
                            </div>

                            <Tabs
                                className={styles.tabs_controlled}
                                data={tabs}
                                active={active}
                                onChange={(value) => {
                                    setActive(value)
                                    formik.setFieldValue('text', '')
                                }}
                            />

                            <form className={styles.form} onSubmit={formik.handleSubmit}>
                                <div className={styles.textarea_controller}>
                                    <textarea name='text' value={formik.values.text} onChange={formik.handleChange} placeholder={active.label} className={styles.textarea} />
                                    <div className={styles.actions}>
                                        <span className={styles.text} onClick={onPaste}>Paste</span>
                                        <span className={styles.icon}><Scan /></span>
                                    </div>
                                    <p>Typically 12 (sometimes 24) words separated by single spaces</p>
                                </div>

                                <div className={styles.inputWrapper}>
                                    <label>Name</label>
                                    <Input name='name' value={formik.values.name} type='text' onChange={formik.handleChange} />
                                </div>

                                <div className={styles.faq}>What is a {active.label}?</div>
                                <Button htmlType='submit' style={{ padding: '16px' }} rounded disabled={!formik.isValid} color={(formik.isValid && formik.values.text !== "" && formik.values.name !== "") ? 'theme' : 'gray'}>Import</Button>
                            </form>
                        </>
                }
            </div>
        </>
    )
}

export default Next
