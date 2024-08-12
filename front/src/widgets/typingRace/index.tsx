import React, {useCallback, useEffect, useRef, useState} from "react";
import cn from "classnames";
import {useKeyPress} from "@/shared/hooks";

import styles from "@/app/monkeytype/client.module.css";

import {UpdateTextButton} from "@/features/face/update-text-button";
import Button from "@/shared/ui/Button";

import {ErrorHistoryObject, NewTypingText, RaceStep} from "@/entities/race/model";
import {HiddenInput} from "@/widgets/typingRace/ui/HiddenInput";
import {Container} from "@/shared/ui/Container";
import {FinalResultContainer as FinalResult} from "@/widgets/typingRace/ui/FinalResult";
import {useDispatch} from "react-redux";
import {
    incrementAccuracyCorrect,
    incrementAccuracyIncorrect,
    incrementAccuracyMissed,
    onResetRaceState,
    onSaveHistory
} from "@/entities/race/slice";

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
    activeWordIdx: number;
    isTyping: boolean;
    extraLetters: string[];
    // historyResult: HistoryResult;
};


function clearClass(currentWordRef: React.MutableRefObject<HTMLDivElement | null>) {
    const childs = Array.from(currentWordRef.current?.children || []);
    childs[childs.length - 1];
    childs.forEach(child => {
        child.classList.remove(styles.letterCurrent)
    })
}


export const TypingRace: React.FC<NewTypingText> = ({
                                                        words,
                                                        length,
                                                    }) => {
    const [raceState, setRaceState] = useState<RaceStep>(RaceStep.Initial);
    const initialValue: InputData = {
        current: '',
        length,
        wordIdx: 0,
        letterIdx: 0,
        extraLetters: [],
        activeWordIdx: 0,
        isTyping: false,
    };

    const {elapsed, startedAt, startTimer, stopTimer, resetTimer,} = useTimer();

    const lastRef = useRef<number>(elapsed);

    const tempErrorObjectRef = useRef<ErrorHistoryObject>({
        count: 0,
        words: [],
    });

    const prevTimeRef = useRef(0);

    const dispatch = useDispatch();

    const saveHistory = useCallback(() => {
        dispatch(onSaveHistory({
            elapsedSeconds: elapsed,
            errorHistoryObject: tempErrorObjectRef.current,
        }));
        tempErrorObjectRef.current = {
            count: 0,
            words: [],
        };
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
        const extraLetters: string[] = inputDataRef.current.extraLetters;
        const current: string = inputDataRef.current.current;
        const childs: Element[] = Array.from(currentWordRef.current?.children || []);
        childs[inputDataRef.current.letterIdx]?.classList?.remove(styles.letterCurrent);
        childs[inputDataRef.current.letterIdx - 1]?.classList?.add(styles.letterCurrent);

        const item: Element = childs[inputDataRef.current.letterIdx - 1]

        item?.classList.remove(styles.letterRight);
        item?.classList.remove(styles.letterWrong);
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

    const onPressSpaceBar = useCallback(() => {
        if (inputDataRef.current.letterIdx === 0) {
            return;
        }
        const currentWord = words[inputDataRef.current.wordIdx];
        if (inputDataRef.current.letterIdx < currentWord.length) {
            tempErrorObjectRef.current.count += currentWord.length - inputDataRef.current.letterIdx;
            tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
        }

        dispatch(incrementAccuracyCorrect())
        inputDataRef.current.wordIdx++;
        const wordElementList = Array.from(wordsRef.current?.children || []);
        const currentWordElement = wordElementList[inputDataRef.current.wordIdx];
        const fromElement = Array.from(currentWordElement?.children || [])?.[0];
        fromElement?.scrollIntoView({block: 'center', behavior: 'smooth'});
        fromElement?.classList?.add(styles.letterCurrent);
        clearClass(currentWordRef);
        // break;
        if (inputDataRef.current.wordIdx < words.length) {
            inputDataRef.current.current = '';
            inputDataRef.current.letterIdx = 0;
            inputDataRef.current.extraLetters = [];
        } else {
            saveHistory();
            stopTimer();
            setRaceState(RaceStep.Final);
        }
    }, [dispatch, saveHistory, stopTimer, words]);

    const onTypeLetter = useCallback((key: string): void => {
        if (inputDataRef.current.extraLetters.length > 8) {
            tempErrorObjectRef.current.count++;
            tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
            return;
        }
        inputDataRef.current.letterIdx++;
        const state = inputDataRef.current;
        const nextIdx = state.letterIdx + 1;
        const currentWord = words[state.wordIdx];
        inputDataRef.current.current += key;
        if (nextIdx > currentWord?.length + 1) {
            tempErrorObjectRef.current.count++;
            tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
            dispatch(incrementAccuracyMissed())
            inputDataRef.current.extraLetters.push(key)
            return;
        }
        const word = words[state.wordIdx];
        const letter = word?.[state.letterIdx - 1];
        if (inputDataRef.current.current.length > word.length) {
            inputDataRef.current.extraLetters.push(key)
        }
        const childs: Element[] = Array.from(currentWordRef.current?.children || []);
        childs[state.letterIdx - 1]?.classList.remove(styles.letterCurrent);
        if (letter !== key) {
            tempErrorObjectRef.current.count++;
            tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
            childs[state.letterIdx - 1]?.classList.add(styles.letterWrong);
            dispatch(incrementAccuracyIncorrect());
        } else {
            dispatch(incrementAccuracyCorrect())
            childs[state.letterIdx - 1]?.classList.add(styles.letterRight);
        }
        childs[state.letterIdx]?.classList.add(styles.letterCurrent);
        currentLetterRef.current = childs[state.letterIdx] as HTMLSpanElement;
    }, [dispatch, words])

    const handleKeyPress = useCallback((key: string) => {
        if (raceState === RaceStep.Initial) {
            setRaceState(RaceStep.Running);
            startTimer();
        }
        if (raceState === RaceStep.Final) {
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
    }, [words, raceState]);

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
            activeWordIdx: 0,
            current: '',
            length,
            wordIdx: 0,
            letterIdx: 0,
            extraLetters: [],
            isTyping: false,
        };
        clearClass(currentWordRef);
        resetTimer();
        setRaceState(RaceStep.Initial);
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

    if (raceState === RaceStep.Final) {
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
                    const isActiveWord = wordIdx === inputDataRef.current.wordIdx;
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
                                      style={{left: Math.max((inputDataRef.current.letterIdx), 0) * 20 + 'px'}}></span>
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

const noop = () => {
};

