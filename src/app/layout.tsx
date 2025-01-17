import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"


const NB = localFont({
  src: [
    {
      path: '../../public/fonts/NB International Regular Webfont.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-NB'
})


const hel = localFont({
  src: '../../public/fonts/helvetica-neue-regular.ttf',
  variable: '--font-hel'
})

export const metadata: Metadata = {
  title: "Side/Effect Waitlist",
  description: "AI Stream Clipper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${NB.variable} ${hel.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
