import React from "react";
import {Letter} from "@/widgets/typingRace/ui/Letter/Letter";
import {useExtraLetters} from "@/entities/race/selector";

type ExtraLettersListProps = {
    letters: string[];
};

const ExtraLetterList: React.FC<ExtraLettersListProps> = ({
                                                              letters,
                                                          }) => {
    return letters.map((letter: string, letterIdx: number) => {
        return (
            <Letter
                key={`${letter}-${letterIdx}`}
                isExtra
            >
                {letter}
            </Letter>
        );
    });
};


export const ExtraLettersContainer = () => {
    const extraLetters = useExtraLetters();
    return <ExtraLetterList letters={extraLetters} />;
}