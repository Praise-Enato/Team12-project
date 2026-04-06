"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { itemCount } = useCart();
  const pathname = usePathname();

  return (
    <header className="header internal-header">
      <div className="container header-content">
        <div className="logo">
          <Link aria-label="Handcrafted Haven Home" href="/">Handcrafted Haven</Link>
        </div>
        <nav className="nav-links">
          <Link aria-label="Shop Collection" href="/shop" className={pathname.startsWith('/shop') ? 'active' : ''}>Shop</Link>
          <Link aria-label="Our Story" href="#">Our Story</Link>
          <Link aria-label="View Cart" href="/cart" className={pathname === '/cart' ? 'active' : ''}>Cart ({itemCount})</Link>
        </nav>
      </div>
    </header>
  );
}
