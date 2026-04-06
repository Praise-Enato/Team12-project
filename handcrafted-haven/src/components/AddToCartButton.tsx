"use client";

import { Product } from '@/data/mockDb';
import { useCart } from '@/context/CartContext';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  
  return (
    <button 
      className="btn btn-primary add-to-cart-btn"
      onClick={() => addToCart(product)}
      aria-label={`Add ${product.title} to cart`}
    >
      Add to Cart
    </button>
  );
}
