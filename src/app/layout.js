import dynamic from "next/dynamic";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from "@/components/ui/sonner";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export const metadata = {
  title: "E-Gallery",
  description: "An website that sells artworks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <div className="max-h-[5vh]">
            <NextTopLoader color="#ef233c" />
            <Navbar />
          </div>
          <div className="min-h-[95vh] pt-[5vh]">{children}</div>
          <Toaster richColors />
        </SessionWrapper>
      </body>
    </html>
  );
}
