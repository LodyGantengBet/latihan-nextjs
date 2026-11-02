import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EventKu",
  description: "Katalog dan pemesanan tiket event sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col">
        <Navbar />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {children}
        </main>

        <footer className="border-t py-4 text-center text-sm text-gray-500">
          EventKu · dibuat di kelas Junior Web Developer
        </footer>
      </body>
    </html>
  );
}
