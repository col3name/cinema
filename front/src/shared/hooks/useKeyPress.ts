import {useEffect, useState} from "react";

export const useKeyPress = (callback: any) => {
    const [keyPressed, setKeyPressed] = useState<string | null>(null);

    useEffect(() => {
        const downHandler = (e: any) => {
            const {key} = e;

            if ((key.length === 1 || key === "Backspace")) {
                setKeyPressed(key);
                callback && callback(key);
            }

            if (e.keyCode == 32 && e.target == document.body) {
                e.preventDefault();
            }
        };
        const upHandler = () => {
            setKeyPressed(null);
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [callback]);

    return keyPressed;
};
