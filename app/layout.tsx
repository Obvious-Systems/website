import type { Metadata } from "next";
import localFont from "next/font/local";
import { baseUrl } from './sitemap'
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Obvious',
    template: '%s | Obvious',
  },
  description: 'Obvious',
  applicationName: 'Obvious',
  keywords:
    ['mentor matching'],
  openGraph: {
    title: "Obvious",
    description: 'Obvious',
    url: baseUrl,
    siteName: 'Obvious',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og_card.jpeg',
        width: 1200,
        height: 630,
      },
    ],
  },
  alternates: {
    canonical: 'https://www.obvious.earth',
    languages: {
      'en-US': '/en-US',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: '/og_card.jpeg',
        width: 1200,
        height: 630,
      },
    ],
    title: "Obvious",
    description: 'Obvious',
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-[#0E1111]',
        geistSans.variable,
        geistMono.variable
      )}
    >
      <body className="h-screen">
        {children}
      </body>
    </html>
  );
}

