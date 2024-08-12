import {TypingAccuracy} from "@/entities/race/model";
import {roundTo2} from "@/shared/lib/math";

type WpmAndRaw = {
    wpm: number;
    raw: number;
};

export const calculateWpmAndRaw = (
    seconds: number,
    accuracy: TypingAccuracy,
    withDecimalPoints: boolean = false,
): WpmAndRaw => {
    const wpm = roundTo2(
        ((accuracy.correct) * (60 / seconds)) / 5
    );
    const raw = roundTo2(
        ((accuracy.correct +
                accuracy.incorrect +
                accuracy.missed) *
            (60 / seconds)) /
        5
    );
    return {
        wpm: withDecimalPoints ? wpm : Math.round(wpm),
        raw: withDecimalPoints ? raw : Math.round(raw),
    };
}
