const { db } = require('@vercel/postgres');
require('dotenv').config({ path: '.env.local' });

const artisans = [
  {
    id: 'a1',
    name: 'Earth & Fire Studios',
    location: 'Portland, OR',
    bio: 'Creating handcrafted ceramics that bring warmth to everyday rituals.'
  },
  {
    id: 'a2',
    name: 'Threaded Tales',
    location: 'Asheville, NC',
    bio: 'Sustainable textiles woven on traditional floor looms.'
  },
  {
    id: 'a3',
    name: 'TimberCraft',
    location: 'Burlington, VT',
    bio: 'Reclaimed woodwares hand-carved to stand the test of time.'
  }
];

const products = [
  {
    id: 'p1',
    title: 'Hand-thrown Ceramic Mug',
    price: 28.00,
    description: 'A beautiful, earthy mug glazed in a speckled beige finish. Perfect for your morning coffee or evening tea. Holds approximately 12oz. Microwave and dishwasher safe, though hand-washing is recommended for longevity.',
    imageUrl: '/images/ceramic_mug.png',
    artisanId: 'a1',
    category: 'Ceramics'
  },
  {
    id: 'p2',
    title: 'Woven Cotton Throw',
    price: 85.00,
    description: 'Cozy up with this intricately woven throw blanket made entirely from ethically sourced cotton. Features a subtle geometric pattern and fringed edges. Generously sized at 50" x 60".',
    imageUrl: '/images/cotton_throw.png',
    artisanId: 'a2',
    category: 'Textiles'
  },
  {
    id: 'p3',
    title: 'Olive Wood Serving Board',
    price: 45.00,
    description: 'Elevate your charcuterie game with this stunning olive wood serving board. Each piece features unique grain patterns and natural edges. Finished with food-safe mineral oil.',
    imageUrl: '/images/wood_board.png',
    artisanId: 'a3',
    category: 'Woodwork'
  },
  {
    id: 'p4',
    title: 'Matcha Bowl (Chawan)',
    price: 42.00,
    description: 'A deep, wide-set ceramic bowl traditionally used for preparing and drinking matcha. Features a beautiful, variable glaze transitioning from forest green to earthy brown.',
    imageUrl: '/images/matcha_bowl.png',
    artisanId: 'a1',
    category: 'Ceramics'
  },
  {
    id: 'p5',
    title: 'Hand-carved Wooden Spoons',
    price: 35.00,
    description: 'A set of two hand-carved cooking spoons made from fallen walnut logs. Designed to feel perfectly balanced in the hand. Treated with organic beeswax.',
    imageUrl: '/images/wooden_spoons.png',
    artisanId: 'a3',
    category: 'Woodwork'
  },
  {
    id: 'p6',
    title: 'Linen Market Tote',
    price: 55.00,
    description: 'A heavy-duty, reinforced linen tote bag meant for farmers market hauls or weekend trips. Extra-wide shoulder straps ensure it remains comfortable even when fully loaded.',
    imageUrl: '/images/linen_tote.png',
    artisanId: 'a2',
    category: 'Textiles'
  }
];

async function seedArtisans(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS artisans (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        bio TEXT NOT NULL
      );
    `;

    console.log(`Created "artisans" table`);

    const insertedArtisans = await Promise.all(
      artisans.map(async (artisan) => {
        return client.sql`
        INSERT INTO artisans (id, name, location, bio)
        VALUES (${artisan.id}, ${artisan.name}, ${artisan.location}, ${artisan.bio})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedArtisans.length} artisans`);
    return { createTable, artisans: insertedArtisans };
  } catch (error) {
    console.error('Error seeding artisans:', error);
    throw error;
  }
}

async function seedProducts(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        description TEXT NOT NULL,
        imageUrl VARCHAR(255) NOT NULL,
        artisanId VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "products" table`);

    const insertedProducts = await Promise.all(
      products.map(async (product) => {
        return client.sql`
        INSERT INTO products (id, title, price, description, "imageUrl", "artisanId", category)
        VALUES (${product.id}, ${product.title}, ${product.price}, ${product.description}, ${product.imageUrl}, ${product.artisanId}, ${product.category})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedProducts.length} products`);
    return { createTable, products: insertedProducts };
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedArtisans(client);
  await seedProducts(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
