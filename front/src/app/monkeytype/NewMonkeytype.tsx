'use client';

import React, {lazy, Suspense, useCallback, useEffect, useRef, useState} from "react";
import cn from "classnames";

import Layout from "@/shared/ui/Layout";

import {RaceStep, useKeyPress} from "@/app/monkeytype/Monkeytype";
import styles from "@/app/monkeytype/client.module.css";
import {useGetWords} from "@/entities/monkeytype/hook";
import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {wordsKey} from "@/entities/monkeytype/const";

const ChartView = lazy(() => import("@/app/monkeytype/ChartView"))

type Accuracy = {
    correct: number;
    incorrect: number;
    missed: number;
};

type ErrorHistoryObject = {
    count: number;
    words: number[];
};

type HistoryResult = {
    errors: ErrorHistoryObject[],
    wpmHistory: number[],
    rawHistory: number[],
};
type InputData = {
    current: string;
    historyLength: number;
    wordIdx: number;
    length: number;
    letterIdx: number;
    activeWordIdx: number;
    isTyping: boolean;
    extraLetters: string[];
    accuracy: Accuracy;
    history: string[];
    historyResult: HistoryResult;
};

type NewTypingText = {
    words: string[];
    length: number;
};


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
        // setSeconds(0);
        setStartedAt(0);
        setEnabled(false);
        clearInterval(timerRef.current);
    }
    return {
        elapsed: seconds,
        startedAt,
        start,
        stop,
    };
};

type WpmAndRaw = {
    wpm: number;
    raw: number;
};

export function roundTo2(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function calculateWpmAndRaw(
    testSeconds: number,
    accuracy: Accuracy,
    withDecimalPoints: boolean = false,
): WpmAndRaw {
    const wpm = roundTo2(
        ((accuracy.correct) * (60 / testSeconds)) / 5
    );
    const raw = roundTo2(
        ((accuracy.correct +
                accuracy.incorrect +
                accuracy.missed) *
            (60 / testSeconds)) /
        5
    );
    return {
        wpm: withDecimalPoints ? wpm : Math.round(wpm),
        raw: withDecimalPoints ? raw : Math.round(raw),
    };
}

type TypeingStatisticProps = {
    elapsed: number;
    allChars: number;
    allWords: number;
    accuracy: Accuracy;
    onReset: () => void;
};

const TypeingStatistic: React.FC<TypeingStatisticProps> = ({
    accuracy,
    elapsed,
    allChars,
    onReset,
                                                      }) => {
    const {wpm, raw} = calculateWpmAndRaw(elapsed, accuracy)

    return (
        <div>
            <p>{`elapsed: ${elapsed} seconds`}</p>
            <p>{`raw cpm: ${Math.floor((accuracy.correct + accuracy.incorrect + accuracy.missed) / elapsed * 60)}`}</p>
            <p>{`cpm: ${Math.floor((accuracy.correct) / elapsed * 60)}`}</p>
            <p>{`accuracy: ${accuracy.correct}/${allChars}`}</p>
            <p>{`accuracy: ${Math.floor((accuracy.correct / (accuracy.correct + accuracy.incorrect + accuracy.missed)) * 100)}%`}</p>
            <p>{`wpm: ${wpm}`}</p>
            <p>{`raw: ${raw}`}</p>
            <p>{`incorrect letters: ${accuracy.incorrect}`}</p>

            <button onClick={onReset}>reset</button>
        </div>
    );
};

type FinalResultProps = TypeingStatisticProps & {
    history: HistoryResult;
};

const FinalResult: React.FC<FinalResultProps> = (props) => {
    return (
        <div className={styles.container}>
            <Suspense>
                <ChartView
                    seconds={props.elapsed}
                    raw={props.history.rawHistory.filter(it => it !== Infinity)}
                    wpm={props.history.wpmHistory.filter(it => it !== Infinity)}
                    errors={props.history.errors.map(it => it.count)}
                />
            </Suspense>
            <TypeingStatistic {...props} />
            <div>{JSON.stringify(history)}</div>
        </div>
    );
}

function clearClass(currentWordRef: React.MutableRefObject<HTMLDivElement | null>, inputDataRef: React.MutableRefObject<InputData>) {
    const childs = Array.from(currentWordRef.current?.children || []);
    childs[childs.length - 1];
    childs.forEach(child => {
        child.classList.remove(styles.letterCurrent)
    })
    inputDataRef.current.history.push(inputDataRef.current.current);
}

const NewTypingText: React.FC<NewTypingText> = ({
                                                    words,
                                                    length,
                                                }) => {
    const [raceState, setRaceState] = useState<RaceStep>(RaceStep.Initial);
    const initialValue: InputData = {
        current: '',
        historyLength: 0,
        length,
        wordIdx: 0,
        letterIdx: 0,
        extraLetters: [],
        activeWordIdx: 0,
        isTyping: false,
        accuracy: {
            correct: 0,
            incorrect: 0,
            missed: 0,
        },
        history: [],
        historyResult: {
            errors: [],
            wpmHistory: [],
            rawHistory: [],
        },
    };

    const {elapsed, startedAt, start, stop} = useTimer();

    const lastRef = useRef<number>(elapsed);

    const tempErrorObjectRef = useRef<ErrorHistoryObject>({
        count: 0,
        words: [],
    });

    const prevTimeRef = useRef(0);

    const saveHistory = () => {
        const {wpm, raw} = calculateWpmAndRaw(elapsed, inputDataRef.current.accuracy);

        inputDataRef.current.historyResult.wpmHistory.push(wpm);
        inputDataRef.current.historyResult.rawHistory.push(raw);
        const errorHistoryObject = tempErrorObjectRef.current;
        inputDataRef.current.historyResult.errors.push({
            count: errorHistoryObject.count,
            words: Array.from(new Set(errorHistoryObject.words).values())
        });
        tempErrorObjectRef.current = {
            count: 0,
            words: [],
        };
    }

    useEffect(() => {
        if (elapsed - prevTimeRef.current < 1) {
            return;
        }
        prevTimeRef.current = elapsed;
        lastRef.current = elapsed;
        saveHistory();
    }, [elapsed]);

    const inputDataRef = useRef<InputData>(initialValue);

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const currentLetterRef = useRef<HTMLSpanElement | null>(null);

    const handleKeyPress = useCallback((key: string) => {
        if (raceState === RaceStep.Initial) {
            setRaceState(RaceStep.Running);
            start();
        }
        if (raceState === RaceStep.Final) {
            return;
        }

        switch (key) {
            case "Backspace": {
                const state = inputDataRef.current;
                const extraLetters = inputDataRef.current.extraLetters;
                const current = inputDataRef.current.current;
                const childs = Array.from(currentWordRef.current?.children || []);
                const item = childs[inputDataRef.current.letterIdx - 1]
                childs[state.letterIdx]?.classList?.remove(styles.letterCurrent);
                childs[state.letterIdx - 1]?.classList?.add(styles.letterCurrent);
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
                }
                break;
            }
            case ' ': {
                if (inputDataRef.current.letterIdx === 0) {
                    return;
                }
                const currentWord = words[inputDataRef.current.wordIdx];
                if (inputDataRef.current.letterIdx < currentWord.length) {
                    tempErrorObjectRef.current.count += currentWord.length - inputDataRef.current.letterIdx;
                    tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
                }

                inputDataRef.current.accuracy.correct++;
                inputDataRef.current.wordIdx++;
                const wordElementList = Array.from(wordsRef.current?.children || []);
                const currentWordElement = wordElementList[inputDataRef.current.wordIdx];
                const fromElement = Array.from(currentWordElement?.children || [])?.[0];
                fromElement?.scrollIntoView({block: 'center', behavior: 'smooth'});
                fromElement?.classList?.add(styles.letterCurrent);
                clearClass(currentWordRef, inputDataRef);
                // break;
                if (inputDataRef.current.wordIdx < words.length) {
                    inputDataRef.current.current = '';
                    inputDataRef.current.letterIdx = 0;
                    inputDataRef.current.extraLetters = [];
                } else {
                    saveHistory();
                    stop();
                    setRaceState(RaceStep.Final);
                }
                break;
            }
            default: {
                if (inputDataRef.current.extraLetters.length > 8) {
                    tempErrorObjectRef.current.count++;
                    tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
                    return;
                }
                inputDataRef.current.letterIdx++;
                const state = inputDataRef.current;
                const nextIdx = state.letterIdx + 1;
                const currentWord = words[state.wordIdx];
                if (!currentWord) {
                    // setRaceState(RaceStep.Final);
                    // return;
                }
                inputDataRef.current.current += key;
                if (nextIdx > currentWord?.length + 1) {
                    tempErrorObjectRef.current.count++;
                    tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
                    inputDataRef.current.accuracy.missed++;
                    inputDataRef.current.extraLetters.push(key)
                    return;
                }
                const word = words[state.wordIdx];
                const letter = word?.[state.letterIdx - 1];
                if (inputDataRef.current.current.length > word.length) {
                    inputDataRef.current.extraLetters.push(key)
                }
                const childs = Array.from(currentWordRef.current?.children || []);
                childs[state.letterIdx - 1]?.classList.remove(styles.letterCurrent);
                if (letter !== key) {
                    tempErrorObjectRef.current.count++;
                    tempErrorObjectRef.current.words.push(inputDataRef.current.wordIdx);
                    childs[state.letterIdx - 1]?.classList.add(styles.letterWrong);
                    inputDataRef.current.accuracy.incorrect++;
                } else {
                    inputDataRef.current.accuracy.correct++;
                    childs[state.letterIdx - 1]?.classList.add(styles.letterRight);
                }
                childs[state.letterIdx]?.classList.add(styles.letterCurrent);
                currentLetterRef.current = childs[state.letterIdx] as HTMLSpanElement;
                break;
            }
        }
    }, [words, raceState]);

    useKeyPress(handleKeyPress);

    const onReset = () => {
        const wordElementList = Array.from(wordsRef.current?.children || []);
        wordElementList.forEach(element => {
            Array.from(element?.children || [])?.forEach(element => {
                element.classList.remove(styles.letterCurrent);
                element.classList.remove(styles.letterRight);
                element.classList.remove(styles.letterExtra);
                element.classList.remove(styles.letterWrong);
            });
        })

        inputDataRef.current = {
            activeWordIdx: 0,
            current: '',
            history: [],
            historyLength: 0,
            length,
            wordIdx: 0,
            letterIdx: 0,
            extraLetters: [],
            isTyping: false,
            accuracy: {
                incorrect: 0,
                correct: 0,
                missed: 0,
            },
            historyResult: {
                errors: [],
                wpmHistory: [],
                rawHistory: [],
            }
        };
        clearClass(currentWordRef, inputDataRef);
        stop();
        setRaceState(RaceStep.Initial);
    };

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
    }, [currentWordRef.current]);

    if (raceState === RaceStep.Final) {
        return (
            <FinalResult
                history={inputDataRef.current.historyResult}
                allWords={words.length}
                allChars={length}
                elapsed={elapsed}
                accuracy={inputDataRef.current.accuracy}
                onReset={onReset}
            />
        );
    }

    return (
        <div
            onClick={onFocusHiddenInput}
            className={styles.container}
        >
            {/*{inputDataRef.current.isTyping ? 'no carret' : 'with caret'}*/}

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
            <button onClick={onReset}>restart</button>
            <UpdateTextButton/>
            <p>{inputDataRef.current.current}</p>
            <span>{elapsed}</span>
            <input
                className={styles.inputHidden}
                onChange={noop}
                ref={inputRef} type="text" autoComplete="off" autoCapitalize="off"
                autoCorrect="off"
                style={{top: topRef.current}}
                list="autocompleteOff" spellCheck="false"
            />
        </div>
    );
};

const noop = () => {
};

type UpdateTextButtonProps = {
    children?: React.ReactNode;
}

const UpdateTextButton: React.FC<UpdateTextButtonProps> = ({
                                                               children = undefined
                                                           }) => {
    const queryClient: QueryClient = useQueryClient();

    const onUpdateText = useCallback(async () => {
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
    }, [queryClient]);

    return (
        <button onClick={onUpdateText}>update text{children && children}</button>
    );
};

export const NewMonkeytype = () => {
    const {data, isError} = useGetWords();

    return (
        <Layout bgColor='#323437'>
            {isError && (<p>Error</p>)}
            {data && (
                <NewTypingText length={data.length} words={data.words}/>
            )}
        </Layout>
    );
}