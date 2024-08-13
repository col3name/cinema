import {useCallback, useEffect, useRef, useState} from "react";

type UseTimerProps = {
    onUpdate?: (elapsed: number) => void;
};

export const useTimer = ({
    onUpdate = undefined,
                         }: UseTimerProps) => {
    const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

    const [enabled, setEnabled] = useState(false);

    const [startedAt, setStartedAt] = useState<number | undefined>(undefined);
    const timerRef = useRef<number>();
    const lastValueRef = useRef<number>(0);

    useEffect(() => {
        if (!enabled) {
            return;
        }
        setEnabled(true);
        const start = Date.now();
        setStartedAt(start);
        const handler = () => {
            const now = Date.now();
            const delta = now - start;
            if (now - lastValueRef.current < 1000) {
                return;
            }
            const newValue = Math.ceil(delta / 1000);
            lastValueRef.current = now;
            setElapsedSeconds(newValue);
            onUpdate?.(newValue);
        };

        // @ts-ignore
        timerRef.current = setInterval(handler, 100);

        return () => {
            clearInterval(timerRef.current);
        }
    }, [enabled, onUpdate]);

    const start = useCallback(() => {
        setEnabled(true);
    }, []);

    const stop = useCallback(() => {
        setStartedAt(0);
        setEnabled(false);
        lastValueRef.current = 0;
        clearInterval(timerRef.current);
    }, []);

    const reset = useCallback(() => {
        stop();
        setElapsedSeconds(0);
    }, [stop]);

    return {
        elapsed: elapsedSeconds,
        startedAt,
        startTimer: start,
        stopTimer: stop,
        resetTimer: reset,
    };
};