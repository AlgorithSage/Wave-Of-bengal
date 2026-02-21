import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-heading",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-body",
});

export const metadata = {
    title: "Wave of Bengal | Entrance",
    description: "Fresh from ocean to your doorstep.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${playfair.variable} ${inter.variable} font-body bg-black text-white antialiased`}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    );
}
