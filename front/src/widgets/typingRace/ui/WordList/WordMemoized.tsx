import React, {forwardRef} from "react";

import {LetterMemo} from "@/widgets/typingRace/ui/Letter";
import {ExtraLetters} from "@/widgets/typingRace/ui/Letter/extraLetters";

import styles from "./stylesWords.module.css";

import {ILetter, IWord} from "@/entities/typeRacing/slice";

type WordProps = {
    word: IWord;
}

const Word: React.FC<WordProps> = forwardRef(function Word({
                                                               word,
                                                           }, ref) {
    return (
        // @ts-ignore
        <div ref={ref} className={styles.word}>
            {word.letters.map((letter: ILetter, index: number) => {
                return (
                    <LetterMemo key={`${letter.id}-${letter.text}-${letter.type}-${index}`} letter={letter}/>
                );
            })}
            {word.isActive && (
                <ExtraLetters extraLetters={word.extraLetters} />
            )}
        </div>
    );
});

export const WordMemo = React.memo(Word);
