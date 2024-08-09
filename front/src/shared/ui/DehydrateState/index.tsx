import React from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {DehydratedState} from "@tanstack/query-core";

type DehydrateStateProps = {
    children: React.ReactNode;
    queryClient: QueryClient;
}

export const DehydrateState: React.FC<DehydrateStateProps> = ({children, queryClient}) => {
    const dehydratedState: DehydratedState = dehydrate(queryClient);

    console.log(dehydratedState.queries.map(query => ({
        data: query.state.data,
        key: query.queryKey,
    })));
    return (
        <HydrationBoundary state={dehydratedState}>
            {children}
        </HydrationBoundary>
    );
};