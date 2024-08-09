import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {DehydratedState} from "@tanstack/query-core";

type DehydrateStateProps = {
    children: React.ReactNode;
    queryClient: QueryClient;
}

const renderState = (dehydratedState: DehydratedState): void => {
    console.log(dehydratedState.queries.map(query => ({
        data: query.state.data,
        key: query.queryKey,
    })));
}
export const DehydrateState: React.FC<DehydrateStateProps> = ({children, queryClient}) => {
    const dehydratedState: DehydratedState = dehydrate(queryClient);

    // renderState(dehydratedState)
    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    );
};
