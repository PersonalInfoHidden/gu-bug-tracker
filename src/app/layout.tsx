import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Login from "./login";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gu Bug Tracker",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                >
                    <Login />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
