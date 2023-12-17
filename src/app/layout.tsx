import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import AuthContextWrapper from "@/components/navbar/AuthContextWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto app",
  description: "Дневник для криптовалюты",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NextTopLoader color="#f72d2d" showSpinner={false} />
        <AuthContextWrapper>
          <>
            <Navbar />
            <div>{children}</div>
          </>
        </AuthContextWrapper>
      </body>
    </html>
  );
}
