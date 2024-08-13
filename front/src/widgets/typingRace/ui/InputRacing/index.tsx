import React, {useCallback, useEffect, useRef} from "react";

import {Container} from "@/shared/ui/Container";
import {UpdateTextButtonMemo} from "@/features/race/update-text-button";
import {HiddenInput} from "@/widgets/typingRace/ui/HiddenInput";
import {WordList} from "@/widgets/typingRace/ui/WordList";

import {useAppDispatch} from "@/shared/redux/hooks";
import {useFocusHiddenInput} from "@/widgets/typingRace/hooks/useFocusHiddenInput";
import {useCurrentWordIndex, useElapsedSeconds} from "@/entities/typeRacing/selector";
import {setElapsedSeconds} from "@/entities/typeRacing/slice";
import {useKeyboardPress} from "@/widgets/typingRace/hooks/useKeyboardPress";
import {ElapsedSecond} from "@/widgets/typingRace/ui/TimerView";

type InputRacingProps = {
    stopTimer: VoidFunction;
    startTimer: VoidFunction;
    resetTimer: VoidFunction;
};

export const InputRacing: React.FC<InputRacingProps> = ({
                                                            stopTimer,
                                                            startTimer,
                                                            resetTimer,
                                                        }) => {
    const dispatch = useAppDispatch();

    const {hiddenInputRef, onFocusHiddenInput} = useFocusHiddenInput();

    const wordsRef = useRef<HTMLDivElement | null>(null);
    const currentWordRef = useRef<HTMLDivElement | null>(null);
    const topRef = useRef(0);

    const currentWordIndex = useCurrentWordIndex();

    useEffect(() => {
        const boundingClientRect = currentWordRef.current?.getBoundingClientRect();
        if (!boundingClientRect) {
            return;
        }
        if (boundingClientRect.top !== topRef.current) {
            topRef.current = boundingClientRect.top - 85;
        }
    }, [currentWordIndex, currentWordRef]);

    useEffect(() => {
        wordsRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
        currentWordRef.current?.scrollIntoView({block: 'center', behavior: 'smooth'});
        hiddenInputRef.current?.focus();
    }, [currentWordIndex, wordsRef.current, currentWordRef.current, hiddenInputRef]);

    useKeyboardPress({
        startTimer,
        stopTimer,
    });

    const onUpdateText = useCallback(() => {
        stopTimer();
        resetTimer();
        dispatch(setElapsedSeconds(0));
    }, [dispatch, resetTimer, stopTimer]);

    return (
        <Container
            onClick={onFocusHiddenInput}
        >
            <WordList
                // @ts-ignore
                ref={wordsRef}
                wordRef={currentWordRef}
            />
            <UpdateTextButtonMemo onClick={onUpdateText} />
            <HiddenInput
                // @ts-ignore
                ref={hiddenInputRef}
                top={topRef.current}
            />
            <ElapsedSecond/>
        </Container>
    );
};
