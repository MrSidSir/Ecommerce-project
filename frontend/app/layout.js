import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "../src/components/context/CartContext";
import AuthProvider from "../src/components/context/AuthContext";
import Navbar from "../src/components/navbar/Navbar";
import Footer from "../src/components/footer/Footer";

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
          <CartProvider>
           <Navbar />
            <main>{children}</main>
          <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
