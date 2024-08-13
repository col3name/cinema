'use client'

import React, {PropsWithChildren} from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const QueryProviders: React.FC<PropsWithChildren> = ({ children }) => {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
export default QueryProviders;
