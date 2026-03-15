
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "./providers";
import { Inter, Lora } from "next/font/google";
import { getSettings } from "@/lib/notion";
import { GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  return (
    <html lang="en" className="bg-white dark:bg-black" suppressHydrationWarning>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      <body className="bg-white dark:bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar {...settings} />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

