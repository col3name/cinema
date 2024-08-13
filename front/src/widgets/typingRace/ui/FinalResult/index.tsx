import {HistoryResult, TypingAccuracy} from "@/entities/race/model";
import React, {lazy, Suspense} from "react";

import {Container} from "@/shared/ui/Container";
import {TypingStatistic} from "@/widgets/ResultChart/ui/TypingStatistic";
const ResultChart = lazy(() => import("@/widgets/ResultChart"))

import {useElapsedSeconds, useHistoryResult, useRaceTypingAccuracy, useWordsCount} from "@/entities/race/selector";
import Button from "@/shared/ui/Button";

type FinalResultProps = {
    allChars: number;
    onReset: () => void;
};

export const FinalResultContainer: React.FC<FinalResultProps> = (props: FinalResultProps) => {
    const historyResult: HistoryResult = useHistoryResult();
    const accuracy: TypingAccuracy = useRaceTypingAccuracy();
    const allWords = useWordsCount();
    const elapsedSeconds = useElapsedSeconds();

    return (
        <Container>
            <Button onClick={props.onReset}>reset</Button>
            <TypingStatistic elapsed={elapsedSeconds} allWords={allWords} accuracy={accuracy}/>
            <Suspense fallback={<div style={{height: 400, width: 400}}></div>}>
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
