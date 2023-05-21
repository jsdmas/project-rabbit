import { RefObject, useRef } from "react";

/**
 * @description textArea Enter 이벤트
 * @returns {Array} [buttonRef, onkeydown]
 */
export const useTextArea = (): [RefObject<HTMLButtonElement>, (event: React.KeyboardEvent<HTMLTextAreaElement>) => void] => {

    const buttonRef = useRef<HTMLButtonElement>(null);
    const onkeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && buttonRef.current !== null) {
            buttonRef.current.focus()
        }
    };

    return [buttonRef, onkeydown];
};