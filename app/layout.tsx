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

const BASE_URL = "https://westra.in";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Westra Wear — Premium Women's Fashion",
    template: "%s | Westra Wear",
  },
  description:
    "Westra Wear is a premium women's fashion brand based in Kolkata. Shop co-ord sets, kaftans, salwar suits, frocks, tops, shirts and two-piece sets online, or catch our Facebook Live styling sessions every week.",
  keywords: [
    "Westra Wear", "women's fashion India", "co-ord set online",
    "kaftan India", "salwar suit", "women's ethnic wear", "frocks online",
    "designer tops women", "two piece set women", "online fashion shop India",
    "Facebook Live shopping", "women's kurta", "Kolkata fashion brand",
    "affordable women's wear", "westra wear shop",
  ],
  authors: [{ name: "Westra Wear", url: BASE_URL }],
  creator: "Westra Wear",
  publisher: "Westra Wear",
  category: "Fashion & Apparel",
  classification: "Women's Clothing",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Westra Wear",
    title: "Westra Wear — Premium Women's Fashion",
    description:
      "Shop handpicked women's fashion online or live on Facebook & Instagram. Co-ord sets, kaftans, ethnic wear & more — delivered across India.",
    images: [
      {
        url: `${BASE_URL}/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Westra Wear — Premium Women's Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@westra_wear",
    creator: "@westra_wear",
    title: "Westra Wear — Premium Women's Fashion",
    description: "Handpicked women's fashion — live sales every week on Facebook & Instagram.",
    images: [`${BASE_URL}/og-default.jpg`],
  },
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
    "geo.position": "22.5726;88.3639",
    "ICBM": "22.5726, 88.3639",
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
