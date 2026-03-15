import { Metadata } from "next";
import "./globals.css";
import { Provider } from "./providers";

export const metadata: Metadata = {
  title: "Ultra-Link Analytics",
  description: "Real-time collaborative analytics platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
