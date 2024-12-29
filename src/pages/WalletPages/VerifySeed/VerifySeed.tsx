import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import { useState } from 'react'
import styles from './VerifySeed.module.scss'
import Row from '@app/compLibrary/Grid/Row'
import { seeds } from '@app/assets/json/seeds'
import Col from '@app/compLibrary/Grid/Col'
import Seed from '@app/components/Seed/Seed'
import Button from '@app/compLibrary/Button'
import SuccessModal from '@app/components/Modals/SuccessModal/SuccessModal'
import Header from '@app/compLibrary/Header'

const VerifySeed = () => {
    const [isOpen, setOpen] = useState(false)
    const [variants, setVariants] = useState(seeds ?? [])
    const [selectedSeeds, setSelectedSeeds] = useState<{ label: string, value: string, index: number }[]>([
        {
            index: 9,
            label: "",
            value: ""
        },
        {
            index: 12,
            label: "",
            value: ""
        },
        {
            index: 7,
            label: "",
            value: ""
        },
        {
            index: 1,
            label: "",
            value: ""
        }
    ])
    const breadCrumbData = [
        {
            label: 'Wallet',
            to: 'wallet'
        },
        {
            label: 'Create a New Wallet',
            to: 'wallet/create'
        },
        {
            label: 'Back Up Your Wallet',
            to: 'wallet/create/backup'
        },
        {
            label: 'Confirm Your Seed Phrase',
            to: 'wallet/create/backup/confirm-seed'
        },
        {
            label: 'Verify Your Seed Phrase',
            to: 'verify-seed'
        }
    ]

    const seedFN = ({ label, value }: { label: string, value: string }) => {
        const foundSeed = selectedSeeds.find((seed) => !seed.value);
        if (foundSeed) {
            const updated = selectedSeeds.map(sseed => sseed.index === foundSeed.index ? { ...sseed, label, value } : sseed)
            setSelectedSeeds(updated)

            const clonedVariants = [...variants]
            for (let i = 0; i < clonedVariants.length; i++) {
                for (let j = 0; j < updated.length; j++) {
                    if (clonedVariants[i].value === updated[j].value) {
                        clonedVariants[i].disabled = true
                    }
                }
            }
            setVariants(clonedVariants)
        }
    }
    const renderModalContent = () => {
        return (
            <>
                <Header fontWeight='bold' size='big' justify='center'>Successfully Verified</Header>
                <Button rounded style={{ padding: "16px", width: '100%' }} linkProps={{ to: '/wallet' }} onClick={() => setOpen(false)}>Confirm</Button>
            </>
        )
    }
    const verifyFN = () => {
        const notFilled = selectedSeeds.some(item => item.value === "")
        if (!notFilled) setOpen(true)
    }
    return (
        <>
            <SuccessModal
                open={isOpen}
                close={() => setOpen(false)}
                renderContent={renderModalContent}
            />
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />
            <div className={styles.main}>
                <div className={styles.header}>
                    <div className={styles.head}>
                        Verify Your Seed Phrase
                    </div>
                    <p>Select each word in the order it was presented to you</p>
                </div>


                <Row
                    className={styles.row}
                    colGutter={8}
                    rowGutter={8}
                >
                    {
                        selectedSeeds.map((seed) => (
                            <Col grid={{
                                xxlg: 3,
                                xlg: 3,
                                md: 4,
                                sm: 6
                            }} key={seed.index}>
                                <Seed
                                    index={seed.index}
                                    label={seed.label}
                                    value={seed.value}
                                    onClick={() => {
                                        if (seed.value !== "") {
                                            setVariants(variants.map(variant => variant.value === seed.value ? { ...variant, disabled: false } : variant))
                                            setSelectedSeeds(selectedSeeds.map(sseed => sseed.value === seed.value ? { ...sseed, label: "", value: "" } : sseed))
                                        }
                                    }}
                                />
                            </Col>
                        ))
                    }
                </Row>

                <Row
                    className={styles.row}
                    colGutter={8}
                    rowGutter={8}
                >
                    {
                        variants.map((seed, index) => (
                            <Col grid={{
                                xxlg: 3,
                                xlg: 3,
                                md: 4,
                                sm: 6
                            }} key={index}>
                                <Seed
                                    label={seed.label}
                                    value={seed.value}
                                    onClick={() => seedFN(seed)}
                                    disabled={seed.disabled}
                                />
                            </Col>
                        ))
                    }
                </Row>

                <Button rounded style={{ width: '100%' }} onClick={verifyFN}>Next</Button>
            </div>
        </>
    )
}

export default VerifySeed
