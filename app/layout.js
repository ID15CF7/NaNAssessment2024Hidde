import { Inter } from "next/font/google";
import "./globals.scss";
import MainLayout from "@/components/MainLayout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Assessment",
  description: "This is an assessment from Not a Number",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
