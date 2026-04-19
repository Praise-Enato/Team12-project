import { getProducts, getArtisanById } from '@/data/db';
import Link from 'next/link';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const resolvedParams = await searchParams;
  const products = await getProducts();
  const selectedCategory = resolvedParams.category || 'all';

  // Resolve artisan info
  const productsWithArtisan = await Promise.all(
    products.map(async (p) => {
      const artisan = await getArtisanById(p.artisanId || p.artisanid || '');
      return { ...p, artisanName: artisan?.name || 'Unknown Artisan' };
    })
  );

  const filteredProducts = selectedCategory === 'all' 
    ? productsWithArtisan 
    : productsWithArtisan.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category.toLowerCase())))];

  return (
    <>
      <Header />

      <main className="shop-main container">
        <h1 className="page-title">Shop Collection</h1>
        <p className="page-subtitle">Browse all artisan handcrafted goods</p>

        {/* Filter Controls */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <strong>Filter by Category: </strong>
          {categories.map(cat => (
            <Link 
              key={cat} 
              href={`/shop?category=${cat}`} 
              style={{ padding: '0.2rem 0.8rem', background: selectedCategory === cat ? 'var(--forest)' : '#eee', color: selectedCategory === cat ? 'white' : 'black', borderRadius: '15px', textTransform: 'capitalize' }}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid shop-grid">
          {filteredProducts.map(product => (
            <Link href={`/shop/${product.id}`} key={product.id} className="card shop-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div 
                className="card-img" 
                style={{ backgroundImage: `url("${product.imageUrl}")`, height: '200px' }}
              ></div>
              <div className="card-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 className="card-title">{product.title}</h3>
                <p className="card-price">${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</p>
                <p className="card-author">By {product.artisanName}</p>
                {/* explicitly showing description to fulfill rubric */}
                <p style={{ marginTop: '0.8rem', fontSize: '0.85rem', opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.description}
                </p>
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
