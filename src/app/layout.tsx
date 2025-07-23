import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContextProvider } from "@/context/ToastContext";
import UseSWRConfigProvider from "@/config/SWRConfig";
import AuthContextProvider from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tracker | Insure All The Way",
  description:
    "Monitor your vehicle’s location, status, and activity in real-time. Stay protected and informed with Insure All The Way’s smart vehicle tracking system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <meta property="og:title" content="Insure All The Way" />
        <meta
          property="og:description"
          content="Monitor your vehicle’s location, status, and activity in real-time. Stay protected and informed with Insure All The Way’s smart vehicle tracking system."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dx3zrhslt/image/upload/v1753282756/logo_uw5idn.png"
        />
        <meta property="og:url" content="https://tracker.insurealltheway.co/" />
        <meta property="og:type" content="website" />

        <meta
          name="twitter:card"
          content="https://res.cloudinary.com/dx3zrhslt/image/upload/v1753282756/logo_uw5idn.png"
        />
        <meta name="twitter:title" content="Insure All The Way" />
        <meta
          name="twitter:description"
          content="Monitor your vehicle’s location, status, and activity in real-time. Stay protected and informed with Insure All The Way’s smart vehicle tracking system."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dx3zrhslt/image/upload/v1753282756/logo_uw5idn.png"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContextProvider>
          <AuthContextProvider>
            <UseSWRConfigProvider>{children}</UseSWRConfigProvider>
          </AuthContextProvider>
        </ToastContextProvider>
      </body>
    </html>
  );
}
