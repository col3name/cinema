import type {NextApiRequest, NextApiResponse} from "next";

import {getWords, WordData} from "@/services/words";

const parseNumberField = (req: Partial<{ [p: string]: string | string[] }>, name: string): number|undefined => {
    try {
        // @ts-ignore
        let number = parseInt(req.query?.[name]);
        if (Number.isNaN(number)){
            return undefined;
        }
        return number;
    } catch (_) {
        return undefined;
    }
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<WordData>,
) {
    const countWord: number|undefined = parseNumberField(req.query, 'count');

    const result: WordData = getWords(countWord);
    res.status(200).json(result);
}
