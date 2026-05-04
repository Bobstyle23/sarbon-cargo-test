import type { Metadata } from "next";
import Provider from "./provider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sarbon Cargo Dispatcher",
  description: "Dispatcher cargo list redesign test task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
