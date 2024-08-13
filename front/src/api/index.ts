type FetchWordsResponse = {
    words: string[];
    length: number;
};

const vercelurl = process.env.VERCEL_URL;
const baseUrl = (!vercelurl || vercelurl?.length ===0) ? 'http://localhost:8080' : vercelurl;

export const fetchWords = async (): Promise<FetchWordsResponse| undefined> => {
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
