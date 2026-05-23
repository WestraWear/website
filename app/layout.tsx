import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import ConsoleLogger from "@/components/ConsoleLogger";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Westra Wear — Women’s Fashion, Online & Live",
  description:
    "Westra Wear is a premium women’s fashion brand. Shop co-ord sets, kaftans, salwars, frocks, tops, shirts and two-piece sets online, or catch our Facebook Live styling sessions.",
  keywords: "Westra Wear, women's fashion, co-ord set, kaftan, salwar, frocks, tops, shirts, two piece, online shop, Facebook Live shopping",
  openGraph: {
    title: "Westra Wear — Women’s Fashion, Online & Live",
    description: "Shop premium women’s fashion online or live on Facebook & Instagram.",
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
        {/* Razorpay Checkout SDK */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <CartProvider>
          <LenisProvider>
            <ConsoleLogger />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <Toaster
              position="bottom-right"
              closeButton
              toastOptions={{
                style: {
                  background: "#FDFCFA",
                  border: "1px solid #E8E0D4",
                  color: "#28201A",
                  fontFamily: "'Inter', Arial, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.02em",
                  borderRadius: "2px",
                  boxShadow: "0 4px 24px 0 rgba(40,32,26,0.10)",
                },
                classNames: {
                  closeButton: "!bg-[#F0EAE0] !border-[#E8E0D4] !text-[#5A4A3C] hover:!bg-[#E8E0D4]",
                  error: "!border-l-4 !border-l-[#9B6335]",
                  success: "!border-l-4 !border-l-[#6E8C5A]",
                  warning: "!border-l-4 !border-l-[#C4956A]",
                },
              }}
            />
          </LenisProvider>
        </CartProvider>
      </body>
    </html>
  );
}
