import React, {forwardRef} from "react";
import styles from "@/widgets/typingRace/client.module.css";
import {WordMemoized} from "@/widgets/typingRace/ui/WordList/WordMemoized";


type WordListProps = {
    words: string[];
    currentWordIndex: number;
    currentLetterIndex?: number;
    children: React.ReactNode;
    currentWordRef: React.MutableRefObject<HTMLDivElement | null>
    renderLetterList: (word: string, isActiveWord: boolean) => React.ReactNode;
    renderCaret: () => React.ReactNode;
}

export const WordList: React.FC<WordListProps> = forwardRef<HTMLDivElement, WordListProps>(function WordList({
                                                                                                          words,
                                                                                                          currentWordIndex,
                                                                                                          children,
                                                                                                          currentLetterIndex,
                                                                                                          renderLetterList,
                                                                                                          renderCaret,
                                                                                                          currentWordRef,
                                                                                                      }, ref: React.ForwardedRef<HTMLDivElement | null>) {
    return (
        <div ref={ref} className={styles.words}>
            {words.map((word: string, wordIdx: number) => {
                const isActiveWord = wordIdx === currentWordIndex;
                return (
                    <WordMemoized
                        key={`${wordIdx}-${word}`}
                        // @ts-ignore
                        ref={currentWordRef}
                        isActive={isActiveWord}
                        word={word}
                        currentLetterIndex={currentLetterIndex}
                        renderLetterList={renderLetterList}
                        renderCaret={renderCaret}
                    >
                        {children}
                    </WordMemoized>
                );
            })}
        </div>
    );
});
