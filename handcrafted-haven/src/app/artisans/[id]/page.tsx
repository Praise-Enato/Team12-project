import { getArtisanById, getProductsByArtisan } from '@/data/db';
import Link from 'next/link';
import Header from '@/components/Header';

// Next.js convention for dynamic routes
export default async function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const artisan = await getArtisanById(resolvedParams.id);

  if (!artisan) {
    return (
      <>
        <Header />
        <main className="container not-found">
          <h1>Artisan Not Found</h1>
          <Link href="/shop" className="btn btn-primary" aria-label="Return to Shop">Return to Shop</Link>
        </main>
      </>
    );
  }

  const artisanProducts = await getProductsByArtisan(artisan.id);

  return (
    <>
      <Header />

      <main className="shop-main container" style={{ paddingTop: '4rem' }}>
        <Link href="/shop" className="back-link" aria-label="Back to Shop">&larr; Back to Shop</Link>
        
        <div className="artisan-profile" style={{ marginBottom: '4rem', padding: '3rem', backgroundColor: 'var(--color-cream)', borderRadius: '12px', border: '1px solid var(--color-sand)' }}>
          <h1 className="page-title">{artisan.name}</h1>
          <p className="page-subtitle" style={{ color: 'var(--color-clay)', fontWeight: 'bold' }}>📍 {artisan.location}</p>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginTop: '1.5rem', maxWidth: '800px' }}>
            {artisan.bio}
          </p>
        </div>

        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '2rem', fontSize: '2.5rem' }}>
          Crafted by {artisan.name}
        </h2>

        {artisanProducts.length === 0 ? (
          <p>No products available from this artisan.</p>
        ) : (
          <div className="grid shop-grid">
            {artisanProducts.map(product => (
              <Link href={`/shop/${product.id}`} key={product.id} className="card shop-card" aria-label={`View details of ${product.title}`}>
                <div 
                  className="card-img" 
                  style={{ backgroundImage: `url("${product.imageUrl}")` }}
                  aria-label={product.title}
                  role="img"
                ></div>
                <div className="card-content">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-price">${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
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
