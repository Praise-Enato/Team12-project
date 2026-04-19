import { getProductById, getArtisanById, getReviewsByProduct } from '@/data/db';
import Link from 'next/link';
import Header from '@/components/Header';
import AddToCartButton from '@/components/AddToCartButton';
import ReviewForm from '@/components/ReviewForm';

export const dynamic = 'force-dynamic';

// Next.js convention for dynamic routes
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return (
      <div className="container min-h-screen content-center text-center">
        <h1>Product Not Found</h1>
      </div>
    );
  }

  const artisanId = product.artisanId || product.artisanid || '';
  const artisan = await getArtisanById(artisanId);
  const reviews = await getReviewsByProduct(product.id);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 'No ratings yet';

  return (
    <>
      <Header />

      <main className="product-detail container">
        <Link href="/shop" className="back-link">← Back to Shop</Link>
        
        <div className="product-layout">
          <div 
            className="product-image-large"
            style={{ backgroundImage: `url("${product.imageUrl}")` }}
          ></div>
          
          <div className="product-info">
            <h1 className="product-title">{product.title}</h1>
            <p className="product-price">${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</p>
            <p className="product-rating">⭐ {averageRating} ({reviews.length} reviews)</p>
            <p className="product-author">Handcrafted by <Link href={`/artisans/${artisan?.id}`}>{artisan?.name}</Link></p>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-actions">
              <AddToCartButton product={product as any} />
            </div>
          </div>
        </div>

        <div className="reviews-section" style={{ marginTop: '4rem' }}>
          <h2>Customer Reviews</h2>
          {reviews.length === 0 ? (
            <p style={{ opacity: 0.7, marginTop: '1rem' }}>No reviews yet. Be the first to review this artisan creation!</p>
          ) : (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {reviews.map(r => (
                <div key={r.id} style={{ padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong>{r.user_name}</strong>
                    <span>{"⭐".repeat(r.rating)}</span>
                  </div>
                  <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>{r.comment}</p>
                  <small style={{ color: '#888' }}>{new Date(r.created_at).toLocaleDateString()}</small>
                </div>
              ))}
            </div>
          )}
          <ReviewForm productId={product.id} />
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
