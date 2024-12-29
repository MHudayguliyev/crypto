import React, { useState } from 'react'
import styles from './About.module.scss'
import Breadcrumb from '@app/components/Breadcrumb/Breadcrumb'
import SizedBox from '@app/components/Sizedbox'
import LinkTabs from '@app/components/LinkTabs/LinkTabs'
import LinkTabsVertical from '@app/components/LinkTabsVertical/LinkTabsVertical'
import Paper from '@app/compLibrary/Paper'

const breadCrumbData = [
    {
        label: 'Wallet',
        to: 'wallet'
    },
    {
        label: 'Setting Wallet',
        to: '#'
    },
    {
        label: 'About',
        to: 'about'
    },
]
const tabs = [
    {
        name: 'Wallet',
        url: 'manage'
    },
    {
        name: 'Preferences',
        url: 'preference'
    },
    {
        name: 'About',
        url: 'about'
    }
]
const verticalTabs = [
    {
        name: 'Privacy Policy',
        value: 'privacy',
        text: `AM AG's AM recognizes that people who use AM value their privacy. This privacy policy ("Policy") describes how AM ("Company", "we", "our", or "us") collects, uses, shares, and stores personal information of users of our website, https://am.io/ and our mobile application,  (collectively the "Site"). This Policy applies to the Site, applications, products and services (collectively, "Services") on or in which it is posted, linked, or referenced.

                            By using the Services, you accept the terms of this Policy and our Terms of Use, and consent to our collection, use, disclosure, and retention of your information as described in this Policy.  If you have not done so already, please also review our terms of use. The terms of use contain provisions that limit our liability to you and require you to resolve any dispute with us on an individual basis and not as part of any class or representative action. IF YOU DO NOT AGREE WITH ANY PART OF THIS PRIVACY POLICY OR OUR TERMS OF USE, THEN PLEASE DO NOT USE ANY OF THE SERVICES.

                            Please note that this Policy does not apply to information collected through third-party websites or services that you may access through the Services or that you submit to us through email, text message or other electronic message or offline.

                            If you are visiting this site from the European Union (EU), see our Notice to EU Data Subjects below for our legal bases for processing and transfer of your data.`
    },
    {
        name: 'Terms of Service',
        value: 'term',
        text: `IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED IN SECTION 11. PLEASE READ THE AGREEMENT CAREFULLY.

AM Software Inc. ("AM," "we," "us," or "our") is the leading blockchain software development company. With a focus on utilizing decentralized technologies, such as Binance, our software is powering a revolution in commerce and finance and helping to optimize business processes. AM hosts a top level domain website, www.am.io, that serves information regarding AM and our offerings, as well as sub-domains for our product offerings (the "Sites"), which include text, images, audio, code and other materials or third party information.

These Terms of Use (the "Terms," "Terms of Use" or "Agreement") contain the terms and conditions that govern your access to and use of the Site and Services (as defined below) provided by us and is an agreement between us and you or the entity you represent ("you" or "your"). Please read these Terms of Use carefully before using the Site or Services. By using the Site, or clicking a button or checkbox to accept or agree to these Terms where that option is made available or, completing an order form for Services, or,  if earlier, using or otherwise accessing the Services (the "Effective Date"), you (1) accept and agree to these Terms and any additional terms, rules and conditions of participation issued by AM from time to time and (2) consent to the collection, use, disclosure and other handling of information as described in our Privacy Policy. If you do not agree to the Terms, then you may not access or use the Services.

You represent to us that you are lawfully able to enter into contracts. If you are entering into this Agreement for an entity, such as the company you work for, you represent to us that you have legal authority to bind that entity. Please see Section 16 for definitions of certain capitalized terms used in this Agreement.

In addition, you represent to us that you and your financial institutions, or any party that owns or controls you or your financial institutions, are (1) not subject to sanctions or otherwise designated on any list of prohibited or restricted parties, including but not limited to the lists maintained by the United Nations Security Council, the U.S. Government (e.g., the Specially Designated Nationals List and Foreign Sanctions Evaders List of the U.S. Department of Treasury and the Entity List of the U.S. Department of Commerce), the European Union or its Member States, or other applicable government authority and (2) not located in any country to which the United States has embargoed goods or has otherwise applied any sanctions.`
    },
    {
        name: 'Support',
        value: 'support',
        text: `IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED IN SECTION 11. PLEASE READ THE AGREEMENT CAREFULLY.

AM Software Inc. ("AM," "we," "us," or "our") is the leading blockchain software development company. With a focus on utilizing decentralized technologies, such as Binance, our software is powering a revolution in commerce and finance and helping to optimize business processes. AM hosts a top level domain website, www.am.io, that serves information regarding AM and our offerings, as well as sub-domains for our product offerings (the "Sites"), which include text, images, audio, code and other materials or third party information.

These Terms of Use (the "Terms," "Terms of Use" or "Agreement") contain the terms and conditions that govern your access to and use of the Site and Services (as defined below) provided by us and is an agreement between us and you or the entity you represent ("you" or "your"). Please read these Terms of Use carefully before using the Site or Services. By using the Site, or clicking a button or checkbox to accept or agree to these Terms where that option is made available or, completing an order form for Services, or,  if earlier, using or otherwise accessing the Services (the "Effective Date"), you (1) accept and agree to these Terms and any additional terms, rules and conditions of participation issued by AM from time to time and (2) consent to the collection, use, disclosure and other handling of information as described in our Privacy Policy. If you do not agree to the Terms, then you may not access or use the Services.

You represent to us that you are lawfully able to enter into contracts. If you are entering into this Agreement for an entity, such as the company you work for, you represent to us that you have legal authority to bind that entity. Please see Section 16 for definitions of certain capitalized terms used in this Agreement.

In addition, you represent to us that you and your financial institutions, or any party that owns or controls you or your financial institutions, are (1) not subject to sanctions or otherwise designated on any list of prohibited or restricted parties, including but not limited to the lists maintained by the United Nations Security Council, the U.S. Government (e.g., the Specially Designated Nationals List and Foreign Sanctions Evaders List of the U.S. Department of Treasury and the Entity List of the U.S. Department of Commerce), the European Union or its Member States, or other applicable government authority and (2) not located in any country to which the United States has embargoed goods or has otherwise applied any sanctions.`
    },
    {
        name: 'Make a Suggestion',
        value: 'make-suggestion',
        text: `IMPORTANT NOTICE: THIS AGREEMENT IS SUBJECT TO BINDING ARBITRATION AND A WAIVER OF CLASS ACTION RIGHTS AS DETAILED IN SECTION 11. PLEASE READ THE AGREEMENT CAREFULLY.

AM Software Inc. ("AM," "we," "us," or "our") is the leading blockchain software development company. With a focus on utilizing decentralized technologies, such as Binance, our software is powering a revolution in commerce and finance and helping to optimize business processes. AM hosts a top level domain website, www.am.io, that serves information regarding AM and our offerings, as well as sub-domains for our product offerings (the "Sites"), which include text, images, audio, code and other materials or third party information.

These Terms of Use (the "Terms," "Terms of Use" or "Agreement") contain the terms and conditions that govern your access to and use of the Site and Services (as defined below) provided by us and is an agreement between us and you or the entity you represent ("you" or "your"). Please read these Terms of Use carefully before using the Site or Services. By using the Site, or clicking a button or checkbox to accept or agree to these Terms where that option is made available or, completing an order form for Services, or,  if earlier, using or otherwise accessing the Services (the "Effective Date"), you (1) accept and agree to these Terms and any additional terms, rules and conditions of participation issued by AM from time to time and (2) consent to the collection, use, disclosure and other handling of information as described in our Privacy Policy. If you do not agree to the Terms, then you may not access or use the Services.

You represent to us that you are lawfully able to enter into contracts. If you are entering into this Agreement for an entity, such as the company you work for, you represent to us that you have legal authority to bind that entity. Please see Section 16 for definitions of certain capitalized terms used in this Agreement.

In addition, you represent to us that you and your financial institutions, or any party that owns or controls you or your financial institutions, are (1) not subject to sanctions or otherwise designated on any list of prohibited or restricted parties, including but not limited to the lists maintained by the United Nations Security Council, the U.S. Government (e.g., the Specially Designated Nationals List and Foreign Sanctions Evaders List of the U.S. Department of Treasury and the Entity List of the U.S. Department of Commerce), the European Union or its Member States, or other applicable government authority and (2) not located in any country to which the United States has embargoed goods or has otherwise applied any sanctions.`
    }
]
const About = () => {
    const [active, setActive] = useState<{ name: string, value: string, text: string }>(verticalTabs[0])
    return (
        <>
            <Breadcrumb data={breadCrumbData} />
            <SizedBox height={24} />

            <div className={styles.container}>
                <LinkTabsVertical className={styles.tabs_controlled} data={verticalTabs} active={active} onClick={(value) => setActive(value)} />
                <div className={styles.body}>
                    <LinkTabs data={tabs} baseUrl='/wallet' />
                    <SizedBox height={24} />
                    <Paper style={{ marginBottom: '40px' }}>
                        <div className={styles.header}>
                            {active.name}
                        </div>
                        <SizedBox height={24} />

                        <p className={styles.paragraph}>
                            {active.text}
                        </p>
                        <SizedBox height={12} />
                    </Paper>

                </div>
            </div>

        </>
    )
}

export default About
