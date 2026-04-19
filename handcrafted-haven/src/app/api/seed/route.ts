import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { artisans, products } from '@/data/mockDb';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // 1. Create Artisans Table with Password Hash
    await sql`
      CREATE TABLE IF NOT EXISTS artisans (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL,
        password_hash VARCHAR(255)
      );
    `;

    try {
      await sql`ALTER TABLE artisans ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);`;
    } catch(e) {
       console.log('Column might already exist');
    }

    // 2. Create Products Table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        imageurl VARCHAR(500) NOT NULL,
        artisanid VARCHAR(50) REFERENCES artisans(id),
        category VARCHAR(100) NOT NULL
      );
    `;

    // 3. Create Reviews Table
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        product_id VARCHAR(50) REFERENCES products(id),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // We will not drop the tables anymore since they exist, just insert/update
    const defaultPassword = await bcrypt.hash('artisan123', 10);

    // 4. Seed Artisans
    for (const a of artisans) {
      await sql`
        INSERT INTO artisans (id, name, location, bio, password_hash)
        VALUES (${a.id}, ${a.name}, ${a.location}, ${a.bio}, ${defaultPassword})
        ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash;
      `;
    }

    // 5. Seed Products
    for (const p of products) {
      await sql`
        INSERT INTO products (id, title, price, description, imageurl, artisanid, category)
        VALUES (${p.id}, ${p.title}, ${p.price}, ${p.description}, ${p.imageUrl}, ${p.artisanId}, ${p.category})
        ON CONFLICT (id) DO NOTHING;
      `;
    }

    return NextResponse.json({ message: 'Database seeded successfully with new tables' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
