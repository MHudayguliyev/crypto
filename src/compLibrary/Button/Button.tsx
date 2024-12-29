import React, { CSSProperties, useMemo } from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { Link, LinkProps } from '@tanstack/react-location';
import { capitalize } from '@utils/helpers';

interface ButtonProps {
  children: React.ReactNode
  style?: CSSProperties
  onClick?: (e?: any) => void
  /** @defaultValue false */
  circle?: boolean
  /** @defaultValue false */
  rounded?: boolean
  /** @defaultValue false */
  topRounded?: boolean
  /** @defaultValue false */
  bottomRounded?: boolean
  /** @defaultValue false */
  leftRounded?: boolean
  /** @defaultValue false */
  rightRounded?: boolean
  /** @defaultValue false */
  disabled?: boolean
  htmlType?: "button" | "submit" | "reset",
  color?: 'theme' | 'dark' | 'gray' | 'transparent' | 'faded'
  linkProps?: LinkProps
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  /** @defaultValue contained */
  type?: 'contained' | 'dashed'
}
const cx = classNames.bind(styles)
const Button = (props: ButtonProps) => {
  const {
    children,
    style,
    rounded = false,
    topRounded = false,
    leftRounded = false,
    rightRounded = false,
    bottomRounded = false,
    disabled = false,
    htmlType = "button",
    linkProps,
    color = "theme",
    type = 'contained',
    startIcon,
    endIcon,
    onClick
  } = props

  const content = useMemo(() => {
    return (
      <div className={cx({
        iconed: startIcon || endIcon
      })}>
        {startIcon && <span className={styles.icon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.icon}>{endIcon}</span>}
      </div>
    )
  }, [startIcon, endIcon, children])

  return (
    <button
      type={htmlType}
      style={style}
      onClick={onClick}
      disabled={disabled}
      className={
        cx({
          baseStyle: true,
          rounded: rounded,
          topRounded: topRounded,
          bottomRounded: bottomRounded,
          rightRounded: rightRounded,
          leftRounded: leftRounded,
          [`type${capitalize(type)}`]: true,
          [`color${capitalize(color)}`]: true,
        })
      }
    >
      {
        linkProps?.to ?
          <Link {...linkProps} className={styles.link}>
            {content}
          </Link>
          :
          content
      }
    </button>
  )
}

export default Button
