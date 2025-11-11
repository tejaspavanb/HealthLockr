import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HealthLockr",
  description: "Secure, consent-based medical record access",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
