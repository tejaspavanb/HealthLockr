import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "HealthLockr",
  description: "Secure, consent-based medical record access",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
