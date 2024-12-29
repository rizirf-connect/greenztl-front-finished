import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutClient from "@/layouts/client-layout";
import Theme from "@/layouts/theme-provider";
const inter = Inter({ subsets: ["latin"] });
import QueryProvider from "@/providors/react-query";
import ToastProvider from "@/providors/toast";
import ReduxProvider from "@/providors/redux";
import GoogleAnalyticsScript from "@/providors/google-script";

export const metadata: Metadata = {
  title: "GreenzTL - Korean Novels",
  description: "Read your favourite Korean novels reading",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, noarchive" />
        <GoogleAnalyticsScript />
      </head>
      <body className={inter.className}>
        <AntdRegistry>
          <QueryProvider>
            <Theme>
              <ReduxProvider>
                <LayoutClient>
                  {children}
                  <ToastProvider />
                </LayoutClient>
              </ReduxProvider>
            </Theme>
          </QueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
