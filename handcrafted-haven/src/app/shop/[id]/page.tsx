import { getProductById, getArtisanById } from '@/data/mockDb';
import Link from 'next/link';

// Next.js convention for dynamic routes
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return (
      <main className="container not-found">
        <h1>Product Not Found</h1>
        <Link href="/shop" className="btn btn-primary">Return to Shop</Link>
      </main>
    );
  }

  const artisan = getArtisanById(product.artisanId);

  return (
    <>
      <header className="header internal-header">
        <div className="container header-content">
          <div className="logo">
            <Link href="/">Handcrafted Haven</Link>
          </div>
          <nav className="nav-links">
            <Link href="/shop" className="active">Shop</Link>
            <Link href="#">Artisans</Link>
            <Link href="#">Our Story</Link>
            <Link href="#">Cart (0)</Link>
          </nav>
        </div>
      </header>

      <main className="product-detail-main container">
        <Link href="/shop" className="back-link">&larr; Back to Shop</Link>
        <div className="product-layout">
          <div className="product-image-container">
            <img src={product.imageUrl} alt={product.title} className="product-image-full" />
          </div>
          <div className="product-info-container">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-artisan">Crafted by {artisan?.name} from {artisan?.location}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <button className="btn btn-primary add-to-cart-btn">Add to Cart</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer internal-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
