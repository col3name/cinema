import {TypingAccuracy, HistoryResult} from "@/entities/race/model";
import React, {lazy, Suspense} from "react";

import {Container} from "@/shared/ui/Container";
const ResultChart = lazy(() => import("@/app/monkeytype/ResultChart"))
import Button from "@/shared/ui/Button";

import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";
import {useHistoryResult, useRaceTypingAccuracy, useWordsCount} from "@/entities/race/selector";

type TypeingStatisticProps = {
    elapsed: number;
    allChars: number;
    allWords: number;
    accuracy: TypingAccuracy;
    onReset: () => void;
};

const TypingStatistic: React.FC<TypeingStatisticProps> = ({
                                                              accuracy,
                                                              elapsed,
                                                              allChars,
                                                              onReset,
                                                          }) => {
    const {wpm, raw} = calculateWpmAndRaw(elapsed, accuracy);

    const countTypedLetters = accuracy.correct + accuracy.incorrect + accuracy.missed + accuracy.extra;
    return (
        <div>
            <p>{`elapsed: ${elapsed} seconds`}</p>
            <p>{`raw cpm: ${Math.floor(countTypedLetters / elapsed * 60)}`}</p>
            <p>{`cpm: ${Math.floor((accuracy.correct) / elapsed * 60)}`}</p>
            <p>{`accuracy: ${accuracy.correct}/${countTypedLetters}`}</p>
            <p>{`accuracy: ${Math.floor((accuracy.correct / (countTypedLetters)) * 100)}%`}</p>
            <p>{`wpm: ${wpm}`}</p>
            <p>{`raw: ${raw}`}</p>
            <p>{`correct: ${accuracy.correct}`}</p>
            <p>{`incorrect: ${accuracy.incorrect}`}</p>
            <p>{`extra: ${accuracy.extra}`}</p>
            <p>{`missed: ${accuracy.missed}`}</p>

            <Button onClick={onReset}>reset</Button>
        </div>
    );
};

type FinalResultProps = {
    elapsed: number;
    allChars: number;
    onReset: () => void;
};


export const FinalResultContainer: React.FC<FinalResultProps> = (props) => {
    const historyResult: HistoryResult = useHistoryResult();
    const accuracy: TypingAccuracy = useRaceTypingAccuracy();
    const allWords = useWordsCount();
    return (
        <Container>
            <Suspense>
                <ResultChart
                    seconds={props.elapsed}
                    raw={historyResult.rawHistory.filter(it => it !== Infinity)}
                    wpm={historyResult.wpmHistory.filter(it => it !== Infinity)}
                    errors={historyResult.errors.map(it => it.count)}
                />
            </Suspense>
            <TypingStatistic {...props}  allWords={allWords} accuracy={accuracy}/>
        </Container>
    );
}
