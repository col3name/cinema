import React, {forwardRef} from "react";
import {IWord} from "@/entities/typeRacing/slice";
import {useWords} from "@/entities/typeRacing/selector";
import styles from "@/widgets/typingRace/ui/WordList/stylesWords.module.css";
import {WordMemo} from "@/widgets/typingRace/ui/WordList/WordMemoized";

type WordListProps = {
    wordRef?: React.MutableRefObject<HTMLDivElement|null>;
}

export const WordList: React.FC<WordListProps> = forwardRef(function WordList(props, ref) {
    const words: IWord[] = useWords();

    return (
        <div
            // @ts-ignore
            ref={ref} className={styles.words}
        >
            {words.map((word: IWord, index: number) => {
                return (
                    <WordMemo
                        // @ts-ignore
                        ref={word.isActive ? props.wordRef : null} key={`${word.id}-${word.text}-${index}`}
                        word={word}
                    />
                );
            })}
        </div>
    )
})