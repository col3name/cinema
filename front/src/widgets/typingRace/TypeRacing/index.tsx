import React, {useCallback, useEffect, useRef} from "react";

import {Container} from "@/shared/ui/Container";
import {WordListContainer} from "@/widgets/typingRace/ui/WordListContainer";
import {UpdateTextButton} from "@/features/face/update-text-button";
import Button from "@/shared/ui/Button";
import {TimerView} from "@/widgets/typingRace/ui/TimerView";
import {HiddenInput} from "@/widgets/typingRace/ui/HiddenInput";

import styles from "@/widgets/typingRace/client.module.css";

import {useFocusHiddenInput} from "@/widgets/typingRace/hooks/useFocusHiddenInput";
import {useHandleTyping} from "@/widgets/typingRace/hooks/useHandleTyping";

type TypeRacingProps = {
    stopTimer: VoidFunction;
    startTimer: VoidFunction;
    resetTimer: VoidFunction;
};

export const TypeRacing: React.FC<TypeRacingProps> = ({
                                                   stopTimer,
                                                   startTimer,
                                                   resetTimer,
                                               }) => {
    const {
        currentWordRef,
        currentWordIndex,
        onReset,
        currentLetterRef,
        wordsRef,
    } = useHandleTyping({resetTimer, stopTimer, startTimer});

    const {hiddenInputRef, onFocusHiddenInput} = useFocusHiddenInput();

    const topRef = useRef(0);

    useEffect(() => {
        const boundingClientRect = currentWordRef.current?.getBoundingClientRect();
        if (!boundingClientRect) {
            return;
        }
        if (boundingClientRect.top !== topRef.current) {
            topRef.current = boundingClientRect.top;
        }
    }, [currentWordIndex, currentWordRef]);

    const onClick = useCallback(() => {
        onReset();
        resetTimer();
    }, [onReset, resetTimer]);

    return (
        <Container
            onClick={onFocusHiddenInput}
        >
            <WordListContainer
                wordsRef={wordsRef}
                currentWordRef={currentWordRef}
                currentLetterRef={currentLetterRef}
            />
            <div className={styles.actions}>
                <Button onClick={onReset}>restart</Button>
                <UpdateTextButton onClick={onClick}/>
            </div>
            <TimerView />
            <HiddenInput
                // @ts-ignore
                ref={hiddenInputRef}
                top={topRef.current}
            />
        </Container>
    );
};
