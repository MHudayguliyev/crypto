import React, { RefObject, useEffect, useState } from 'react';

const useOutclick = <T extends HTMLElement = HTMLElement, U extends HTMLElement = HTMLElement>(
    contentRef: RefObject<T>,
    toggleRef: RefObject<U>,
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        const maybeHandler = (event: MouseEvent) => {
            if (contentRef.current && toggleRef.current?.contains(event.target as Node)) {
                setShow(!show);
            } else {
                // user click outside toggle and content
                if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
                    setShow(false);
                }
            }
        };
        document.addEventListener('mousedown', maybeHandler);
        return () => {
            document.removeEventListener('mousedown', maybeHandler);
        };
    });
    return [show, setShow];
};

export default useOutclick;