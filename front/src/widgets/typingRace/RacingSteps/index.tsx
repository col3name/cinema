import React, {useCallback} from "react";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

import {FinalResultContainer as FinalResult} from "@/widgets/typingRace/ui/FinalResult";
import {TypeRacing} from "@/widgets/typingRace/TypeRacing";

import {onResetRaceState, onSaveHistory, setElapsedSeconds,} from "@/entities/race/slice";
import {useRaceStep,} from "@/entities/race/selector";
import {RaceStep} from "@/entities/race/model";
import {wordsKey} from "@/entities/race/const";
import {useTimer} from "@/shared/hooks";
import {useAppDispatch} from "@/shared/redux/hooks";

export type RacingStepProps = {
    words: string[];
    length: number;
};

export const RacingSteps: React.FC<RacingStepProps> = ({
                                                           length,
                                                       }) => {
    const dispatch = useAppDispatch();

    const raceStep: RaceStep = useRaceStep();

    const queryClient: QueryClient = useQueryClient();

    const updateHistory = useCallback((elapsed: number) => {
        dispatch(onSaveHistory());
        dispatch(setElapsedSeconds(elapsed));
    }, [dispatch]);

    const { startTimer, stopTimer, resetTimer,} = useTimer({onUpdate: updateHistory});

    const onReset = useCallback(async () => {
        dispatch(onResetRaceState());
        resetTimer();
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
    }, [dispatch, queryClient, resetTimer]);

    if (raceStep === RaceStep.Final) {
        return (
            <FinalResult
                allChars={length}
                onReset={onReset}
            />
        );
    }

    return <TypeRacing stopTimer={stopTimer} startTimer={startTimer} resetTimer={resetTimer} />
};
