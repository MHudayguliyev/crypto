import { Route } from "@tanstack/react-location";
import Home from "@app/pages/Home/Home";
import Layout from "./Layout/Layout";
import InitialWalletPage from "@app/pages/WalletPages/InitialWalletPage/Wallet";
import CreateWallet from "@app/pages/WalletPages/CreateWallet/CreateWallet";
import Backup from "@app/pages/WalletPages/Backup/Backup";
import ConfirmSeed from "@app/pages/WalletPages/ConfirmSeed/ConfirmSeed";
import VerifySeed from "@app/pages/WalletPages/VerifySeed/VerifySeed";
import ImportWallet from "@app/pages/WalletPages/ImportWallet/ImportWallet";
import Next from "@app/pages/WalletPages/ImportWallet/Next/Next";
import ConnectWallet from "@app/pages/WalletPages/ConnectWallet/ConnectWallet";
import WalletDetail from "@app/pages/WalletPages/WalletDetail/WalletDetail";
import Buy from "@app/pages/WalletPages/Buy/Buy";
import WalletAddress from "@app/pages/WalletPages/Buy/WalletAddress/WalletAddress";
import PaymentMethod from "@app/pages/WalletPages/Buy/PaymentMethod/PaymentMethod";
import SelectCard from "@app/pages/WalletPages/Buy/SelectCard/SelectCard";
import CardInfo from "@app/pages/WalletPages/Buy/CardInfo/CardInfo";
import Send from "@app/pages/WalletPages/Send/Send";
import TransactionHistory from "@app/pages/WalletPages/Send/TransactionHistory/TransactionHistory";
import Management from "@app/pages/WalletPages/Management/Management";
import ManagementDetail from "@app/pages/WalletPages/Management/Detail/Detail";
import RFWarning from "@app/pages/WalletPages/Management/RFWarning/RFWarning";
import RecoverPhraser from "@app/pages/WalletPages/Management/RecoverPhraser/RecoverPhraser";
import Preference from "@app/pages/WalletPages/Preference/Preference";
import About from "@app/pages/WalletPages/About/About";
import Dex from "@app/pages/Dex/Dex";
import DexTransactionHistory from "@app/pages/Dex/TransactionHistory/TransactionHistory";
import SelectToken from "@app/pages/Dex/SelectToken/SelectToken";
import AddLiquidity from "@app/pages/Dex/AddLiquidity/AddLiquidity";
import LiquidityDetail from "@app/pages/Dex/LiquidityDetail/LiquidityDetail";
import RemoveLiquidity from "@app/pages/Dex/RemoveLiquidity/RemoveLiquidity";
import Pool from "@app/pages/Pool/Pool";
import Farm from "@app/pages/Farm/Farm";
import Jungle from "@app/pages/Jungle/Jungle";
import Ipo from "@app/pages/Ipo/Ipo";
import IpoDetails from "@app/pages/Ipo/Details/Details";
import AppForm from "@app/pages/Ipo/AppForm/AppForm";

const routes: Route[] = [
    {
        path: '/',
        element: (
            <Layout>
                <Home />
            </Layout>
        )
    },
    {
        path: 'dex',
        children: [
            {
                path: '/',
                element: (
                    <Layout>
                        <Dex />
                    </Layout>
                )
            },
            {
                path: 'liquidity',
                children: [
                    {
                        path: ':liquidityId',
                        element: (
                            <Layout>
                                <LiquidityDetail />
                            </Layout>
                        )
                    },
                ]
            },
            {
                path: '/remove-liquidity',
                children: [
                    {
                        path: ':liquidityId',
                        element: (
                            <Layout>
                                <RemoveLiquidity />
                            </Layout>
                        )
                    },
                ]
            },
            {
                path: '/transaction-history',
                element: (
                    <Layout>
                        <DexTransactionHistory />
                    </Layout>
                )
            },
            {
                path: 'select-token',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <SelectToken />
                            </Layout>
                        )
                    },
                    {
                        path: ':token1',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <AddLiquidity />
                                    </Layout>
                                )
                            },
                            {
                                path: ':token2',
                                element: (
                                    <Layout>
                                        <AddLiquidity />
                                    </Layout>
                                )
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: 'wallet',
        children: [
            {
                path: '/',
                element: (
                    <Layout>
                        <InitialWalletPage />
                    </Layout>
                )
            },
            {
                path: '/detail',
                children: [
                    {
                        path: ':id',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <WalletDetail />
                                    </Layout>
                                )
                            },
                            {
                                path: ':slug',
                                element: (
                                    <Layout>
                                        <WalletDetail />
                                    </Layout>
                                )
                            }
                        ]
                    }
                ]
            },
            {
                path: '/connect',
                element: (
                    <Layout>
                        <ConnectWallet />
                    </Layout>
                )
            },
            {
                path: '/preference',
                element: (
                    <Layout>
                        <Preference />
                    </Layout>
                )
            },
            {
                path: '/about',
                element: (
                    <Layout>
                        <About />
                    </Layout>
                )
            },
            {
                path: 'manage',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <Management />
                            </Layout>
                        )
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <ManagementDetail />
                                    </Layout>
                                )
                            },
                            {
                                path: 'rf-warning',
                                children: [
                                    {
                                        path: '/',
                                        element: (
                                            <Layout>
                                                <RFWarning />
                                            </Layout>
                                        )
                                    },
                                    {
                                        path: '/rf',
                                        element: (
                                            <Layout>
                                                <RecoverPhraser />
                                            </Layout>
                                        )
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'buy',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <Buy />
                            </Layout>
                        )
                    },
                    {
                        path: ':token',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <WalletAddress />
                                    </Layout>
                                )
                            },
                            {
                                path: 'payment',
                                children: [
                                    {
                                        path: '/',
                                        element: (
                                            <Layout>
                                                <PaymentMethod />
                                            </Layout>
                                        )
                                    },
                                    {
                                        path: 'select-card',
                                        children: [
                                            {
                                                path: '/',
                                                element: (
                                                    <Layout>
                                                        <SelectCard />
                                                    </Layout>
                                                )
                                            },
                                            {
                                                path: ':cardId',
                                                element: (
                                                    <Layout>
                                                        <CardInfo />
                                                    </Layout>
                                                )
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'send',
                children: [
                    {
                        path: ':tokenId',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <Send />
                                    </Layout>
                                )
                            },
                            {
                                path: ':slug',
                                children: [
                                    {
                                        path: '/',
                                        element: (
                                            <Layout>
                                                <Send />
                                            </Layout>
                                        )
                                    },
                                    {
                                        path: '/transaction-history',
                                        element: (
                                            <Layout>
                                                <TransactionHistory />
                                            </Layout>
                                        )
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'create',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <CreateWallet />
                            </Layout>
                        )
                    },
                    {
                        path: 'backup',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <Backup />
                                    </Layout>
                                )
                            },
                            {
                                path: '/confirm-seed',
                                children: [
                                    {
                                        path: '/',
                                        element: (
                                            <Layout>
                                                <ConfirmSeed />
                                            </Layout>
                                        )
                                    },
                                    {
                                        path: '/verify-seed',
                                        element: (
                                            <Layout>
                                                <VerifySeed />
                                            </Layout>
                                        )
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                path: 'import',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <ImportWallet />
                            </Layout>
                        )
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                path: '/',
                                element: (
                                    <Layout>
                                        <Next />
                                    </Layout>
                                )
                            },
                            {
                                path: ':slug',
                                element: (
                                    <Layout>
                                        <Next />
                                    </Layout>
                                )
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        path: '/pool',
        element: (
            <Layout>
                <Pool />
            </Layout>
        )
    },
    {
        path: '/farm',
        element: (
            <Layout>
                <Farm />
            </Layout>
        )
    },
    {
        path: '/jungle',
        element: (
            <Layout>
                <Jungle />
            </Layout>
        )
    },
    {
        path: 'ipo',
        children: [
            {
                path: '/',
                element: (
                    <Layout>
                        <Ipo />
                    </Layout >
                )
            },
            {
                path: ':ipoId',
                children: [
                    {
                        path: '/',
                        element: (
                            <Layout>
                                <IpoDetails />
                            </Layout >
                        )
                    },
                    {
                        path: '/app-form',
                        element: (
                            <Layout>
                                <AppForm />
                            </Layout >
                        )
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: (
            <>Not found</>
        )
    },
]


export default routes;