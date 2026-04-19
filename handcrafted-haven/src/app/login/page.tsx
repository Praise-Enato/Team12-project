"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [artisanId, setArtisanId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      artisanId,
      password,
    });

    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/artisan-dashboard');
      router.refresh();
    }
  };

  return (
    <div className="container min-h-screen content-center py-20 max-w-md mx-auto">
      <div className="card" style={{ padding: '2rem' }}>
        <h1 className="page-title" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Artisan Login</h1>
        
        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Artisan Username / ID</label>
            <input 
              type="text" 
              value={artisanId}
              onChange={e => setArtisanId(e.target.value)}
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc' }}
              placeholder="e.g. 1"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input" 
              style={{ width: '100%', padding: '0.8rem', border: '1px solid #ccc' }}
              placeholder="artisan123"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Login</button>
        </form>
      </div>
    </div>
  );
}
