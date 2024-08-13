import {useQuery} from "@tanstack/react-query";
import {wordsKey} from "@/entities/race/const";
import {fetchWords} from "@/api";

export const useGetWords = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: [wordsKey],
        queryFn: fetchWords,
    });

    return {
        data,
        isLoading,
        isError,
    }
}