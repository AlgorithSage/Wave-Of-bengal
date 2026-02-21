import { Playfair_Display, Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from '@/contexts/CartContext';
import CartSlideOut from '@/components/cart/CartSlideOut';
import Background from '@/components/home/background';

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Wave of Bengal | Premium Seafood",
  description: "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} font-body bg-sky-light text-ocean-deep antialiased flex flex-col min-h-screen selection:bg-oceanic-blue/20`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <Background />
            <Navbar />
            <CartSlideOut />
            <main className="grow relative z-10">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
