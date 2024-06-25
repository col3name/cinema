import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { Providers } from "@/shared/redux/provider";

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
    </head>
    <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
