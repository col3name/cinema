import React, {useCallback, useRef} from "react";

import styles from "@/widgets/typingRace/client.module.css";

import {deleteLastTypedLetter, onResetRaceState, pressSpaceBar, setRaceStep, typeLetter} from "@/entities/race/slice";
import {RaceStep} from "@/entities/race/model";
import {useCurrentLetterIndex, useCurrentWordIndex, useRaceStep, useWords} from "@/entities/race/selector";
import {useKeyPress} from "@/shared/hooks";
import {useAppDispatch} from "@/shared/redux/hooks";

const clearClass = (currentWordRef: React.MutableRefObject<HTMLDivElement | null>) => {
    const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
    childrenElements[childrenElements.length - 1];
    childrenElements.forEach(child => {
        child.classList.remove(styles.letterCurrent);
    });
}

type UseHandleTypingProps = {
    resetTimer: VoidFunction;
    stopTimer: VoidFunction;
    startTimer: VoidFunction;
}
export const useHandleTyping = ({
                                    resetTimer,
                                    stopTimer,
                                    startTimer,
                                }: UseHandleTypingProps) => {
    const dispatch = useAppDispatch();

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const currentLetterRef = useRef<HTMLSpanElement | null>(null);

    const currentLetterIndex = useCurrentLetterIndex()
    const currentWordIndex = useCurrentWordIndex();
    const words = useWords();

    const onPressBackspace = useCallback((): void => {
        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[currentLetterIndex]?.classList?.remove(styles.letterCurrent);
        childrenElements[currentLetterIndex - 1]?.classList?.add(styles.letterCurrent);

        const item: Element = childrenElements[currentLetterIndex - 1]
        item?.classList.remove(styles.letterRight);
        item?.classList.remove(styles.letterWrong);

        dispatch(deleteLastTypedLetter());
    }, [currentLetterIndex, dispatch]);

    const onPressSpaceBar = useCallback(() => {
        dispatch(pressSpaceBar());

        if (currentWordIndex + 1 >= words.length) {
            stopTimer();
        }

        const wordElementList: Element[] = Array.from(wordsRef.current?.children || []);
        const currentWordElement: Element = wordElementList[currentWordIndex];
        const fromElement: Element = Array.from(currentWordElement?.children || [])?.[0];
        fromElement?.scrollIntoView({block: 'center', behavior: 'smooth'});
        fromElement?.classList?.add(styles.letterCurrent);
        clearClass(currentWordRef);
    }, [dispatch, currentWordIndex, words.length, stopTimer]);

    const onTypeLetter = useCallback((key: string): void => {
        dispatch(typeLetter(key));
        const currentLetter = words[currentWordIndex]?.[currentLetterIndex];
        const isSame = currentLetter === key;

        const childrenElements: Element[] = Array.from(currentWordRef.current?.children || []);
        childrenElements[currentLetterIndex]?.classList.remove(styles.letterCurrent);
        childrenElements[currentLetterIndex]?.classList.add(isSame ? styles.letterRight : styles.letterWrong);
        childrenElements[currentLetterIndex + 1]?.classList.add(styles.letterCurrent);
        currentLetterRef.current = childrenElements[currentLetterIndex] as HTMLSpanElement;
    }, [currentWordIndex, currentLetterIndex, dispatch, words])

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

    const onReset = useCallback(() => {
        dispatch(onResetRaceState());

        const wordElementList: Element[] = Array.from(wordsRef.current?.children || []);
        wordElementList.forEach((element: Element) => {
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
    }, [dispatch, resetTimer]);


    useKeyPress(handleKeyPress);

    return {
        currentLetterRef,
        wordsRef,
        currentWordRef,
        currentWordIndex,
        onReset,
    }
}