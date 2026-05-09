import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import ConsoleLogger from "@/components/ConsoleLogger";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "Westra — Luxury Women's Fashion",
  description:
    "Westra is a premium women's fashion brand specialising in sarees, kurtis, ethnic wear, and party collections. Shop via Facebook Live and Instagram.",
  keywords: "Westra, women's fashion, sarees, kurtis, ethnic wear, luxury boutique, Facebook Live shopping",
  openGraph: {
    title: "Westra — Luxury Women's Fashion",
    description: "Premium women's fashion. Live sales on Facebook & Instagram.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased">
        <CartProvider>
          <LenisProvider>
            <ConsoleLogger />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
