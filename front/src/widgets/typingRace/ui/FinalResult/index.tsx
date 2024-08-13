import React, {lazy, Suspense} from "react";

import {Container} from "@/shared/ui/Container";
import Button from "@/shared/ui/Button";
import {TypingStatistic} from "@/widgets/ResultChart/ui/TypingStatistic";
const ResultChart = lazy(() => import("@/widgets/ResultChart"));

import {HistoryResult, TypingAccuracy} from "@/entities/typeRacing/model";
import {
    useElapsedSeconds,
    useHistoryResult,
    useRaceTypingAccuracy,
    useWordsCount
} from "@/entities/typeRacing/selector";

type FinalResultProps = {
    onReset: () => void;
};

export const FinalResultContainer: React.FC<FinalResultProps> = (props) => {
    const historyResult: HistoryResult = useHistoryResult();
    const accuracy: TypingAccuracy = useRaceTypingAccuracy();
    const allWords = useWordsCount();
    const elapsedSeconds = useElapsedSeconds();

    return (
        <Container isHalf>
            <Button onClick={props.onReset}>reset</Button>
            <TypingStatistic elapsed={elapsedSeconds} allWords={allWords} accuracy={accuracy}/>
            <Suspense>
                <ResultChart
                    seconds={elapsedSeconds}
                    raw={historyResult.rawHistory.filter(it => it !== Infinity)}
                    wpm={historyResult.wpmHistory.filter(it => it !== Infinity)}
                    errors={historyResult.errors.map(it => it.count)}
                />
            </Suspense>
        </Container>
    );
}
