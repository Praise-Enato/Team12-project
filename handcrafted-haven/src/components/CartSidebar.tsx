"use client";

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, isSidebarOpen, setIsSidebarOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isSidebarOpen) return null;

  return (
    <div className="cart-sidebar-overlay" onClick={() => setIsSidebarOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="Close cart">×</button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="item-details">
                  <h4>{item.product.title}</h4>
                  <p>${item.product.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.product.id)}>Remove</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="checkout-btn btn btn-primary">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
}
