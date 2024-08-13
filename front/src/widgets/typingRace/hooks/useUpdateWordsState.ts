import {useEffect} from "react";

import {useAppDispatch} from "@/shared/redux/hooks";
import {setWords} from "@/entities/typeRacing/slice";

export const useUpdateWordsState =(words?: string[], length?: number) =>  {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (words && length) {
            dispatch(setWords({words, length}));
        } else {
            dispatch(setWords({words: [], length: 0}));
        }
    }, [dispatch, length, words]);
};