import {useCallback, useRef} from "react";

export const useFocusHiddenInput = () => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onFocusHiddenInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    return {hiddenInputRef: inputRef, onFocusHiddenInput};
}
