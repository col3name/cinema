import React from "react";
import "./globals.css";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});
import {Providers} from "@/shared/redux/provider";
import QueryProviders from "@/shared/query/queryProviders";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <title>Title</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
        </head>
        <body className={inter.className}>
        <QueryProviders>
            <Providers>{children}</Providers>
        </QueryProviders>
        </body>
        </html>
    );
}
