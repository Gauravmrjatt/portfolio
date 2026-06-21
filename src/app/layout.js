import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider"
import ThemeSwitch from "@/app/ThemeSwitch";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const dancing = Dancing_Script({ variable: "--font-dacning-script", subsets: ['latin'] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Gaurav Chaudhary",
  description: "Portfilio of Guarav Chaudhary",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Gaurav Chaudhary" />
        <meta name="keywords" content="Gaurav Chaudhary, Gauravmrjatt, gauravmrjatt gauravmrjatt4 Portfolio "/>
        
        <Script
          src="//unpkg.com/react-scan/dist/auto.global.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${geistSans.variable}  ${geistMono.variable} ${dancing.variable}  antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
      
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
