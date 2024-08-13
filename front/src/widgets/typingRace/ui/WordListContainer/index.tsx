import React, {MutableRefObject, useCallback} from "react";
import {useCurrentLetterIndex, useCurrentWordIndex, useWords} from "@/entities/race/selector";
import {LetterList} from "@/widgets/typingRace/ui/Letter/LetterList";
import {CaretMemoized} from "@/widgets/typingRace/ui/Caret";
import {WordList} from "@/widgets/typingRace/ui/WordList";
import {ExtraLettersContainer} from "@/widgets/typingRace/ui/Letter/ExtraLetterList";

type WordListContainerProps = {
    currentLetterRef: MutableRefObject<HTMLSpanElement|null>;
    currentWordRef: MutableRefObject<HTMLDivElement|null>;
    wordsRef: MutableRefObject<HTMLDivElement|null>;
}

export const WordListContainer: React.FC<WordListContainerProps> = ({
                                                                 wordsRef,
                                                                 currentLetterRef,
                                                                 currentWordRef,
                                                             }) => {
    const currentLetterIndex = useCurrentLetterIndex()
    const currentWordIndex = useCurrentWordIndex();
    const words = useWords();

    const renderLetterList = useCallback((word: string, isActiveWord: boolean): React.ReactNode => {
        return <LetterList
            // @ts-ignore
            ref={currentLetterRef} word={word} isActiveWord={isActiveWord}
            currentLetterIndex={currentLetterIndex}/>
    }, [currentLetterIndex, currentLetterRef]);

    const renderCaret = useCallback(() => <CaretMemoized currentLetterIndex={currentLetterIndex}
                                                         key={currentWordIndex}/>, [currentLetterIndex, currentWordIndex]);


    return (
        <WordList
            // @ts-ignore
            ref={wordsRef}
            words={words}
            currentWordIndex={currentWordIndex}
            currentWordRef={currentWordRef}
            renderLetterList={renderLetterList}
            renderCaret={renderCaret}
        >
            <ExtraLettersContainer/>
        </WordList>
    );
};
