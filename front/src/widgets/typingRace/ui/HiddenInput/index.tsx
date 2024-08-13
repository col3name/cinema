import React, {forwardRef} from "react";

import styles from "./stylesHiddenInput.module.css";

const noop = () => {
};


type HiddenInputProps = {
    top: number;
}

export const HiddenInput: React.FC<HiddenInputProps> = forwardRef<HTMLInputElement, HiddenInputProps>(function Input({
                                                                       top
                                                                   }, ref) {
    return (
        <input
            className={styles.inputHidden}
            onChange={noop}
            ref={ref}
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            style={{top: top}}
            list="autocompleteOff" spellCheck="false"
        />
    );
},)
