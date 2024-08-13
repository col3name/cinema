import React, {useCallback, useEffect, useRef} from "react";

import {Container} from "@/shared/ui/Container";
import {WordListContainer} from "@/widgets/typingRace/ui/WordListContainer";
import {TimerView} from "@/widgets/typingRace/ui/TimerView";
import {HiddenInput} from "@/widgets/typingRace/ui/HiddenInput";

import {useFocusHiddenInput} from "@/widgets/typingRace/hooks/useFocusHiddenInput";
import {useHandleTyping} from "@/widgets/typingRace/hooks/useHandleTyping";
import {RacingActions} from "@/widgets/typingRace/TypeRacing/ui/RacingActions";


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

    return (
        <Container
            onClick={onFocusHiddenInput}
        >
            <TimerView/>
            <WordListContainer
                wordsRef={wordsRef}
                currentWordRef={currentWordRef}
                currentLetterRef={currentLetterRef}
            />
            <RacingActions resetTimer={resetTimer} onReset={onReset}/>
            <HiddenInput
                // @ts-ignore
                ref={hiddenInputRef}
                top={topRef.current}
            />
        </Container>
    );
};
