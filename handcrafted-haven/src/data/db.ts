import { sql } from '@vercel/postgres';

export type Artisan = {
  id: string;
  name: string;
  location: string;
  bio: string;
};

export type Product = {
  id: string;
  title: string;
  price: number;
  description: string;
  imageurl: string; // postgres column names are usually lowercase
  imageUrl?: string; // Fallback for components mapped
  artisanid: string;
  artisanId?: string;
  category: string;
};

export async function getProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql<Product>`SELECT * FROM products ORDER BY title ASC`;
    return rows.map(r => ({
      ...r,
      imageUrl: r.imageurl,
      artisanId: r.artisanid
    }));
  } catch (error) {
    console.error('Database Error:', error);
    // Fallback if db fails to seed/connect
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const { rows } = await sql<Product>`SELECT * FROM products WHERE id = ${id}`;
    if (rows.length === 0) return undefined;
    return {
      ...rows[0],
      imageUrl: rows[0].imageurl,
      artisanId: rows[0].artisanid
    };
  } catch (error) {
    console.error('Database Error:', error);
    return undefined;
  }
}

export async function getArtisanById(id: string): Promise<Artisan | undefined> {
  try {
    const { rows } = await sql<Artisan>`SELECT * FROM artisans WHERE id = ${id}`;
    if (rows.length === 0) return undefined;
    return rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    return undefined;
  }
}

export async function getProductsByArtisan(artisanId: string): Promise<Product[]> {
  try {
    const { rows } = await sql<Product>`SELECT * FROM products WHERE artisanid = ${artisanId}`;
    return rows.map(r => ({
      ...r,
      imageUrl: r.imageurl,
      artisanId: r.artisanid
    }));
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}
