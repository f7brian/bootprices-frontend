import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "sonner";
// import logo from "@/assets/home/kkk-logo.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Compare Work, Hiking & Western Boot Prices | BootPrices.com",
  description: "Compare prices on work, hiking, western, and fashion boots. BootPrices.com helps you find the best deals from top brands—all in one place.",
  icons: {
    // icon: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.bootprices.com/" />
        {/* 2. Open Graph Tags (Facebook) */}
  <meta property="og:title" content="Compare Work, Hiking & Western Boot Prices | BootPrices.com" />
  <meta property="og:description" content="Looking for boots? BootPrices.com makes it easy to compare prices on work boots, hiking boots, cowboy boots, and more—so you can save time and money." />
  <meta property="og:image" content="https://www.bootprices.com/preview-boot-ad.jpg" />
  <meta property="og:url" content="https://www.bootprices.com/" />
  <meta property="og:type" content="website" />

  {/* 3. Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="BootPrices.com – Instantly Compare Boot Prices on Amazon" />
  <meta name="twitter:description" content="Save time. Compare work, hiking, and cowboy boots from top brands—all in one place." />
  <meta name="twitter:image" content="https://www.bootprices.com/preview-boot-ad.jpg" />

        {/* 4. Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MXBVYBXDQY"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MXBVYBXDQY');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <NavBar /> */}
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />

        {/* <Footer /> */}
      </body>
    </html>
  );
}
