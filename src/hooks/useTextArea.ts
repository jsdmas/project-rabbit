import { useRef } from 'react';

/**
 * @description textArea Enter 이벤트
 * @returns {Array} [buttonRef, onkeydown]
 */
export const useTextArea = (): any => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const onkeydown = (event: any) => {
    if (event.key === 'Enter' && buttonRef.current !== null) {
      buttonRef.current.focus();
    }
  };

  return [buttonRef, onkeydown];
};
