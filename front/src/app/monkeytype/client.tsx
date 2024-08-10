'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';
import cn from "classnames";

import styles from './client.module.css';
import Layout from "@/shared/ui/Layout";
import {getRandomInt} from "@/shared/lib/math";

export const getText = (): string[] => {
    const text = `A type of folder you can create on your Mac that automatically collects files based on criteria you specify. For example, you can create a Smart Folder that collects all the spreadsheet files on your Mac. The files remain in their original locations.`;
    const middleText = `A type of folder you can create on your Mac that automatically`;
    const shortText = `A type of folder you can.`;
    const texts = [
        'find show when down than problem head house they form set after with there group feel thing become last should give move late it around keep this through some one will show come write long possible very public line good time the go there all write on over turn follow could may very one first seem only last run mean seem where look will more between over of move by they house much new go again be that while use most down use have be present between since own show these for then some late could tell open make stand',
        text,
        shortText,
        middleText,
    ]
    const index = getRandomInt(0, texts.length - 1);
    const words = texts[index]?.toLowerCase().split('').filter(letter => (letter >= 'a' && letter <= 'z') || letter === ' ').join('').split(' ');
    return words;
}

const getInit = () => '';
const useTypeWord = () => {
    const [typedWord, setTypeWord] = useState<string>(getInit);

    const ref = useRef('');
    console.log('useTypeWord', typedWord);
    const setValue = useCallback((value: string): void => {
        console.log('setValue', value);
        // setTypeWord(value)
        ref.current = value;
    }, []);

    return {
        ref,
        setTypeWord: setValue,
    };
};

export const MonkeyTypeClient = () => {
    const words = getText();
    const activeWordRef = useRef<HTMLDivElement>(null);
    const caretRef = useRef<HTMLSpanElement>(null);
    const [currentWord, setCurrentWord] = useState<string>(words[0]);

    const {ref, setTypeWord} = useTypeWord();
    const typedWord = ref.current;
    // const [extraLetters, setExtraLetters] = useState<string[]>();
    const [typedHistory, setTypedHistory] = useState<string[]>([]);
    const extraLetters = typedWord.slice(currentWord.length).split("");
    const appendHistory = () => {
        console.log('append history');
        const nextIdx = typedHistory.length + 1;
        const newTypeWord = '';
        console.log(nextIdx);
        setTypeWord('');
        setCurrentWord(words[nextIdx]);
        setTypedHistory(prev => [...prev, typedWord])
    }

    const [timer, setTImer] = useState();
    const [timerId, setTimerId] = useState(null);

    const timeLimit = 120;
    const resetTest = async () => {
        document
            .querySelectorAll(".wrong, .right")
            .forEach((el) => el.classList.remove("wrong", "right"));
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null)
        }
        // import(`wordlists/${type}.json`).then((words) =>
        //     dispatch(setWordList(words.default))
        // );
        // dispatch(timerSet(timeLimit));
    };

    const recordTest = (key: string, ctrlKey: boolean) => {
        // const {
        //     time: { timer, timerId },
        //     word: { typedWord, currWord, activeWordRef, caretRef },
        //     preferences: { timeLimit },
        // } = getState();

        if (!timer) {
            if (key === "Tab") {
                // resetTest();
            }
            // return;
        }
        if (!timerId && key !== "Tab") {
            // startTimer();
        }
        const currWordEl = activeWordRef?.current!;
        currWordEl.scrollIntoView({behavior: "smooth", block: "center"});
        const caret = caretRef?.current!;
        caret.classList.remove(styles.caretBlink);
        setTimeout(() => caret.classList.add(styles.caretBlink), 500);
        console.log({key});
        switch (key) {
            case "Tab":
                // if (timer !== timeLimit || timerId) {
                //     resetTest();
                //     document.getElementsByClassName("word")[0].scrollIntoView();
                // }
                break;
            case " ":
                if (typedWord === "") {
                    return;
                }
                console.log({currWordEl, typedWord, currentWord});
                currWordEl.classList.add(
                    typedWord !== currentWord ? styles.letterWrong : styles.letterRight
                );
                appendHistory();
                // dispatch(appendTypedHistory());
                break;
            case "Backspace":
                // handleBackspace(ctrlKey);
                break;
            default:
                console.log('typed word change')
                setTypeWord(typedWord + key)
                // dispatch(setChar(typedWord + key));
                break;
        }
    };

    useEffect(() => {

        const listener = (event: KeyboardEvent) => {
            const key = event.key;
            event.preventDefault();
            event.stopPropagation();
            console.log({typedWord})

            recordTest(key, event.ctrlKey)
            // if (event.key === 'Space')
            // appendHistory()
        };
        document.addEventListener('keypress', listener);

        return () => {
            document.removeEventListener('keyup', listener);
        }
    }, [recordTest, typedWord]);

    // console.log({currentWord, typedHistory, typedWord, extraLetters, current: activeWordRef.current?.innerText},)
    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.words}>
                        {words.map((word: string, wordIndex: number) => {
                            const isActive = currentWord === word && typedHistory.length === wordIndex;
                            return (
                                <div
                                    key={wordIndex}
                                    ref={isActive ? activeWordRef : null}
                                    className={styles.word}
                                >
                                    {isActive && (
                                        <span
                                            ref={caretRef}
                                            id="caret"
                                            className={cn(styles.caret, styles.caretBlink)}
                                            style={{
                                                left: typedWord.length * 14.5833,
                                            }}
                                        >|</span>
                                    )}
                                    {word.split('').map((letter: string, letterIndex: number) => {
                                        return (
                                            <span
                                                key={`${wordIndex}-${letterIndex}`}
                                                className={styles.letter}
                                            >
                                                {letter}
                                            </span>
                                        );
                                    })}

                                    {isActive && (
                                        extraLetters?.map((char, charId) => {
                                            return (
                                                <span
                                                    key={char + charId}
                                                    className={cn([styles.letter, styles.letterWrong, "extra"])}>
                                              {char}
                                          </span>
                                            );
                                        })
                                    )}
                                    {!isActive && typedHistory[wordIndex]?.slice(words[wordIndex].length)
                                        .split("")
                                        .map((char, charId) => {
                                            return (
                                                <span
                                                    key={char + charId}
                                                    className="wrong extra"
                                                >
                                                            {char}
                                                        </span>
                                            );
                                        })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    );
}