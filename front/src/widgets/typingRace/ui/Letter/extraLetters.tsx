import React from "react";
import cn from "classnames";

import stylesLetter from "./stylesLetter.module.css";

type ExtraLettersProps = {
    extraLetters?: string[];
};

export const ExtraLetters: React.FC<ExtraLettersProps> = ({
                                                       extraLetters,
                                                   }) => {
    return extraLetters?.map((letter, index) => (
        <span key={`${letter}-${index}`} className={cn(stylesLetter.letterExtra, {
            [stylesLetter.letterCurrentLast]: index === extraLetters?.length - 1,
        })}>{letter}</span>
    ));
};
