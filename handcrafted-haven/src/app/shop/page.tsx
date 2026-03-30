import { products, getArtisanById } from '@/data/mockDb';
import Link from 'next/link';

export default function ShopPage() {
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

      <main className="shop-main container">
        <h1 className="page-title">Shop Collection</h1>
        <p className="page-subtitle">Browse all artisan handcrafted goods</p>

        <div className="grid shop-grid">
          {products.map(product => {
            const artisan = getArtisanById(product.artisanId);
            return (
              <Link href={`/shop/${product.id}`} key={product.id} className="card shop-card">
                <div 
                  className="card-img" 
                  style={{ backgroundImage: `url("${product.imageUrl}")` }}
                ></div>
                <div className="card-content">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-price">${product.price.toFixed(2)}</p>
                  <p className="card-author">By {artisan?.name}</p>
                </div>
              </Link>
            );
          })}
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
