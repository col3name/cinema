'use client';
import React, {memo, useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

import Layout from "@/shared/ui/Layout";

import styles from './client.module.css';

import {getText} from "@/app/monkeytype/client";

const useKeyPress = (callback: any) => {
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    useEffect(() => {
        const downHandler = (e: any) => {
            const {key} = e;
            if ((key.length === 1 || key === "Backspace")) {
                setKeyPressed(key);
                callback && callback(key);
            }

            if (e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        };
        const upHandler = () => {
            setKeyPressed(null);
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};


enum RaceStep {
    Initial = 0,
    FirstPress = 1,
    Running = 2,
    Final = 3,
}

function TypingText({words}: { words: string[] }) {
    const initialTextRef = useRef(words.join(' '));

    const [charsTyped, setCharsTyped] = useState<string[]>([]);
    const [charsToType, setCharsToType] = useState<string[]>([]);
    const [seconds, setSeconds] = useState(0);
    const [raceStep, setRaceStep] = useState<RaceStep>(RaceStep.Initial);

    useEffect(() => {
        const chars: string[] = initialTextRef.current.trim().split("").map(c => c)
        setCharsToType(chars);
    }, []);

    console.log({raceStep});

    const callback = useCallback((key: string) => {
        if (raceStep === RaceStep.Initial) {
            setRaceStep(RaceStep.FirstPress);
        } else if (raceStep === RaceStep.FirstPress) {
            setRaceStep(RaceStep.Running);
        }
        if (raceStep === RaceStep.Final) {
            return;
        }
        if (key != "Backspace") {
            setCharsTyped((prevChrsTyped) => ([...prevChrsTyped, key]));
        } else {
            // Create a shallow copy of prev Chrs typed excluding the last element.
            setCharsTyped((prevChrsTyped) => prevChrsTyped.slice(0, prevChrsTyped.length - 1));
        }
    }, [raceStep, setCharsTyped, setRaceStep]);

    useKeyPress(callback)

    useEffect(() => {
        if (raceStep !== RaceStep.FirstPress) {
            return;
        }
        const start = Date.now();
        const handler = () => {
            const delta = Date.now() - start;
            setSeconds(delta / 1000);
        };
        const timer = setInterval(handler, 100);

        return () => {
            clearInterval(timer);
        }
    }, [raceStep]);

    useEffect(() => {
        if (charsTyped.length >= initialTextRef.current.length) {
            setRaceStep(RaceStep.Final);
        }
    }, [charsTyped.length]);

    const initRef = useRef(0);
    const onReset = useCallback((e: any) => {
        setCharsTyped([]);
        setSeconds(0);
        setRaceStep(RaceStep.Initial);
        initRef.current++;
        e.currentTarget.blur();
    }, []);

    const isFinal = raceStep === RaceStep.Final;

    useEffect(() => {
        const listener = (event: Event) => {
            if (document.visibilityState == "visible") {
                console.log("tab is active")
            } else {
                console.log("tab is inactive")
            }
        };
        document.addEventListener("visibilitychange", listener);
        return () => {
            document.removeEventListener("visibilitychange", listener);
        }
    }, []);

    const inputRef = useRef<HTMLInputElement|null>(null);

    useEffect(() => {
        inputRef.current?.focus({preventScroll: true});
    }, []);
    return (
        <div className={styles.container}>
            {seconds}
            <input ref={inputRef} id="wordsInput" className="full-width" type="text" autoComplete="off" autoCapitalize="off"
                   autoCorrect="off" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"
                   list="autocompleteOff" spellCheck="false" style={{top: '74px', left: '8px', position: 'absolute',}}
            />
            <button className={styles.button} onClick={onReset}>restart</button>
            {isFinal && (
                <FinalView
                    charsTyped={charsTyped}
                    charsToType={charsToType}
                    seconds={seconds}
                />
            )}

            {!isFinal && (
                <div>
                    {initialTextRef.current.trim().split("").map((letter: string, index: number) => {
                        return (
                            <Character
                                restart={initRef.current}
                                letter={letter}
                                key={`${letter}-${index}`}
                                id={index}
                                charsTyped={charsTyped}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

type FinalViewProps = {
    charsTyped: string[];
    charsToType: string[];
    seconds: number;
}

const FinalView: React.FC<FinalViewProps> = ({
                                                 charsTyped,
                                                 charsToType,
                                                 seconds,
                                             }) => {
    const correct = charsTyped.reduce((acc, chr, i) => {
        return chr == charsToType[i] ? acc + 1 : acc;
    }, 0)


    const accuracy = correct / charsTyped.length * 100;
    const accuracyText = `${correct} / ${charsTyped.length} (${(accuracy).toFixed(0)}%)`
    const wpm = (charsTyped.length / 5) / (seconds / 60);

    return (
        <div>
            <p>{`Incorrect: ${charsTyped.length - correct}`}</p>
            <p>{`Accuracy: ${isNaN(accuracy) ? '-' : accuracyText}`}</p>
            <p>{`WPM: ${isNaN(wpm) ? '-' : (wpm).toFixed(0)}`}</p>
        </div>
    )
}

type Props = {
    letter: string;
    id: number;
    charsTyped: string[];
    restart?: number;
};

const Comp = ({letter, id, charsTyped}: Props) => {
    // const classes = withStyles()
    let CharTypography;

    if (id == charsTyped.length) {
        CharTypography = styles.letterCurrent;
        // 'NextCharTypography'
    } else if (id >= charsTyped.length) {
        CharTypography = styles.letter;
    } else if (charsTyped[id] === letter) {
        CharTypography = styles.letterRight;
    } else {
        CharTypography = styles.letterWrong;
        // CharTypography = 'IncorrectTextTypography'
    }

    return (
        <span className={CharTypography}>
            {letter}
        </span>
    );
};

const Character = memo(Comp, (props, nextProps) => {
    /** Significant pref boost avoiding render
     * We only needs re-render a sliding window of 3 characters
     * from where user needs to type
     */
    if (nextProps.restart !== props.restart ||
        props.id == nextProps.charsTyped.length - 1 ||
        (props.id == nextProps.charsTyped.length) ||
        (props.id == nextProps.charsTyped.length + 1)) {
        // Return false to re-render
        return false;
    } else {
        // Return true to avoid re-render
        return true
    }
})
// const sampleText = `hello world
// 		hello world
// 		hello world
// 		hello world`;

const sampleText = getText()

export const Monkeytype = () => {
    return (
        <Layout bgColor='#323437'>
            <TypingText words={sampleText}/>
        </Layout>
    );
}