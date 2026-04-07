import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mandi Téo Vigier — Data Scientist & AI Builder",
  description:
    "Portfolio of Mandi Téo Vigier — Data Science student, Co-founder of Neotix AI. Building AI solutions and turning data into actionable insights.",
  keywords: ["Data Science", "Machine Learning", "AI", "Portfolio", "Mandi Vigier"],
  openGraph: {
    title: "Mandi Téo Vigier — Data Scientist & AI Builder",
    description: "Portfolio of Mandi Téo Vigier — Data Science student & AI builder based in Montréal.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
