"use client";

import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <>
      <header className="header internal-header">
        <div className="container header-content">
          <div className="logo">
            <Link aria-label="Handcrafted Haven Home" href="/">Handcrafted Haven</Link>
          </div>
          <nav className="nav-links">
            <Link aria-label="Shop Collection" href="/shop">Shop</Link>
            <Link aria-label="Our Story" href="#">Our Story</Link>
            <Link aria-label="View Cart" href="/cart" className="active">Cart ({items.length})</Link>
          </nav>
        </div>
      </header>

      <main className="container shop-main">
        <h1 className="page-title">Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className="not-found">
            <h2>Your cart is empty</h2>
            <Link aria-label="Return to Shop" href="/shop" className="btn btn-primary" style={{ marginTop: '2rem' }}>
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="cart-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginTop: '2rem' }}>
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--color-sand)' }}>
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.title} 
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{item.product.title}</h3>
                    <p style={{ color: 'var(--color-clay)', fontWeight: 'bold', marginBottom: '1rem' }}>
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <label htmlFor={`qty-${item.product.id}`} className="visually-hidden" style={{ display: 'none' }}>Quantity</label>
                      <input 
                        id={`qty-${item.product.id}`}
                        type="number" 
                        min="1" 
                        value={item.quantity} 
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                        style={{ width: '60px', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--color-sand)' }}
                        aria-label={`Quantity of ${item.product.title}`}
                      />
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
                        aria-label={`Remove ${item.product.title} from cart`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
              <button 
                onClick={clearCart} 
                className="btn" 
                style={{ background: 'transparent', border: '1px solid var(--color-clay)', color: 'var(--color-clay)', padding: '0.8rem 2rem' }}
                aria-label="Clear all items from cart"
              >
                Clear Cart
              </button>
            </div>
            
            <div className="cart-summary" style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', height: 'fit-content' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-sand)', paddingBottom: '1rem' }}>Order Summary</h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 'bold', borderTop: '1px solid var(--color-sand)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1.2rem' }} aria-label="Proceed to Checkout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer internal-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
