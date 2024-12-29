import React, { ChangeEvent, CSSProperties, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
// custom styles
import styles from './AutoComplete.module.scss';
import classNames from "classnames/bind";
import Input from '../Input';
import Search from '@app/components/Icons/search/icon';
import ArrowRight from '@app/components/Icons/arrowRight/icon';

const cx = classNames.bind(styles);

export type SearchValue = {
    id: number
    label: string,
    value: string
    src: string
    shortName?: string
}

type AutoCompleteProps = {
    suggestions: Array<SearchValue>
    placeholder?: string
    noOptionTxt?: ReactNode
    onChange: (value: SearchValue) => void
    onClick?: (value: SearchValue) => void
    style?: CSSProperties
    value: SearchValue | any
    endIcon?: React.ReactNode
    suggestionEndIcon?: React.ReactNode
}


const Autocomplete = (props: AutoCompleteProps) => {

    const {
        suggestions,
        placeholder,
        noOptionTxt,
        onChange,
        onClick,
        style,
        value,
        endIcon,
        suggestionEndIcon
    } = props;

    const [filteredSuggestions, setFilteredSuggestions] = useState<Array<SearchValue>>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [input, setInput] = useState("");

    // for focusing on input
    const inputRef = useRef<HTMLInputElement>(null)
    const setFocus = () => inputRef.current && inputRef.current.focus();

    const dropDownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const maybeHandler = (event: MouseEvent): any => {
            if (!dropDownRef.current?.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", maybeHandler);
        return () => {
            document.removeEventListener("mousedown", maybeHandler);
        };
    });


    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            // User pressed the enter key
            if (e.key === 'Enter') {
                setInput(suggestions[activeSuggestionIndex].label);
                onChange(suggestions[activeSuggestionIndex])
                setShowSuggestions(false);
            }
            // User pressed the up arrow
            else if (e.key == "ArrowUp") {
                if (activeSuggestionIndex === 0) {
                    return;
                }
                setActiveSuggestionIndex(activeSuggestionIndex - 1);
            }
            // User pressed the down arrow
            else if (e.key === "ArrowDown") {
                if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
                    return;
                }
                setActiveSuggestionIndex(activeSuggestionIndex + 1);
            }
        };
        document.addEventListener('keydown', onKeyDown)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
        }
    }, [activeSuggestionIndex, filteredSuggestions])

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const userInput = e.target.value;
        // Filter our suggestions that don't contain the user's input
        const unLinked: Array<SearchValue> = suggestions.filter(
            (suggestion) =>
                suggestion.label.toLowerCase().includes(userInput.toLowerCase())
        );
        const activeIndex = suggestions.findIndex(suggestion => suggestion.value === unLinked[0]?.value || 0);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(activeIndex)
        setInput(userInput);
    };

    const handleClick = (e: any, activeIndex: number) => {
        setFilteredSuggestions([]);
        const input = e.target as HTMLElement;
        setInput(input.innerText);
        setActiveSuggestionIndex(activeIndex)
        setShowSuggestions(false);
        onChange(suggestions[activeIndex])
        if (onClick) onClick(suggestions[activeIndex])
    };

    const content = useMemo(() => {
        return (
            <div className={styles.inputWrapper}>
                <Input
                    placeholder='Search'
                    type='text'
                    onChange={(e) => onInputChange(e)}
                    onBlur={() => {
                        setInput(suggestions[activeSuggestionIndex]?.label);
                        onChange(suggestions[activeSuggestionIndex])
                    }}
                    value={input}
                    ref={inputRef}
                    onClick={() => {
                        setFilteredSuggestions(suggestions)
                        setShowSuggestions(true)
                    }}
                />
                <span className={styles.icon}>{endIcon ? endIcon : <Search />}</span>
            </div>
        )
    }, [input, endIcon, onInputChange, onChange])

    const SuggestionsListComponent = () => {
        return (
            filteredSuggestions.length ? (
                <ul className={styles.suggestions}>
                    {
                        filteredSuggestions.map((suggestion, index) => {
                            return (
                                <li key={index} className={`${styles.suggestion}`} onClick={(e) => handleClick(e, index)}>
                                    <div className={styles.left}>
                                        <div className={styles.flag}>
                                            <img src={suggestion.src} />
                                        </div>
                                        {suggestion?.label}
                                    </div>
                                    {suggestionEndIcon ? <span>{activeSuggestionIndex === index ? suggestionEndIcon : null}</span> : <span><ArrowRight /></span>}
                                </li>
                            )
                        })
                    }
                </ul>
            ) : <></>
        )
    }

    return (
        <div ref={dropDownRef} style={{ ...style, position: 'relative' }}>
            {content}
            {
                showSuggestions && <SuggestionsListComponent />
            }
        </div>
    )
}

export default Autocomplete
