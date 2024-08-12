import React from "react";
import {QueryClient} from "@tanstack/react-query";

import {DehydrateState} from "@/shared/ui/DehydrateState";
import {NewMonkeytype} from "@/app/monkeytype/NewMonkeytype";

import getQueryClient from "@/app/getQueryClient";

async function MonkeyType() {
    const queryClient: QueryClient = getQueryClient();

    const promises: Promise<any>[] = [];

    // const promise1 = queryClient.prefetchQuery({
    //     queryKey: [wordsKey],
    //     queryFn: fetchWords,
    // });
    // promises.push(promise1);

    await Promise.all(promises);

    return (
        <DehydrateState queryClient={queryClient}>
            <NewMonkeytype />
        </DehydrateState>
    );
}

export default MonkeyType;
