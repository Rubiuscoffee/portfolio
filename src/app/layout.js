import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { GeistSans } from "geist/font/sans";

import Nav from "@/components/Nav";

export const metadata = {
  title: "NextJS Page Transitions | Codegrid",
  description: "NextJS Page Transitions | Codegrid",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="en" className={GeistSans.variable}>
        <body className={GeistSans.className}>
          <Nav />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
