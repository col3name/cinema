import {TypingAccuracy} from "@/entities/race/model";
import React from "react";
import {calculateWpmAndRaw} from "@/widgets/typingRace/ui/FinalResult/lib";
import Button from "@/shared/ui/Button";

type TypeingStatisticProps = {
    elapsed: number;
    allChars: number;
    allWords: number;
    accuracy: TypingAccuracy;
    onReset: () => void;
};

export const TypingStatistic: React.FC<TypeingStatisticProps> = ({
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