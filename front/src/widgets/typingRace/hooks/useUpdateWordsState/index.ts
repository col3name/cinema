import {useEffect} from "react";
import {useDispatch} from "react-redux";

import {setWords} from "@/entities/race/slice";

export const useUpdateWordsState =(words?: string[]) =>  {
    const dispatch = useDispatch();

    useEffect(() => {
        if (words) {
            dispatch(setWords(words));
        } else {
            dispatch(setWords([]));
        }
    }, [dispatch, words]);
};