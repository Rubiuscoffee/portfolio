import "./globals.css";
import * as React from "react";
import { GeistSans } from "geist/font/sans";

import Nav from "@/components/Nav";

export const metadata = {
  title: "NextJS Page Transitions | Codegrid",
  description: "NextJS Page Transitions | Codegrid",
};

export default function RootLayout({ children }) {
  const Wrapper = React.unstable_ViewTransition || React.Fragment;
  return (
    <Wrapper>
      <html lang="en" className={GeistSans.variable}>
        <body className={GeistSans.className}>
          <Nav />
          {children}
        </body>
      </html>
    </Wrapper>
  );
}
