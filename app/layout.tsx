import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import ConsoleLogger from "@/components/ConsoleLogger";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { Toaster } from "sonner";

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
