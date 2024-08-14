import React from "react";
import cn from "classnames";

import styles from './stylesCaret.module.css';

import {useCurrentLetterIndex} from "@/entities/typeRacing/selector";

export const Caret: React.FC = () => {
    const currentLetterIndex = useCurrentLetterIndex();

    const left = Math.max(currentLetterIndex, 0) * 20 + 'px';

    return (
        <span className={cn(styles.caret, styles.caretBlink)} style={{left}}/>
    );
};
