import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { artisans, products } from '@/data/mockDb';

export async function GET() {
  try {
    // 1. Create Artisans Table
    await sql`
      CREATE TABLE IF NOT EXISTS artisans (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL
      );
    `;

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

    // 3. Clear existing data
    await sql`DELETE FROM products`;
    await sql`DELETE FROM artisans`;

    // 4. Seed Artisans
    for (const a of artisans) {
      await sql`
        INSERT INTO artisans (id, name, location, bio)
        VALUES (${a.id}, ${a.name}, ${a.location}, ${a.bio})
        ON CONFLICT (id) DO NOTHING;
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

    return NextResponse.json({ message: 'Database seeded successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
