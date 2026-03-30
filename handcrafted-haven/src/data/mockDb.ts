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
  imageUrl: string;
  artisanId: string;
  category: string;
};

export const artisans: Artisan[] = [
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

export const products: Product[] = [
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

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getArtisanById(id: string): Artisan | undefined {
  return artisans.find(a => a.id === id);
}
