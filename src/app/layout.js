import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider"
import ThemeSwitch from "@/app/ThemeSwitch";
import { Analytics } from "@vercel/analytics/next";

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
