import type { Metadata } from "next";
import { Manrope, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "A marketplace for unique artisan goods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <CartProvider>
          <header className="navbar container">
            <Link href="/" className="logo">Handcrafted Haven</Link>
            <nav className="nav-links">
              <Link href="/shop">Shop</Link>
              <Link href="/artisans">Artisans</Link>
              <Link href="/about">Our Story</Link>
            </nav>
          </header>
          {children}
          <CartSidebar />
          <footer className="footer">
            <div className="container">
              <p>&copy; 2026 Handcrafted Haven. Celebrating artisanal mastery.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
