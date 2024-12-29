import React from 'react'

const TopAvatar = () => {
    return (
        <svg width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_6994_22742" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="2" y="2" width="19" height="20">
                <ellipse cx="11.5" cy="12" rx="9.5" ry="10" fill="#161626" />
            </mask>
            <g mask="url(#mask0_6994_22742)">
                <ellipse cx="19.1667" cy="12" rx="11.5" ry="12" fill="url(#paint0_linear_6994_22742)" />
                <ellipse cx="4.79175" cy="1" rx="11.5" ry="12" fill="url(#paint1_linear_6994_22742)" />
                <ellipse cx="5.75" cy="21" rx="11.5" ry="12" fill="url(#paint2_linear_6994_22742)" />
            </g>
            <defs>
                <linearGradient id="paint0_linear_6994_22742" x1="3.27971" y1="15.3" x2="29.3481" y2="15.3302" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1F27FD" />
                    <stop offset="1" stop-color="#FF844B" />
                </linearGradient>
                <linearGradient id="paint1_linear_6994_22742" x1="-11.0953" y1="4.3" x2="14.9731" y2="4.33024" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#1F27FD" />
                    <stop offset="1" stop-color="#FF844B" />
                </linearGradient>
                <linearGradient id="paint2_linear_6994_22742" x1="-14.6944" y1="15.6" x2="18.0454" y2="16.5445" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FD1F43" />
                    <stop offset="1" stop-color="#4BE0FF" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default TopAvatar
