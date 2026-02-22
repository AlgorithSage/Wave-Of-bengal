import { Space_Grotesk, Zilla_Slab } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from '@/contexts/CartContext';
import CartSlideOut from '@/components/cart/CartSlideOut';
import Background from '@/components/home/background';

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const zillaSlab = Zilla_Slab({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-heading",
});

export const metadata = {
  title: "Wave of Bengal | Premium Seafood",
  description: "Fresh from ocean to your doorstep. Premium, sustainably sourced seafood.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${zillaSlab.variable} font-body bg-sky-light text-ocean-deep antialiased flex flex-col min-h-screen selection:bg-oceanic-blue/20`}
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
