"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function WebchatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" richColors />
        <Header />
        <main className="container min-h-[calc(100vh-268px)]"> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
