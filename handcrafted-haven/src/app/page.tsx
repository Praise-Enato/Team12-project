import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header className="header">
        <div className="container header-content">
          <div className="logo">Handcrafted Haven</div>
          <nav className="nav-links">
            <Link href="/shop">Shop</Link>
            <Link href="#">Artisans</Link>
            <Link href="#">Our Story</Link>
            <Link href="#">Cart (0)</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-wrapper">
            <h1>Discover Unique Artisan Goods</h1>
            <p>Support independent creators and find one-of-a-kind handcrafted items that bring warmth and character to your home.</p>
            <Link href="/shop" className="btn btn-primary">Shop Collection</Link>
          </div>
        </section>

        <section id="shop" className="featured container">
          <h2 className="section-title">Featured Creations</h2>
          <div className="grid">
            {/* Product 1 */}
            <div className="card">
              <div 
                className="card-img" 
                style={{ backgroundImage: 'url("/images/ceramic_mug.png")' }}
              ></div>
              <div className="card-content">
                <h3 className="card-title">Hand-thrown Ceramic Mug</h3>
                <p className="card-price">$28.00</p>
                <p className="card-author">By Earth & Fire Studios</p>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="card">
              <div 
                className="card-img" 
                style={{ backgroundImage: 'url("/images/cotton_throw.png")' }}
              ></div>
              <div className="card-content">
                <h3 className="card-title">Woven Cotton Throw</h3>
                <p className="card-price">$85.00</p>
                <p className="card-author">By Threaded Tales</p>
              </div>
            </div>

            {/* Product 3 */}
            <div className="card">
              <div 
                className="card-img" 
                style={{ backgroundImage: 'url("/images/wood_board.png")' }}
              ></div>
              <div className="card-content">
                <h3 className="card-title">Olive Wood Serving Board</h3>
                <p className="card-price">$45.00</p>
                <p className="card-author">By TimberCraft</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          <p style={{ marginTop: '1rem', fontSize: '0.95rem', opacity: 0.8 }}>W03 Group Project Submission</p>
        </div>
      </footer>
    </>
  );
}
