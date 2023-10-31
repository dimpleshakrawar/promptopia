import type { Metadata } from "next";
import "@/styles/global.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover and share AI prompts ",
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
          <>
            <div className="main">
              <div className="gradient" />
            </div>

            <main className="app">
              <NextTopLoader showSpinner={false} height={5} color="#555555" />
              <Nav />
              {children}
            </main>
          </>
        </Provider>
      </body>
    </html>
  );
}
