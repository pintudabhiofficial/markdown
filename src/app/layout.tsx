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
        <meta name="robots" content="INDEX,FOLLOW" />
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
