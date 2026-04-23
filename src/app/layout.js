import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import ReduxProvider from "./ReduxProvider";
import { getPublicAssetUrl, getSiteUrl, toAbsoluteUrl } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Dhakad Matrimony",
    template: "%s | Dhakad Matrimony",
  },
  description:
    "Find meaningful matrimonial matches with a trusted Dhakad community platform built for secure browsing and better compatibility.",
  applicationName: "Dhakad Matrimony",
  keywords: [
    "Dhakad Matrimony",
    "Matrimonial platform",
    "Dhakad community",
    "Marriage profiles",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    siteName: "Dhakad Matrimony",
    title: "Dhakad Matrimony",
    description:
      "Find meaningful matrimonial matches with a trusted Dhakad community platform built for secure browsing and better compatibility.",
    images: [
      {
        url: toAbsoluteUrl(getPublicAssetUrl("/assets/images/dhakadlogo.png")),
        width: 512,
        height: 512,
        alt: "Dhakad Matrimony",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhakad Matrimony",
    description:
      "Find meaningful matrimonial matches with a trusted Dhakad community platform built for secure browsing and better compatibility.",
    images: [toAbsoluteUrl(getPublicAssetUrl("/assets/images/dhakadlogo.png"))],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: getPublicAssetUrl("/assets/images/dhakadlogo.png"), type: "image/png" },
    ],
    apple: [
      { url: getPublicAssetUrl("/assets/images/dhakadlogo.png") },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"></link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"></link>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload" // or "afterInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
