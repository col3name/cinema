import {getRandomInt} from "@/shared/lib/math";
import {useQuery} from "@tanstack/react-query";
import {wordsKey} from "@/entities/monkeytype/const";

export const getWords = (): string[] => {
    const text = `A type of folder you can create on your Mac that automatically collects files based on criteria you specify. For example, you can create a Smart Folder that collects all the spreadsheet files on your Mac. The files remain in their original locations.`;
    const middleText = `A type of folder you can create on your Mac that automatically`;
    const shortText = `A type of folder you can.`;
    const texts = [
        'find show when down than problem head house they form set after with there group feel thing become last should give move late it around keep this through some one will show come write long possible very public line good time the go there all write on over turn follow could may very one first seem only last run mean seem where look will more between over of move by they house much new go again be that while use most down use have be present between since own show these for then some late could tell open make stand',
        text,
        shortText,
        middleText,
    ]
    const index = getRandomInt(0, texts.length - 1);
    const words = texts[index]?.toLowerCase().split('').filter(letter => (letter >= 'a' && letter <= 'z') || letter === ' ').join('').split(' ');
    return words;
}

type FetchWordsResponse = {
    words: string[];
    length: number;
};

export const fetchWords = async (): Promise<FetchWordsResponse> => {
    const words: string[] = getWords();
    console.log('fetchWords', words);
    return Promise.resolve({
        words,
        length: words.join(' ').length
    });
}

export const useGetWords = ()=> {
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