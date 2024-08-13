import React, {useCallback, useEffect, useRef, useState} from "react";
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
    incrementAccuracyCorrect,
    incrementAccuracyExtra,
    incrementAccuracyIncorrect,
    incrementAccuracyMissed,
    incrementErrorObject,
    onResetRaceState,
    onSaveHistory,
    setRaceStep,
} from "@/entities/race/slice";
import {useCurrentWordIndex, useRaceStep} from "@/entities/race/selector";

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

export type InputData = {
    current: string;
    wordIdx: number;
    length: number;
    letterIdx: number;
    extraLetters: string[];
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
    const initialValue: InputData = {
        current: '',
        length,
        wordIdx: 0,
        letterIdx: 0,
        extraLetters: [],
    };

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

    const inputDataRef = useRef<InputData>(initialValue);

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const currentLetterRef = useRef<HTMLSpanElement | null>(null);

    const onPressBackspace = useCallback((): void => {
        const currentLetterIndex = inputDataRef.current.letterIdx;

        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[currentLetterIndex]?.classList?.remove(styles.letterCurrent);
        childrenElements[currentLetterIndex - 1]?.classList?.add(styles.letterCurrent);

        const item: Element = childrenElements[currentLetterIndex - 1]
        item?.classList.remove(styles.letterRight);
        item?.classList.remove(styles.letterWrong);

        // -------
        const extraLetters: string[] = inputDataRef.current.extraLetters;
        const current: string = inputDataRef.current.current;
        if (extraLetters.length > 0) {
            inputDataRef.current.letterIdx--;
            inputDataRef.current.extraLetters = extraLetters.splice(0, extraLetters.length - 1);
            inputDataRef.current.current = current.substring(0, current.length - 1);
            return;
        }
        if (current.length > 0) {
            inputDataRef.current.current = current.substring(0, current.length - 1);
            inputDataRef.current.letterIdx--;
            return;
        }
    }, []);

    // const currentWordIndex = useCurrentWordIndex();
    const currentWordIndex = inputDataRef.current.wordIdx;

    const onPressSpaceBar = useCallback(() => {
        const currentLetterIndex = inputDataRef.current.letterIdx;
        if (currentLetterIndex === 0) {
            return;
        }
        const currentWordIndex = inputDataRef.current.wordIdx;
        const currentWord = words[currentWordIndex];
        if (currentLetterIndex < currentWord.length) {
            const count = currentWord.length - currentLetterIndex;
            dispatch(incrementAccuracyMissed(count));
            dispatch(incrementErrorObject({count, wordIdx: currentWordIndex}));
        }

        dispatch(incrementAccuracyCorrect());
        inputDataRef.current.wordIdx++;

        const wordElementList = Array.from(wordsRef.current?.children || []);

        const currentWordElement = wordElementList[currentWordIndex];
        const fromElement = Array.from(currentWordElement?.children || [])?.[0];
        fromElement?.scrollIntoView({block: 'center', behavior: 'smooth'});
        fromElement?.classList?.add(styles.letterCurrent);
        clearClass(currentWordRef);

        if (inputDataRef.current.wordIdx < words.length) {
            inputDataRef.current.current = '';
            inputDataRef.current.letterIdx = 0;
            inputDataRef.current.extraLetters = [];
        } else {
            saveHistory();
            stopTimer();
            dispatch(setRaceStep(RaceStep.Final));
        }
    }, [dispatch, saveHistory, stopTimer, words, currentWordIndex]);

    const onTypeLetter = useCallback((key: string): void => {
        const currentWordIndex = inputDataRef.current.wordIdx;
        if (inputDataRef.current.extraLetters.length > 8) {
            dispatch(incrementErrorObject({count: 1, wordIdx: currentWordIndex}));
            return;
        }
        inputDataRef.current.letterIdx++;

        const currentLetterIndex: number = inputDataRef.current.letterIdx;
        const nextLetterIndex: number = currentLetterIndex + 1;

        const currentWord: string = words[currentWordIndex];
        inputDataRef.current.current += key;
        if (nextLetterIndex > currentWord?.length + 1) {
            dispatch(incrementErrorObject({count: 1, wordIdx: currentWordIndex}));
            dispatch(incrementAccuracyExtra())
            inputDataRef.current.extraLetters.push(key)
            return;
        }
        const currentLetter: string = currentWord?.[currentLetterIndex - 1];
        if (inputDataRef.current.current.length > currentWord.length) {
            inputDataRef.current.extraLetters.push(key)
        }

        const isSame = currentLetter === key;
        if (!isSame) {
            dispatch(incrementErrorObject({count: 1, wordIdx: currentWordIndex}));
            dispatch(incrementAccuracyIncorrect());
        } else {
            dispatch(incrementAccuracyCorrect())
        }

        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[currentLetterIndex - 1]?.classList.remove(styles.letterCurrent);
        childrenElements[currentLetterIndex - 1]?.classList.add(isSame? styles.letterRight : styles.letterWrong);
        childrenElements[currentLetterIndex]?.classList.add(styles.letterCurrent);
        currentLetterRef.current = childrenElements[currentLetterIndex] as HTMLSpanElement;
    }, [dispatch, words])

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
    }, [words, raceStep, dispatch]);

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

        inputDataRef.current = {
            current: '',
            length,
            wordIdx: 0,
            letterIdx: 0,
            extraLetters: [],
        };
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
            <div ref={wordsRef} className={styles.words}>
                {words.map((word, wordIdx) => {
                    const isActiveWord = wordIdx === currentWordIndex;
                    return (
                        <div
                            key={`${word}-${wordIdx}`}
                            ref={isActiveWord ? currentWordRef : null}
                            className={cn(styles.word, isActiveWord && styles.wordActive)}
                        >
                            {word.split('').map((letter, letterIdx) => {
                                const isCurrent = isActiveWord && letterIdx === inputDataRef.current.letterIdx;
                                return (
                                    <span
                                        key={`${letter}-${letterIdx}-${wordIdx}`}
                                        ref={isCurrent ? currentLetterRef : null}
                                        className={styles.letter}
                                    >
                                        {letter}
                                    </span>
                                )
                            })}
                            {isActiveWord && inputDataRef.current.extraLetters.map((letter, letterIdx) => {
                                return (
                                    <span
                                        key={`${letter}-${letterIdx}-${wordIdx}`}
                                        className={styles.letterExtra}
                                    >
                                        {letter}
                                    </span>
                                )
                            })}
                            {isActiveWord && (
                                <span className={cn(styles.caret, styles.caretBlink)}
                                      style={{left: Math.max(inputDataRef.current.letterIdx, 0) * 20 + 'px'}}></span>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className={styles.actions}>
                <Button onClick={onReset}>restart</Button>
                <UpdateTextButton onClick={onClick}/>
            </div>
            <span>{elapsed}</span>
            <HiddenInput
                ref={inputRef}
                top={topRef.current}
            />
        </Container>
    );
};
