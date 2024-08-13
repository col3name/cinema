import React, {memo} from "react";
import cn from "classnames";
import styles from "@/widgets/typingRace/client.module.css";

type CaretProps = {
    currentLetterIndex: number;
};

const Caret: React.FC<CaretProps> = ({
                                         currentLetterIndex
                                     }) => {
    const left = Math.max(currentLetterIndex, 0) * 20 + 'px';
    return (
        <span className={cn(styles.caret, styles.caretBlink)} style={{left}}/>
    );
}

export const CaretMemoized = memo(Caret);


