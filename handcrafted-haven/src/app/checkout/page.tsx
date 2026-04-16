import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <main className="container min-h-screen content-center text-center py-20">
      <div className="card max-w-lg mx-auto" style={{ padding: '3rem' }}>
        <h1 className="page-title" style={{ color: 'var(--forest)', marginBottom: '1rem' }}>Order Confirmed!</h1>
        <p className="page-subtitle" style={{ marginBottom: '2rem' }}>
          Thank you for supporting independent artisans. Your handcrafted goods are being lovingly packaged and will ship soon.
        </p>
        <Link href="/shop" className="btn btn-primary" style={{ display: 'inline-block' }}>
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
