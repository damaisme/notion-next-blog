import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";
import { ThemeProvider } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora } from "next/font/google";
import {getSettings} from "@/lib/notion"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora"
});

export default async function RootLayout({
  children 
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  return (
    <>
      <html lang="en" className="bg-white dark:bg-black" suppressHydrationWarning>
        <head />
        <body className="bg-white dark:bg-black">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
          <Navbar {...settings}/>
            {children}
          <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
