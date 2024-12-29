import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Dropdown.module.scss'
import Input from '@app/compLibrary/Input'
import Search from '@app/components/Icons/search/icon'
import { SearchValue } from '../Autocomplete/Autocomplete'
import Check from '@app/components/Icons/check/icon'
import classNames from 'classnames/bind'
import useOutclick from '@app/hooks/useOutclick'
import { delay } from '@utils/helpers'

type AutoCompleteTypes = {
    suggestions: Array<SearchValue>
    activeSuggestion: SearchValue | undefined
    renderHeader: () => ReactNode
    onClick: (value: SearchValue) => void
    style?: CSSProperties
    defaultValue?: SearchValue
}
const cx = classNames.bind(styles)
const Dropdown = React.forwardRef<HTMLDivElement, AutoCompleteTypes>((props): JSX.Element => {
    const content_ref: any = useRef(null)
    const toggle_ref: any = useRef(null)
    const [open, setOpen] = useOutclick(content_ref, toggle_ref)

    const { suggestions, activeSuggestion, style, defaultValue, onClick, renderHeader } = props
    const [filteredSuggestions, setFilteredSuggestions] = useState<Array<SearchValue>>(suggestions ?? [])
    const [input, setInput] = useState("")

    useEffect(() => {
        onClick(defaultValue ? defaultValue : suggestions[0])
    }, [])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const filtered = suggestions.filter(item => {
            return (
                item.label.toLowerCase().includes(value.toLocaleLowerCase()) ||
                item.shortName?.toLowerCase().includes(value.toLowerCase())
            )
        })
        setFilteredSuggestions(filtered)
        setInput(value)
    }

    useEffect(() => {
        if (!open) {
            delay(200).then(() => {
                setInput("")
                setFilteredSuggestions(suggestions)
            })
        }
    }, [open])

    return (
        <div className={styles.mini_autocomplete}>
            <div className={styles.header} ref={toggle_ref}>
                {renderHeader()}
            </div>

            <div style={style} ref={content_ref} className={cx({
                dropdown_content: true,
                open: open
            })}>
                <div className={styles.search}>
                    <Input onChange={onChange} value={input} type='search' placeholder='Search' />
                    <span className={styles.icon}><Search /></span>
                </div>

                <div className={styles.suggestions}>
                    <div className={styles.suggestion_title}>All</div>
                    {
                        filteredSuggestions.length ?
                            filteredSuggestions.map(suggestion => (
                                <button onClick={() => { onClick(suggestion); setOpen(false) }} key={suggestion.id} className={styles.suggestion}>
                                    <div className={styles.info}>
                                        <div className={styles.image}>
                                            <img src={suggestion.src} />
                                        </div>
                                        <div>
                                            <span className={styles.shortName}>{suggestion.shortName}</span>
                                            <span className={styles.label}> - {suggestion.label}</span>
                                        </div>
                                    </div>
                                    {activeSuggestion?.value === suggestion.value ? <span className={styles.icon}><Check /></span> : ""}
                                </button>
                            ))
                            : <span>No wallet found</span>
                    }
                </div>
            </div>
        </div>
    )
})

export default Dropdown
