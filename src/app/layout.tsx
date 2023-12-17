import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import AuthContextWrapper from "@/components/navbar/AuthContextWrapper";
import { fetchUser } from "@/actions/userActions";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto app",
  description: "Дневник для криптовалюты",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const checkLogIn = async () => {
    const userExists = await fetchUser();
    if (userExists) {
      return true;
    } else return false;
  };
  const isLoggedIn = await checkLogIn();
  return (
    <html lang="ru">
      <body className={inter.className}>
        <NextTopLoader color="#f72d2d" showSpinner={false} />
        <AuthContextWrapper isLoggedIn={isLoggedIn}>
          <>
            <Navbar />
            <div>{children}</div>
          </>
        </AuthContextWrapper>
      </body>
    </html>
  );
}
