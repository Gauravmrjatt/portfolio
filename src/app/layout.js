import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/theme-provider"
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";

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
  metadataBase: new URL("https://gauravmrjatt.vercel.app"),
  title: {
    default: "Gaurav Chaudhary | Backend Engineer",
    template: "%s | Gaurav Chaudhary",
  },
  description:
    "Backend engineer working in Go and Node.js. Production systems: affiliate tracking at 527K leads, a multi-carrier logistics platform, and a webhook delivery engine.",
  keywords: [
    "Gaurav Chaudhary",
    "Gauravmrjatt",
    "Backend Engineer",
    "MERN Stack",
    "Next.js Developer",
    "Web Developer India",
    "Portfolio",
  ],
  authors: [{ name: "Gaurav Chaudhary" }],
  creator: "Gaurav Chaudhary",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://gauravmrjatt.vercel.app",
    siteName: "Gaurav Chaudhary",
    title: "Gaurav Chaudhary | Backend Engineer",
    description:
      "Backend engineer working in Go and Node.js. 527K leads, INR 2.8 Cr in payments, 1,700+ orders.",
    images: [
      {
        url: "/gaurav-chaudhary.png",
        width: 800,
        height: 800,
        alt: "Gaurav Chaudhary",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Chaudhary | Backend Engineer",
    description:
      "Backend engineer working in Go and Node.js. 527K leads, INR 2.8 Cr in payments, 1,700+ orders.",
    images: ["/gaurav-chaudhary.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Gaurav Chaudhary" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
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
          <JsonLd />
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
