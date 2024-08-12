'use client';

import React from "react";

import Layout from "@/shared/ui/Layout";
import {useGetWords} from "@/entities/race/hook";
import {TypingRace} from "@/widgets/typingRace";

export const NewMonkeytype = () => {
    const {data, isError} = useGetWords();

    return (
        <Layout>
            {isError && (<p>Error</p>)}
            {data && (
                <TypingRace length={data.length} words={data.words}/>
            )}
        </Layout>
    );
}