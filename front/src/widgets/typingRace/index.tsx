import React, {forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import cn from "classnames";
import {useDispatch} from "react-redux";

import {UpdateTextButton} from "@/features/face/update-text-button";
import Button from "@/shared/ui/Button";
import {HiddenInput} from "@/widgets/typingRace/ui/HiddenInput";
import {Container} from "@/shared/ui/Container";
import {FinalResultContainer as FinalResult} from "@/widgets/typingRace/ui/FinalResult";

import styles from "@/app/monkeytype/client.module.css";

import {useKeyPress} from "@/shared/hooks";
import {NewTypingText, RaceStep} from "@/entities/race/model";
import {
    addExtraLetter,
    appendLetterInCurrentWord,
    deleteLastExtraLetter,
    deleteLastLetterInCurrentWord,
    incrementAccuracyCorrect,
    incrementAccuracyExtra,
    incrementAccuracyIncorrect,
    incrementAccuracyMissed,
    incrementErrorObject, incrementLetterIndex, incrementWordIndex, moveToNextWord,
    onResetRaceState,
    onSaveHistory,
    resetCurrentWord,
    resetExtraLetter,
    setRaceStep, setWords, typeLetter,
} from "@/entities/race/slice";
import {
    useCurrentLetterIndex,
    useCurrentWordIndex,
    useExtraLetters,
    useRaceStep,
    useTypedWord
} from "@/entities/race/selector";

const useTimer = () => {
    const [seconds, setSeconds] = useState<number>(0);

    const [enabled, setEnabled] = useState(false);

    const [startedAt, setStartedAt] = useState<number | undefined>(undefined);
    const timerRef = useRef<number>();

    useEffect(() => {
        if (!enabled) {
            return;
        }
        setEnabled(true);
        const start = Date.now();
        setStartedAt(start);
        const handler = () => {
            const delta = Date.now() - start;
            setSeconds(Math.ceil(delta / 1000));
        };

        // @ts-ignore
        timerRef.current = setInterval(handler, 100);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [enabled]);

    const start = useCallback(() => {
        setEnabled(true);
    }, []);

    const stop = () => {
        setStartedAt(0);
        setEnabled(false);
        clearInterval(timerRef.current);
    }
    const reset = () => {
        stop();
        setSeconds(0);
    }
    return {
        elapsed: seconds,
        startedAt,
        startTimer: start,
        stopTimer: stop,
        resetTimer: reset,
    };
};

const clearClass = (currentWordRef: React.MutableRefObject<HTMLDivElement | null>) => {
    const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
    childrenElements[childrenElements.length - 1];
    childrenElements.forEach(child => {
        child.classList.remove(styles.letterCurrent);
    });
}


export const TypingRace: React.FC<NewTypingText> = ({
                                                        words,
                                                        length,
                                                    }) => {
    const {elapsed, startedAt, startTimer, stopTimer, resetTimer,} = useTimer();

    const lastRef = useRef<number>(elapsed);

    const prevTimeRef = useRef(0);

    const dispatch = useDispatch();

    const saveHistory = useCallback(() => {
        dispatch(onSaveHistory({
            elapsedSeconds: elapsed,
        }));
    }, [dispatch, elapsed]);

    useEffect(() => {
        if (elapsed - prevTimeRef.current < 1) {
            return;
        }
        prevTimeRef.current = elapsed;
        lastRef.current = elapsed;
        saveHistory();
    }, [elapsed, saveHistory]);

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const currentLetterRef = useRef<HTMLSpanElement | null>(null);

    const extraLetters = useExtraLetters();
    const currentLetterIndex = useCurrentLetterIndex()
    const currentWordIndex = useCurrentWordIndex();
    const typedWord: string = useTypedWord();

    useEffect(() => {
        dispatch(setWords(words));
    }, [words]);

    const onPressBackspace = useCallback((): void => {
        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[currentLetterIndex]?.classList?.remove(styles.letterCurrent);
        childrenElements[currentLetterIndex - 1]?.classList?.add(styles.letterCurrent);

        const item: Element = childrenElements[currentLetterIndex - 1]
        item?.classList.remove(styles.letterRight);
        item?.classList.remove(styles.letterWrong);

        // -------
        if (extraLetters.length > 0) {
            dispatch(deleteLastExtraLetter());
            return;
        }
        if (typedWord.length > 0) {
            dispatch(deleteLastLetterInCurrentWord());
            return;
        }
    }, [dispatch, currentLetterIndex, extraLetters.length]);

    const onPressSpaceBar = useCallback(() => {
        if (currentLetterIndex === 0) {
            return;
        }
        const currentWord = words[currentWordIndex];
        if (currentLetterIndex < currentWord.length) {
            const count = currentWord.length - currentLetterIndex;
            dispatch(incrementAccuracyMissed(count));
            dispatch(incrementErrorObject({count,}));
        }
        dispatch(incrementAccuracyCorrect());
        dispatch(incrementWordIndex())

        const wordElementList: Element[] = Array.from(wordsRef.current?.children || []);
        const currentWordElement: Element = wordElementList[currentWordIndex];
        const fromElement: Element = Array.from(currentWordElement?.children || [])?.[0];
        fromElement?.scrollIntoView({block: 'center', behavior: 'smooth'});
        fromElement?.classList?.add(styles.letterCurrent);
        clearClass(currentWordRef);

        if (currentWordIndex + 1 < words.length) {
            dispatch(moveToNextWord());
        } else {
            saveHistory();
            dispatch(setRaceStep(RaceStep.Final));
            stopTimer();
        }
    }, [currentWordIndex, currentLetterIndex, dispatch, saveHistory, stopTimer, words]);

    const onTypeLetter = useCallback((key: string): void => {
        const letterIdx: number = currentLetterIndex;
        dispatch(typeLetter(key));
        const currentLetter = words[currentWordIndex]?.[letterIdx];
        const isSame = currentLetter === key;

        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[letterIdx]?.classList.remove(styles.letterCurrent);
        childrenElements[letterIdx]?.classList.add(isSame ? styles.letterRight : styles.letterWrong);
        childrenElements[letterIdx + 1]?.classList.add(styles.letterCurrent);
        currentLetterRef.current = childrenElements[letterIdx] as HTMLSpanElement;
    }, [currentWordIndex, currentLetterIndex, dispatch, extraLetters.length, words])

    const raceStep: RaceStep = useRaceStep();

    const handleKeyPress = useCallback((key: string) => {
        if (raceStep === RaceStep.Initial) {
            dispatch(setRaceStep(RaceStep.Running));
            startTimer();
        }
        if (raceStep === RaceStep.Final) {
            return;
        }

        switch (key) {
            case "Backspace": {
                onPressBackspace();
                break;
            }
            case ' ': {
                onPressSpaceBar();
                break;
            }
            default: {
                onTypeLetter(key);
                break;
            }
        }
    }, [raceStep, dispatch, startTimer, onPressBackspace, onPressSpaceBar, onTypeLetter]);

    useKeyPress(handleKeyPress);

    const onReset = useCallback(() => {
        dispatch(onResetRaceState());

        const wordElementList = Array.from(wordsRef.current?.children || []);
        wordElementList.forEach(element => {
            Array.from(element?.children || [])?.forEach(element => {
                element.classList.remove(styles.letterCurrent);
                element.classList.remove(styles.letterRight);
                element.classList.remove(styles.letterExtra);
                element.classList.remove(styles.letterWrong);
            });
        })

        wordsRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
        currentWordRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});

        clearClass(currentWordRef);
        resetTimer();
        dispatch(setRaceStep(RaceStep.Initial));
    }, [dispatch, length, resetTimer]);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const onFocusHiddenInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    const topRef = useRef(0);

    useEffect(() => {
        const boundingClientRect = currentWordRef.current?.getBoundingClientRect();
        if (!boundingClientRect) {
            return;
        }
        if (boundingClientRect.top !== topRef.current) {
            topRef.current = boundingClientRect.top;
        }
    }, []);

    const onClick = useCallback(() => {
        onReset();
        resetTimer();
    }, [onReset, resetTimer]);


    const renderLetterList = useCallback((word: string, isActiveWord: boolean): React.ReactNode => {
        return <LetterList
            // @ts-ignore
            ref={currentLetterRef} word={word} isActiveWord={isActiveWord}
            currentLetterIndex={currentLetterIndex}/>
    }, [currentLetterIndex]);
    const renderCaret = useCallback(() => <CaretMemoized currentLetterIndex={currentLetterIndex}
                                                         key={currentWordIndex}/>, [currentLetterIndex, currentWordIndex]);
    if (raceStep === RaceStep.Final) {
        return (
            <FinalResult
                allWords={words.length}
                allChars={length}
                elapsed={elapsed}
                onReset={onReset}
            />
        );
    }

    return (
        <Container
            onClick={onFocusHiddenInput}
        >
            <WordList
                // @ts-ignore
                ref={wordsRef}
                words={words}
                currentWordIndex={currentWordIndex}
                currentWordRef={currentWordRef}
                renderLetterList={renderLetterList}
                renderCaret={renderCaret}
            >
                <ExtraLetters letters={extraLetters}/>
            </WordList>
            <div className={styles.actions}>
                <Button onClick={onReset}>restart</Button>
                <UpdateTextButton onClick={onClick}/>
            </div>
            <span>{elapsed}</span>
            <HiddenInput
                // @ts-ignore
                ref={inputRef}
                top={topRef.current}
            />
        </Container>
    );
};


type WordMemoizedProps = {
    isActive: boolean;
    word: string;
    children: React.ReactNode;
    renderLetterList: (word: string, isActiveWord: boolean) => React.ReactNode;
    renderCaret: () => React.ReactNode;
};

const WordMemoized: React.FC<WordMemoizedProps> = memo(forwardRef<HTMLDivElement, WordMemoizedProps>(function WordMemoized({
                                                                                                                               isActive,
                                                                                                                               word,
                                                                                                                               renderLetterList,
                                                                                                                               children,
                                                                                                                               renderCaret,
                                                                                                                           }, ref) {
        const renderLetterList1 = useMemo(() => renderLetterList(word, isActive), [renderLetterList, word, isActive]);
        return (
            <div
                // @ts-ignore
                ref={isActive ? ref : null}
                className={styles.word}
            >
                {renderLetterList1}
                {isActive && (
                    <>
                        {children}
                        {renderCaret()}
                    </>
                )}
            </div>
        );
    }), (prevProps, nextProps) =>
        prevProps.isActive === nextProps.isActive &&
        prevProps.word === nextProps.word &&
        prevProps.children === nextProps.children
);

type WordListProps = {
    words: string[];
    currentWordIndex: number;
    currentLetterIndex?: number;
    children: React.ReactNode;
    currentWordRef: React.MutableRefObject<HTMLDivElement | null>
    renderLetterList: (word: string, isActiveWord: boolean) => React.ReactNode;
    renderCaret: () => React.ReactNode;
}

const WordList: React.FC<WordListProps> = forwardRef<HTMLDivElement, WordListProps>(function WordList({
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
                // const isVisible = Math.abs( currentWordIndex - wordIdx) < 50;
                // if (!isVisible) {
                //     return null;
                // }

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


type LetterListProps = {
    word: string;
    isActiveWord: boolean;
    currentLetterIndex: number;
}

const LetterList: React.FC<LetterListProps> = forwardRef<HTMLSpanElement, LetterListProps>(function LetterList({
                                                                                                                   word,
                                                                                                                   isActiveWord,
                                                                                                                   currentLetterIndex,
                                                                                                               }, ref) {
    const letters: string[] = useMemo(() => word.split(''), [word]);

    return letters.map((letter: string, letterIdx: number) => {
        const isCurrent = isActiveWord && letterIdx === currentLetterIndex;
        return (
            <LetterMemoized
                key={`${letter}-${letterIdx}`}
                ref={isCurrent ? ref : null}
                isCurrent={isCurrent}
            >
                {letter}
            </LetterMemoized>
        );
    });
});

type ExtraLetters = {
    letters: string[];
};

const ExtraLetters: React.FC<ExtraLetters> = ({
                                                  letters,
                                              }) => {
    return letters.map((letter: string, letterIdx: number) => {
        return (
            <LetterMemoized
                key={`${letter}-${letterIdx}`}
                isExtra
            >
                {letter}
            </LetterMemoized>
        );
    });
};

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

const CaretMemoized = memo(Caret);

type LetterProps = {
    isCurrent?: boolean;
    isExtra?: boolean;
    children: React.ReactNode;
};

const Letter = forwardRef<HTMLSpanElement, LetterProps>(function Letter(props: LetterProps, ref) {
    return (
        <span
            ref={props.isCurrent ? ref : null}
            className={!props.isExtra ? styles.letter : styles.letterExtra}
        >
            {props.children}
        </span>
    );
});

const LetterMemoized = memo(Letter);
