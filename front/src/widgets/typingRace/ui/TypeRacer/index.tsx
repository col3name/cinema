import React, {useCallback} from "react";
import {QueryClient, useQueryClient} from "@tanstack/react-query";

import {FinalResultContainer} from "@/widgets/typingRace/ui/FinalResult";
import {InputRacing} from "../InputRacing";

import {restartRacing, saveHistory, setElapsedSeconds} from "@/entities/typeRacing/slice";
import {useAppDispatch} from "@/shared/redux/hooks";
import {useRaceStep} from "@/entities/typeRacing/selector";
import {RaceStep} from "@/entities/typeRacing/model";
import {wordsKey} from "@/entities/typeRacing/const";
import {useTimer} from "@/shared/hooks";

type TypeRacingProps = {
};

export const TypeRacer: React.FC<TypeRacingProps> = () => {
    const dispatch = useAppDispatch();
    const raceStep: RaceStep = useRaceStep()

    const queryClient: QueryClient = useQueryClient();

    const backupHistory = useCallback((elapsed: number) => {
        dispatch(saveHistory());
        dispatch(setElapsedSeconds(elapsed));
    }, [dispatch]);

    const { startTimer, stopTimer, resetTimer,} = useTimer({onUpdate: backupHistory});

    const onReset = useCallback(async () => {
        dispatch(restartRacing());
        resetTimer();
        await queryClient.invalidateQueries({queryKey: [wordsKey]});
    }, [dispatch, queryClient, resetTimer]);

    if (raceStep === RaceStep.Final) {
        return (
            <FinalResultContainer onReset={onReset}/>
        );
    }

    return (
        <InputRacing startTimer={startTimer} stopTimer={stopTimer} resetTimer={resetTimer} />
    );
}
