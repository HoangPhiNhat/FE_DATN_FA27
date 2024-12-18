// app/layout.jsx

import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import NavigationBar from "@/components/common/Header/NavigationBar";
import Special from "@/components/common/Special/Special";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";

// CSS
import "./globals.css";
import "slick-carousel/slick/slick.css";
import { TanstackProvider } from "@/providers/TanstackProvider";

export const metadata = {
  title: "NovaThreads",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/LOGO.png" />
      </head>
      <body className="antialiased">
        <TanstackProvider>
          <header>
            <Header />
            <NavigationBar />
          </header>
          <main>
            {/* <Breadcrumbs /> */}
            {children}
          </main>
          <Footer />
          <Special />
        </TanstackProvider>
      </body>
    </html>
  );
}
