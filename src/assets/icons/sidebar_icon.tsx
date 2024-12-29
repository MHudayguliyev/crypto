import React from 'react'
import home from '@app/assets/icons/home.svg'
import wallet from '@app/assets/icons/wallet-2.svg'
import dex from '@app/assets/icons/transfer-dex.svg'
import pool from '@app/assets/icons/crypto-farm.svg'
import jungle from '@app/assets/icons/crypto-jungle.svg'
import farm from '@app/assets/icons/crypto-farm.svg'
import ipo from '@app/assets/icons/space-rocket-ipo.svg'


interface SidebarIconProps {
    type: 'home' | 'wallet' | 'dex' | 'pool' | 'farm' | 'jungle' | 'ipo' | string
}
const SidebarIcon = ({ type }: SidebarIconProps) => {
    return (
        <>
            {
                type === 'home' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M19.1883 8.60758L13.6884 4.32955C12.6956 3.55682 11.3051 3.55682 10.3114 4.32955L4.81149 8.60758C4.14141 9.12824 3.75 9.92939 3.75 10.7782V17.5C3.75 19.0189 4.98107 20.25 6.49996 20.25H17.4998C19.0187 20.25 20.2498 19.0189 20.2498 17.5V10.7782C20.2498 9.92939 19.8584 9.12824 19.1883 8.60758Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15.6665 14.0516C13.6407 16.0774 10.3572 16.0774 8.33327 14.0516" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                    :
                    type === 'dex' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 13L5 16L8 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19 16L5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 11L19 8L16 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 8L19 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                        :
                        type === 'wallet' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18 20H6C4.343 20 3 18.657 3 17V6C3 4.895 3.895 4 5 4H19C20.105 4 21 4.895 21 6V17C21 18.657 19.657 20 18 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 11.5H17.5C16.97 11.5 16.461 11.711 16.086 12.086L15.258 12.914C14.883 13.289 14.374 13.5 13.844 13.5H10.743C10.213 13.5 9.704 13.289 9.329 12.914L8.5 12.086C8.125 11.711 7.616 11.5 7.086 11.5H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 8H3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                            :
                            type === 'pool' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 18L18 21" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21 21V18H18" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 6L6 3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 3V6H6" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.5 20C10.5878 20 11.6512 19.6774 12.5556 19.0731C13.4601 18.4687 14.1651 17.6098 14.5813 16.6048C14.9976 15.5998 15.1065 14.4939 14.8943 13.427C14.6821 12.3601 14.1583 11.3801 13.3891 10.6109C12.6199 9.84173 11.6399 9.3179 10.573 9.10568C9.5061 8.89346 8.40023 9.00238 7.39524 9.41867C6.39025 9.83495 5.53126 10.5399 4.92692 11.4444C4.32257 12.3488 4 13.4122 4 14.5C4 15.2223 4.14226 15.9375 4.41866 16.6048C4.69506 17.2721 5.10019 17.8784 5.61091 18.3891C6.64236 19.4205 8.04131 20 9.5 20V20Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18.39 13.39C19.4217 12.3583 20.0013 10.959 20.0013 9.50001C20.0013 8.04098 19.4217 6.6417 18.39 5.61001C17.3583 4.57832 15.959 3.99872 14.5 3.99872C13.041 3.99872 11.6417 4.57832 10.61 5.61001" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10.207 12.293L11.707 13.793C11.8945 13.9805 11.9998 14.2348 11.9998 14.5C11.9998 14.7652 11.8945 15.0195 11.707 15.207L10.207 16.707C10.0195 16.8945 9.76516 16.9998 9.5 16.9998C9.23484 16.9998 8.98053 16.8945 8.793 16.707L7.293 15.207C7.10553 15.0195 7.00021 14.7652 7.00021 14.5C7.00021 14.2348 7.10553 13.9805 7.293 13.793L8.793 12.293C8.98053 12.1055 9.23484 12.0002 9.5 12.0002C9.76516 12.0002 10.0195 12.1055 10.207 12.293V12.293Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                                :
                                type === 'farm' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.75 3C13.0356 3 14.2923 3.38122 15.3612 4.09545C16.4301 4.80968 17.2632 5.82484 17.7552 7.01256C18.2472 8.20028 18.3759 9.50721 18.1251 10.7681C17.8743 12.029 17.2552 13.1872 16.3462 14.0962C15.4372 15.0052 14.279 15.6243 13.0181 15.8751C11.7572 16.1259 10.4503 15.9972 9.26256 15.5052C8.07484 15.0132 7.05968 14.1801 6.34545 13.1112C5.63122 12.0423 5.25 10.7856 5.25 9.5C5.25 7.77609 5.93482 6.12279 7.15381 4.90381C8.37279 3.68482 10.0261 3 11.75 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12.2068 7.04279L13.7068 8.54279C13.8943 8.73031 13.9996 8.98462 13.9996 9.24979C13.9996 9.51495 13.8943 9.76926 13.7068 9.95679L12.2068 11.4568C12.0193 11.6443 11.765 11.7496 11.4998 11.7496C11.2346 11.7496 10.9803 11.6443 10.7928 11.4568L9.29279 9.95679C9.10532 9.76926 9 9.51495 9 9.24979C9 8.98462 9.10532 8.73031 9.29279 8.54279L10.7928 7.04279C10.9803 6.85532 11.2346 6.75 11.4998 6.75C11.765 6.75 12.0193 6.85532 12.2068 7.04279V7.04279Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 16H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 12H19C19.5304 12 20.0391 12.2107 20.4142 12.5858C20.7893 12.9609 21 13.4696 21 14V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V14C3 13.4696 3.21071 12.9609 3.58579 12.5858C3.96086 12.2107 4.46957 12 5 12H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                    :
                                    type === 'jungle' ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21C14.3869 21 16.6761 20.0518 18.364 18.364C20.0518 16.6761 21 14.3869 21 12C21 9.61305 20.0518 7.32387 18.364 5.63604C16.6761 3.94821 14.3869 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21V21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.9568 10.0428L14.4568 11.5428C14.6443 11.7303 14.7496 11.9846 14.7496 12.2498C14.7496 12.515 14.6443 12.7693 14.4568 12.9568L12.9568 14.4568C12.7693 14.6443 12.515 14.7496 12.2498 14.7496C11.9846 14.7496 11.7303 14.6443 11.5428 14.4568L10.0428 12.9568C9.85532 12.7693 9.75 12.515 9.75 12.2498C9.75 11.9846 9.85532 11.7303 10.0428 11.5428L11.5428 10.0428C11.7303 9.85532 11.9846 9.75 12.2498 9.75C12.515 9.75 12.7693 9.85532 12.9568 10.0428V10.0428Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M5.5 12H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.5 12H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.75999 16.24L7.39999 16.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.24 7.76002L16.6 7.40002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 18V18.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12 5.5V6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.24 16.24L16.6 16.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.39999 7.40002L7.75999 7.76002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                        :
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.096 12.123L11.699 16.441C11.5068 16.5948 11.2646 16.6722 11.0189 16.6586C10.7731 16.6449 10.541 16.5411 10.367 16.367L7.633 13.633C7.4589 13.459 7.35508 13.2269 7.34143 12.9811C7.32778 12.7354 7.40524 12.4932 7.559 12.301L11.877 6.904C12.8516 5.68584 14.0877 4.70247 15.4938 4.02669C16.8999 3.35091 18.44 3.00002 20 3C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4C21 7.16 19.563 10.15 17.096 12.124V12.123Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M16 13V17.382C15.9999 17.5677 15.9481 17.7496 15.8504 17.9075C15.7528 18.0654 15.6131 18.193 15.447 18.276L13.031 19.484C12.9029 19.5481 12.7624 19.5839 12.6193 19.589C12.4761 19.5941 12.3335 19.5684 12.2011 19.5136C12.0687 19.4588 11.9497 19.3762 11.852 19.2713C11.7543 19.1665 11.6803 19.0419 11.635 18.906L11 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M7 13L5.094 12.365C4.95808 12.3197 4.83349 12.2457 4.72867 12.148C4.62384 12.0503 4.54123 11.9313 4.48642 11.7989C4.43161 11.6665 4.40589 11.5239 4.41099 11.3807C4.41609 11.2376 4.4519 11.0971 4.516 10.969L5.724 8.553C5.80699 8.38692 5.93458 8.24722 6.09247 8.14955C6.25037 8.05188 6.43234 8.0001 6.618 8H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M5.75 20.587L3 21L3.413 18.25C3.44649 17.9775 3.53423 17.7146 3.67102 17.4766C3.80781 17.2386 3.99088 17.0305 4.20944 16.8644C4.428 16.6984 4.67761 16.5778 4.94353 16.5098C5.20946 16.4418 5.48631 16.4278 5.75775 16.4685C6.02919 16.5093 6.28972 16.604 6.52395 16.7471C6.75818 16.8902 6.96138 17.0787 7.12154 17.3016C7.2817 17.5246 7.39558 17.7773 7.45646 18.0449C7.51734 18.3126 7.52398 18.5897 7.476 18.86C7.41077 19.2946 7.20794 19.6968 6.89729 20.0076C6.58665 20.3184 6.18454 20.5215 5.75 20.587V20.587Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>

            }
        </>
    )
}

export default SidebarIcon
