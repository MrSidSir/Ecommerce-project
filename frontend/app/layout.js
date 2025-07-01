import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@/components/context/AuthContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer"; // ✅ import your Footer component here

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommerce Project",
  description: "Fullstack Ecommerce app with Next.js and Node.js backend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />   {/* ✅ added Footer globally here */}
        </AuthProvider>
      </body>
    </html>
  );
}
