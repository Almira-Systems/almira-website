import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend } from "next/font/google";
import "@/styling/globals.scss";
import { ContextWrapper } from "@/context/wrapper";
import Footer from "./_components/footer";
import Header from "./_components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Almira Systems",
  description: "Almira Systems exists to create software for humanity.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ContextWrapper>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${lexend.variable}`}
      >
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </ContextWrapper>
  );
}
