'use client';

import React from "react";

import Layout from "@/shared/ui/Layout";
import {TypeRacer} from "@/widgets/typingRace/ui/TypeRacer";

import {useGetWords} from "@/entities/typeRacing/hook";
import {useUpdateWordsState} from "@/widgets/typingRace/hooks/useUpdateWordsState";

export const MonkeyTypeRacing = () => {
    const {data, isLoading, isFetching, isError} = useGetWords();

    useUpdateWordsState(data?.words, data?.length);

    return (
        <Layout>
            {isError && (<p>Error</p>)}
            {isFetching && <div>Update Text</div>}
            {isLoading && <div>Loading</div>}
            {!isLoading && !isFetching && data && (
                <TypeRacer />
            )}
        </Layout>
    );
}