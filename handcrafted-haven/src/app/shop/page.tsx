import { getProducts, getArtisanById } from '@/data/db';
import Link from 'next/link';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const products = await getProducts();

  // Resolve artisan info
  const productsWithArtisan = await Promise.all(
    products.map(async (p) => {
      const artisan = await getArtisanById(p.artisanId || p.artisanid || '');
      return { ...p, artisanName: artisan?.name || 'Unknown Artisan' };
    })
  );

  return (
    <>
      <Header />

      <main className="shop-main container">
        <h1 className="page-title">Shop Collection</h1>
        <p className="page-subtitle">Browse all artisan handcrafted goods</p>

        <div className="grid shop-grid">
          {productsWithArtisan.map(product => (
            <Link href={`/shop/${product.id}`} key={product.id} className="card shop-card">
              <div 
                className="card-img" 
                style={{ backgroundImage: `url("${product.imageUrl}")` }}
              ></div>
              <div className="card-content">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-price">${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</p>
                <p className="card-author">By {product.artisanName}</p>
              </div>
            </Link>
          ))}
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
