import {shuffleArray} from "@/shared/lib/array";
import {randomInt} from "@/shared/lib/math";

export type WordData = {
    words: string[];
    length: number;
};

const getRandomText = (dictionary: string[], countWords: number): string => {

    return shuffleArray(dictionary).slice(0, countWords).join(' ');
};

export const getWords = (countWords: number|undefined = 0): WordData => {
    const textLong = 'find show when down than problem head house they form set after with there group feel thing become last should give move late it around keep this through some one will show come write long possible very public line good time the go there all write on over turn follow could may very one first seem only last run mean seem where look will more between over of move by they house much new go again be that while use most down use have be present between since own show these for then some late could tell open make stand';
    const dictionary = textLong.split(' ');

    let count: number = randomInt(10, 30);
    if (!countWords) {
        if (countWords > 10) {
            count = countWords;
        }
    }

    let randomText =  getRandomText(dictionary, count);
    const texts = [
        randomText,
    ]
    const index = randomInt(0, texts.length - 1);
    const words = texts[index]?.toLowerCase().split('').filter(letter => (letter >= 'a' && letter <= 'z') || letter === ' ').join('').split(' ');
    return {words, length: randomText.length};
}
