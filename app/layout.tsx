import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="mx-auto my-8">
          <div className="container">
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </div>
        </section>
      </body>
    </html>
  );
}
