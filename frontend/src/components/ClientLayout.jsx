'use client';
import { SessionProvider } from "next-auth/react";
import LanguageProvider from "./context/LanguageProvider";
import AuthProvider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

export default function ClientLayout({ children }) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </LanguageProvider>
    </SessionProvider>
  );
} 