import { getProductById, getArtisanById } from '@/data/mockDb';
import Link from 'next/link';
import Header from '@/components/Header';
import AddToCartButton from '@/components/AddToCartButton';

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
      <Header />

      <main className="product-detail-main container">
        <Link href="/shop" className="back-link">&larr; Back to Shop</Link>
        <div className="product-layout">
          <div className="product-image-container">
            <img src={product.imageUrl} alt={product.title} className="product-image-full" />
          </div>
          <div className="product-info-container">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-artisan">
              Crafted by <Link href={`/artisans/${product.artisanId}`} aria-label={`View ${artisan?.name} profile`} style={{ textDecoration: 'underline' }}>{artisan?.name}</Link> from {artisan?.location}
            </p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <AddToCartButton product={product} />
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
