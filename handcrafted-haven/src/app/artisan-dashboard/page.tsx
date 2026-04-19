import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getArtisanById, getProductsByArtisan } from '@/data/db';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ArtisanDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/login');
  }

  const userId = (session.user as any).id;
  const artisan = await getArtisanById(userId);
  const products = await getProductsByArtisan(userId);

  return (
    <div className="container min-h-screen py-20">
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="page-title">Welcome back, {artisan?.name}</h1>
        <Link href="/api/auth/signout" className="btn btn-primary">Sign Out</Link>
      </div>
      
      <div className="card mt-4" style={{ padding: '2rem' }}>
        <h2>Your Profile</h2>
        <p><strong>Location:</strong> {artisan?.location}</p>
        <p><strong>Bio:</strong> {artisan?.bio}</p>
      </div>

      <h2 className="mt-8 mb-4">Your Products ({products.length})</h2>
      <div className="grid shop-grid">
        {products.map(product => (
          <div key={product.id} className="card shop-card">
             <div 
                className="card-img" 
                style={{ backgroundImage: `url("${product.imageUrl}")` }}
              ></div>
              <div className="card-content">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-price">${typeof product.price === 'string' ? parseFloat(product.price).toFixed(2) : product.price.toFixed(2)}</p>
                <p className="card-author">Category: {product.category}</p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}
