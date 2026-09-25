import Header from "@/components/header";
import "@/styles/globals.scss";
import { type Metadata } from "next";
import { Geist, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import CartWrapper from "./_components/cart_wrapper";
import { Provider } from "jotai";
import { QueryClientWrapper } from "./_components/query_client";

export const metadata: Metadata = {
  title: "AmeriWater Store",
  description: "AmeriWater Store",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const mergeLight = localFont({
  variable: "--font-mergelight",
  src: "../../public/fonts/mergelight/mergelight.otf",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={[
          geist.className,
          openSans.variable,
          mergeLight.variable,
        ].join(" ")}
      >
        <QueryClientWrapper>
          <Provider>
            <CartWrapper>
              <Header />
              {children}
            </CartWrapper>
          </Provider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
