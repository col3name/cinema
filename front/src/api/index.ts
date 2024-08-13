type FetchWordsResponse = {
    words: string[];
    length: number;
};

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://ticket-search-beryl.vercel.app' : 'http://localhost:8080';

export const fetchWords = async (): Promise<FetchWordsResponse | undefined> => {
    try {
        console.log({baseUrl});
        const response = await fetch(baseUrl + '/api/text')
        return await response.json();
    } catch (_) {
        return undefined;
    }
    //
    // const result: WordData = getWords();
    //
    // return Promise.resolve({
    //     words: result.words,
    //     length: result.length,
    // });
}
