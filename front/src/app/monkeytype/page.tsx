import React from "react";
import {QueryClient} from "@tanstack/react-query";
import getQueryClient from "@/app/getQueryClient";
import {DehydrateState} from "@/shared/ui/DehydrateState";
import {MonkeyTypeClient} from "@/app/monkeytype/client";
import {Monkeytype} from "@/app/monkeytype/Monkeytype";


async function MonkeyType() {
    const queryClient: QueryClient = getQueryClient()

    const promises: Promise<any>[] = [];

    // const promise1 = queryClient.prefetchQuery({queryKey: [cinemasKey], queryFn: fetchCinemas})
    // promises.push(promise1);

    await Promise.all(promises);

    return (
        <DehydrateState queryClient={queryClient}>
            <Monkeytype />
        </DehydrateState>
    );
}

export default MonkeyType;
