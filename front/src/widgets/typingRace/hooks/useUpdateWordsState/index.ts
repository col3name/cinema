import {useEffect} from "react";

import {setWords} from "@/entities/race/slice";
import {useAppDispatch} from "@/shared/redux/hooks";

export const useUpdateWordsState =(words?: string[]) =>  {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (words) {
            dispatch(setWords(words));
        } else {
            dispatch(setWords([]));
        }
    }, [dispatch, words]);
};