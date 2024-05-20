import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Solar Spotter",
    description: "TODO",
};

const RootLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html className={"h-full"} lang="en">
          <body className={`h-full ${inter.className}`}>{children}</body>
        </html>
    );
}

export default RootLayout;

