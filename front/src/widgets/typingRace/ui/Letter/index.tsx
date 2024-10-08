import React from "react";
import cn from "classnames";

import stylesLetter from "./stylesLetter.module.css";

import {ILetter, ILetterType} from "@/entities/typeRacing/slice";

type LetterProps = {
    letter: ILetter;
}

const Letter: React.FC<LetterProps> = ({
                                           letter,
                                       }) => {
    return (
        <span className={cn(stylesLetter.letter,{
            [stylesLetter.letter]: letter.type === ILetterType.Initial,
            [stylesLetter.letterCurrent]: letter.type === ILetterType.Current,
            [stylesLetter.letterExtra]: letter.type === ILetterType.Extra,
            [stylesLetter.letterWrong]: letter.type === ILetterType.Incorrect,
            [stylesLetter.letterRight]: letter.type === ILetterType.Correct,
        })}>{letter.text}</span>
    );
};

export const LetterMemo = React.memo(Letter);
