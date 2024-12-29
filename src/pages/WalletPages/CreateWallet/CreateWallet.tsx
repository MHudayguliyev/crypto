import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-location'
import styles from './CreateWallet.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import Input from '@app/compLibrary/Input'
import Hide from '@app/components/Icons/hide/icon'
import Show from '@app/components/Icons/show/icon'
import Button from '@app/compLibrary/Button'
// form controller
import { useFormik } from "formik";
import * as Yup from 'yup';


interface FormikValues {
    password: string
    confirm: string
}
const CreateWallet = () => {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState<boolean>(false)
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false)
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Create a New Wallet',
            to: 'create'
        }
    ]

    const formik = useFormik<FormikValues>({
        initialValues: {
            password: "",
            confirm: ""
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required("This field is required")
                .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-])/,
                    'Password must contain at least one uppercase letter, one digit, and one symbol'),
            confirm: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .required("This field is required")
                .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`|}{[\]:;?><,./-])/,
                    'Password must contain at least one uppercase letter, one digit, and one symbol')
                .oneOf([Yup.ref('password')], 'Passwords must match')
        }),
        onSubmit: async (values) => {
            console.log("values", values)
            navigate({ to: 'backup' })
        }
    })
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.main}>
                <div className={styles.header}>
                    Create new wallet
                </div>

                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <div className={styles.password}>
                        <div className={styles.password_field}>
                            <Input
                                type={showPass ? 'text' : 'password'}
                                min={8}
                                name='password'
                                placeholder='Enter password'
                                value={formik.values.password}
                                onChange={formik.handleChange}
                            />
                            <span className={styles.icon} onClick={() => {
                                if (showPass) setShowPass(false)
                                else setShowPass(true)
                            }}>
                                {
                                    showPass ? <Hide /> : <Show />
                                }
                            </span>
                        </div>
                        <ul>
                            <li>8 or more character</li>
                            <li>At least one upper case character</li>
                            <li>At least one digit</li>
                            <li>At least one symbols</li>
                        </ul>
                    </div>
                    <div className={styles.password_field}>
                        <Input
                            type={showConfirmPass ? 'text' : 'password'}
                            min={8}
                            name='confirm'
                            placeholder='Confirm password'
                            value={formik.values.confirm}
                            onChange={formik.handleChange}
                        />
                        <span className={styles.icon} onClick={() => {
                            if (showConfirmPass) setShowConfirmPass(false)
                            else setShowConfirmPass(true)
                        }}>
                            {
                                showConfirmPass ? <Hide /> : <Show />
                            }
                        </span>
                    </div>
                    <Button htmlType='submit' style={{ padding: '16px 16px' }} rounded color={(formik.isValid && formik.values.password !== "" && formik.values.confirm !== "") ? 'theme' : 'gray'} disabled={!formik.isValid}>Continue</Button>
                </form>
            </div>
        </>
    )
}

export default CreateWallet
