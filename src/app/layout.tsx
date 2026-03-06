import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import schema from "../lib/schema.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Markdown Preview – See Your Formatting in Real Time",
  description:
    "Instantly preview your Markdown as you type. Visualise headings, bold, lists, and more with a live side-by-side Markdown preview tool. No sign-up required.",
  keywords: [
    "markdown editor",
    "markdown preview",
    "live markdown",
    "online markdown editor",
    "markdown to html",
    "gfm editor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TZDS82LL');` }} />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="google-site-verification" content="PYgIke_rOI8fOGZuksFShJsiR_wcEGZo5qnR3doAFH8" />
        <link rel="canonical" href="https://markdownpreviewlive.com/" />
        <link rel="author" href="https://www.linkedin.com/in/pintudabhi/" />
        <link rel="publisher" href="https://www.linkedin.com/in/pintudabhi/" />
        <meta name="author" content="Pintu Dabhi" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/icon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TZDS82LL"
            height="0" width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
