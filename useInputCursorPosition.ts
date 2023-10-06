import { useState } from 'react';

interface Props {
  id: string;
}

type CursorPositions = {
  selectionStart: number;
  selectionEnd: number;
};

const DEFAULT_STATE: CursorPositions = {
  selectionStart: 0,
  selectionEnd: 0,
};

const useInputCursorPosition = ({ id }: Props) => {
  const [cursorPosition, setCursorPosition] = useState<CursorPositions>(DEFAULT_STATE);
  const element = document.querySelector<HTMLInputElement>(`#${id}`);

  const setPosition = () => {
    if (element) {
      setCursorPosition({
        selectionStart: element.selectionStart,
        selectionEnd: element.selectionEnd,
      });
    }

    if (!element) {
      setCursorPosition(DEFAULT_STATE);
    }
  };

  const setValue = (template: string) => {
    const inputValue = element.value;
    const textBeforeCursor = inputValue.substring(0, cursorPosition.selectionStart);
    const textAfterCursor = inputValue.substring(cursorPosition.selectionStart);
    const modifiedValue = textBeforeCursor + template + textAfterCursor;

    element.value = modifiedValue;

    element.selectionStart = cursorPosition.selectionStart + template.length;
    element.selectionEnd = element.selectionStart;

    setCursorPosition({
      selectionStart: element.selectionStart,
      selectionEnd: element.selectionEnd,
    });

    return element.value;
  };

  return {
    cursorPosition,
    setPosition,
    setValue,
  };
};

export default useInputCursorPosition;
