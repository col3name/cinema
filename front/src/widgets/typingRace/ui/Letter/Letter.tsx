import React, {forwardRef, memo} from "react";

import styles from "./stylesLetter.module.css";

type LetterProps = {
    isCurrent?: boolean;
    isExtra?: boolean;
    children: React.ReactNode;
};

const LetterPrivate = forwardRef<HTMLSpanElement, LetterProps>(function Letter(props: LetterProps, ref) {
    return (
        <span
            ref={props.isCurrent ? ref : null}
            className={!props.isExtra ? styles.letter : styles.letterExtra}
        >
            {props.children}
        </span>
    );
});

export const Letter = memo(LetterPrivate);