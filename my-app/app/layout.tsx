import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NextSeo } from "next-seo";
import { AuthProvider } from "./context/AuthContext";

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
  title: "Career Connect",
  description: "A platform for job seekers and employers to connect."
};

const SEO = {
  title: "Career Connect",
  description: "A platform for job seekers and employers to connect.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.careerconnect.com/',
    site_name: 'Career Connect',
  },
  twitter: {
    handle: '@careerconnect',
    site: '@careerconnect',
    cardType: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* You can include any additional metadata or links here */}
        <NextSeo {...SEO} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
