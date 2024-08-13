import {useQuery} from "@tanstack/react-query";
import {wordsKey} from "@/entities/typeRacing/const";
import {fetchWords} from "@/api";

export const useGetWords = () => {
    const {data,  isRefetching, isLoading, isError}= useQuery({
        queryKey: [wordsKey],
        queryFn: fetchWords,
    });

    return {
        data,
        isLoading,
        isFetching:  isRefetching,
        isError,
    }
}