'use client';

import React, {useCallback, useEffect, useRef, useState} from "react";

import Layout from "@/shared/ui/Layout";


import {getText} from "@/app/monkeytype/client";
import {RaceStep, useKeyPress} from "@/app/monkeytype/Monkeytype";
import styles from "@/app/monkeytype/client.module.css";
import cn from "classnames";

const sampleText = getText()
const length = sampleText.join(' ').length;

type Accuracy = {
    correct: number;
    incorrect: number;
    missed: number;
};

type InputData = {
    current: string;
    history: string[];
    historyLength: number;
    wordIdx: number;
    length: number;
    letterIdx: number;
    isTyping: boolean;
    extraLetters: string[];
    accuracy: Accuracy;
};

type NewTypingText = {
    words: string[];
    length: number;
};


const useTimer = () => {
    const [seconds, setSeconds] = useState<number>(0);

    const [enabled, setEnabled] = useState(false);

    const [startedAt, setStartedAt] = useState<number|undefined>(undefined);
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
            setSeconds(delta / 1000);
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
    // console.log({accuracy})
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

type FinalResultParams = {
    elapsed: number;
    allChars: number;
    allWords: number;
    accuracy: Accuracy;
    onReset: () => void;
};

const FinalResult = (props: FinalResultParams) => {
    const {wpm, raw} = calculateWpmAndRaw(props.elapsed, props.accuracy)
    return (
        <div className={styles.container}>
            <p>{`elapsed: ${props.elapsed} seconds`}</p>
            <p>{`raw cpm: ${Math.floor((props.accuracy.correct + props.accuracy.incorrect + props.accuracy.missed) / props.elapsed * 60)}`}</p>
            <p>{`cpm: ${Math.floor((props.accuracy.correct) / props.elapsed * 60)}`}</p>
            <p>{`accuracy: ${props.accuracy.correct}/${props.allChars}`}</p>
            <p>{`accuracy: ${Math.floor((props.accuracy.correct / (props.accuracy.correct + props.accuracy.incorrect + props.accuracy.missed)) * 100)}%`}</p>
            <p>{`wpm: ${wpm}`}</p>
            <p>{`raw: ${raw}`}</p>
            <button onClick={props.onReset}>reset</button>
        </div>
    );
}

const NewTypingText: React.FC<NewTypingText> = ({
                                                    words,
                                                    length,
                                                }) => {
    const [raceState, setRaceState] = useState<RaceStep>(RaceStep.Initial);
    const initialValue = {
        current: '',
        history: [],
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
    };

    const {elapsed, startedAt, start, stop} = useTimer();

    const inputDataRef = useRef<InputData>(initialValue);

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const currentLetterRef = useRef<HTMLSpanElement | null>(null);

    // const timeoutRef = useRef<number>(null);
    // console.log(inputDataRef.current);
    const handleKeyPress = useCallback((key: string) => {
        if (raceState === RaceStep.Initial) {
            setRaceState(RaceStep.Running);
            start();
        }
        // if (!inputDataRef.current.isTyping) {
        //     console.log('init typeing')
        //     inputDataRef.current.isTyping = true;
        // }
        // const id = setTimeout(() => {
        //     if (timeoutRef.current) {
        //         clearTimeout(timeoutRef.current)
        //     }
        //     console.log('reset typing');
        //     inputDataRef.current.isTyping = false;
        //     console.log(inputDataRef.current.isTyping)
        // }, 1000);
        // timeoutRef.current = id;
        switch (key) {
            case "Backspace": {
                const state = inputDataRef.current;
                const extraLetters = inputDataRef.current.extraLetters;
                const current = inputDataRef.current.current;
                const childs = Array.from(currentWordRef.current?.children || []);
                const item = childs[inputDataRef.current.letterIdx - 1]
                // console.log(item);
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
                inputDataRef.current.accuracy.correct++;
                inputDataRef.current.wordIdx++;
                const wordElementList = Array.from(wordsRef.current?.children || []);
                const currentWordElement = wordElementList[inputDataRef.current.wordIdx];
                Array.from(currentWordElement?.children || [])?.[0]?.classList?.add(styles.letterCurrent);

                const childs = Array.from(currentWordRef.current?.children || []);
                childs[childs.length - 1];
                childs.forEach(child => {
                    child.classList.remove(styles.letterCurrent)
                })
                inputDataRef.current.history.push(inputDataRef.current.current);
                // break;
                if (inputDataRef.current.wordIdx < words.length) {
                    inputDataRef.current.current = '';
                    inputDataRef.current.letterIdx = 0;
                    inputDataRef.current.extraLetters = [];
                } else {
                    stop();
                    setRaceState(RaceStep.Final);
                }
                break;
            }
            default: {
                inputDataRef.current.letterIdx++;
                const state = inputDataRef.current;
                const nextIdx = state.letterIdx + 1;
                const currentWord = words[state.wordIdx];
                inputDataRef.current.current += key;
                if (nextIdx > currentWord.length + 1) {
                    inputDataRef.current.accuracy.missed++;
                    inputDataRef.current.extraLetters.push(key)
                    return;
                }
                let word = words[state.wordIdx];
                const letter = word[state.letterIdx - 1];
                // console.log({word, letter, key});
                if (inputDataRef.current.current.length > word.length) {
                    inputDataRef.current.extraLetters.push(key)
                }
                const childs = Array.from(currentWordRef.current?.children || []);
                childs[state.letterIdx - 1]?.classList.remove(styles.letterCurrent);
                if (letter !== key) {
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
    }, [words]);

    useKeyPress(handleKeyPress);

    const onReset = () => {
        inputDataRef.current = {
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
            }
        };
        stop();
        setRaceState(RaceStep.Initial);
    }
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
                allWords={words.length}
                allChars={length}
                elapsed={elapsed}
                accuracy={inputDataRef.current.accuracy}
                onReset={onReset}
            />
        )
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
            <p>{inputDataRef.current.current}</p>
            <span>{elapsed}</span>
            <input
                className={styles.inputHidden}
                onChange={noop}
                ref={inputRef} type="text" autoComplete="off" autoCapitalize="off"
                autoCorrect="off"
                style={{top: topRef.current }}
                list="autocompleteOff" spellCheck="false"
            />
        </div>
    );
};

const noop = () => {
};

export const NewMonkeytype = () => {
    return (
        <Layout bgColor='#323437'>
            <NewTypingText length={length} words={sampleText}/>
        </Layout>
    );
}