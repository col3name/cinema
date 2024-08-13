'use client';

import React from "react";

import Layout from "@/shared/ui/Layout";
import {useGetWords} from "@/entities/race/hook";
import {useUpdateWordsState} from "@/widgets/typingRace/hooks/useUpdateWordsState";
import {RacingSteps} from "@/widgets/typingRace/RacingSteps";

export const MonkeyTypeRacing = () => {
    const {data, isError} = useGetWords();

    useUpdateWordsState(data?.words);

    return (
        <Layout>
            {isError && (<p>Error</p>)}
            {data && (
                <RacingSteps length={data.length} words={data.words}/>
            )}
        </Layout>
    );
}