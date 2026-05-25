import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "prostore",
  description: "A modern ecommerce platform built with Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
