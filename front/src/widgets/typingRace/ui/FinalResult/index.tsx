import {Accuracy, HistoryResult} from "@/entities/race/model";
import React, {lazy, Suspense} from "react";

import {Container} from "@/shared/ui/Container";
const ResultChart = lazy(() => import("@/app/monkeytype/ResultChart"))
import Button from "@/shared/ui/Button";

import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";



type TypeingStatisticProps = {
    elapsed: number;
    allChars: number;
    allWords: number;
    accuracy: Accuracy;
    onReset: () => void;
};

const TypingStatistic: React.FC<TypeingStatisticProps> = ({
                                                               accuracy,
                                                               elapsed,
                                                               allChars,
                                                               onReset,
                                                           }) => {
    const {wpm, raw} = calculateWpmAndRaw(elapsed, accuracy);

    return (
        <div>
            <p>{`elapsed: ${elapsed} seconds`}</p>
            <p>{`raw cpm: ${Math.floor((accuracy.correct + accuracy.incorrect + accuracy.missed) / elapsed * 60)}`}</p>
            <p>{`cpm: ${Math.floor((accuracy.correct) / elapsed * 60)}`}</p>
            <p>{`accuracy: ${accuracy.correct}/${allChars}`}</p>
            <p>{`accuracy: ${Math.floor((accuracy.correct / (accuracy.correct + accuracy.incorrect + accuracy.missed)) * 100)}%`}</p>
            <p>{`wpm: ${wpm}`}</p>
            <p>{`raw: ${raw}`}</p>
            <p>{`incorrect letters: ${accuracy.incorrect}`}</p>

            <Button onClick={onReset}>reset</Button>
        </div>
    );
};

type FinalResultProps = TypeingStatisticProps & {
    history: HistoryResult;
};

export const FinalResult: React.FC<FinalResultProps> = (props) => {
    return (
        <Container>
            <Suspense>
                <ResultChart
                    seconds={props.elapsed}
                    raw={props.history.rawHistory.filter(it => it !== Infinity)}
                    wpm={props.history.wpmHistory.filter(it => it !== Infinity)}
                    errors={props.history.errors.map(it => it.count)}
                />
            </Suspense>
            <TypingStatistic {...props} />
        </Container>
    );
}
