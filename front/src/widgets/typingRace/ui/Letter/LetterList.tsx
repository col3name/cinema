import React, {forwardRef, useMemo} from "react";
import {Letter} from "@/widgets/typingRace/ui/Letter/index";


type LetterListProps = {
    word: string;
    isActiveWord: boolean;
    currentLetterIndex: number;
}

export const LetterList: React.FC<LetterListProps> = forwardRef<HTMLSpanElement, LetterListProps>(function LetterList({
                                                                                                                   word,
                                                                                                                   isActiveWord,
                                                                                                                   currentLetterIndex,
                                                                                                               }, ref) {
    const letters: string[] = useMemo(() => word.split(''), [word]);

    return letters.map((letter: string, letterIdx: number) => {
        const isCurrent = isActiveWord && letterIdx === currentLetterIndex;
        return (
            <Letter
                key={`${letter}-${letterIdx}`}
                ref={isCurrent ? ref : null}
                isCurrent={isCurrent}
            >
                {letter}
            </Letter>
        );
    });
});
