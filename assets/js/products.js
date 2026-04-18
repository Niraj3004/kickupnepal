// ============================================================
//  KickUpNepal – Static Product Database
//  All frontend search, filter, and cart features read from here.
//  Images load from local assets/images/products/
// ============================================================

// Resolve root path depending on whether we're in /pages/ or root
const _r = (() => {
  const p = window.location.pathname;
  return (p.includes('/pages/') || p.includes('\\pages\\')) ? '../' : '';
})();

const _img = (name) => `${_r}assets/images/products/${name}`;

const KUN_PRODUCTS = [
  {
    id: 1, name: "Air Jordan 1 Retro High OG",
    brand: "Jordan", category: "jordan",
    price: 24000, oldPrice: 30000,
    badge: "Restock", badgeType: "sale",
    image: _img('a.png'),
    tags: ["jordan", "air jordan", "retro", "high"], sizes: [7,8,9,10,11],
    description: "The iconic AJ1 High in its most classic colorway. A must-have for every collector."
  },
  {
    id: 2, name: "Air Jordan 1 Low Pink",
    brand: "Jordan", category: "jordan",
    price: 19500, oldPrice: 24000,
    badge: "-20% OFF", badgeType: "sale",
    image: _img('b.png'),
    tags: ["jordan", "air jordan", "low", "pink"], sizes: [6,7,8,9],
    description: "Soft pink colorway on the low-cut AJ1 silhouette. Perfect for casual streetwear."
  },
  {
    id: 3, name: "Air Jordan 4 Retro",
    brand: "Jordan", category: "jordan",
    price: 28000, oldPrice: null,
    badge: "New", badgeType: "new",
    image: _img('c.png'),
    tags: ["jordan", "air jordan", "4", "retro"], sizes: [7,8,9,10,11],
    description: "The Jordan 4, legendary for its unique webbing and mesh panels."
  },
  {
    id: 4, name: "Nike Cloudrunner X Neon Pack",
    brand: "Nike", category: "nike",
    price: 18500, oldPrice: 21500,
    badge: "-15% OFF", badgeType: "sale",
    image: _img('d.png'),
    tags: ["nike", "cloudrunner", "neon", "running"], sizes: [7,8,9,10],
    description: "Gravity-defying comfort with the iconic Neon Pack styling."
  },
  {
    id: 5, name: "Nike Air Force 1 White",
    brand: "Nike", category: "nike",
    price: 14500, oldPrice: null,
    badge: "Classic", badgeType: "exclusive",
    image: _img('e.png'),
    tags: ["nike", "air force", "white", "classic"], sizes: [6,7,8,9,10,11],
    description: "The timeless Nike Air Force 1 in all-white. Versatile and iconic."
  },
  {
    id: 6, name: "Nike Dunk Low Panda",
    brand: "Nike", category: "nike",
    price: 16500, oldPrice: null,
    badge: "New", badgeType: "new",
    image: _img('f.png'),
    tags: ["nike", "dunk", "low", "panda", "black white"], sizes: [7,8,9,10],
    description: "The Dunk Low Panda - the most coveted Nike colourway of the decade."
  },
  {
    id: 7, name: "Yeezy Boost 350 V2 Bone",
    brand: "Adidas", category: "yeezy",
    price: 32000, oldPrice: null,
    badge: "Exclusive", badgeType: "exclusive",
    image: _img('g.png'),
    tags: ["yeezy", "adidas", "boost", "350", "bone"], sizes: [7,8,9,10],
    description: "The most sought-after Yeezy colourway. Primeknit upper, full Boost sole."
  },
  {
    id: 8, name: "Yeezy Slide",
    brand: "Adidas", category: "yeezy",
    price: 12000, oldPrice: 15000,
    badge: "-20% OFF", badgeType: "sale",
    image: _img('h.png'),
    tags: ["yeezy", "adidas", "slide", "sandal"], sizes: [6,7,8,9,10,11],
    description: "The Yeezy Slide injects Kanye's minimalist vision into everyday comfort."
  },
  {
    id: 9, name: "New Balance 550 Cream",
    brand: "New Balance", category: "newbalance",
    price: 16000, oldPrice: null,
    badge: "Trending", badgeType: "exclusive",
    image: _img('i.png'),
    tags: ["new balance", "550", "cream", "lifestyle"], sizes: [7,8,9,10,11],
    description: "Retro basketball silhouette meets modern streetwear. The NB 550 is everywhere."
  },
  {
    id: 10, name: "Asics Apex Utility Titanium",
    brand: "Asics", category: "asics",
    price: 31000, oldPrice: 44000,
    badge: "-30% OFF", badgeType: "sale",
    image: _img('j.png'),
    tags: ["asics", "apex", "utility", "running"], sizes: [8,9,10,11],
    description: "Titanium Apex Utility from Asics. Trail-ready performance, street-ready style."
  },
  {
    id: 11, name: "Essential Oversized Hoodie",
    brand: "KickUpNepal", category: "apparel",
    price: 4500, oldPrice: null,
    badge: "Exclusive", badgeType: "exclusive",
    image: _img('k.png'),
    tags: ["hoodie", "apparel", "oversized", "streetwear"], sizes: ["S","M","L","XL"],
    description: "KickUpNepal's signature oversized hoodie. Heavy 350gsm cotton blend."
  },
  {
    id: 12, name: "Vans Old Skool Black White",
    brand: "Vans", category: "vans",
    price: 9500, oldPrice: null,
    badge: null, badgeType: null,
    image: _img('l.png'),
    tags: ["vans", "old skool", "black", "white", "classic"], sizes: [6,7,8,9,10,11],
    description: "The Vans Old Skool. The original skate shoe that never goes out of style."
  },
  {
    id: 13, name: "New Balance 990v5",
    brand: "New Balance", category: "newbalance",
    price: 22000, oldPrice: null,
    badge: "Premium", badgeType: "exclusive",
    image: _img('m.png'),
    tags: ["new balance", "990", "grey", "premium"], sizes: [7,8,9,10,11],
    description: "Made in USA. The pinnacle of New Balance heritage craftsmanship."
  },
  {
    id: 14, name: "Adidas Samba Classic",
    brand: "Adidas", category: "adidas",
    price: 13500, oldPrice: null,
    badge: "Trending", badgeType: "exclusive",
    image: _img('n.png'),
    tags: ["adidas", "samba", "classic", "lifestyle"], sizes: [6,7,8,9,10],
    description: "The Adidas Samba — from the football pitch to the streets of Thamel."
  },
  {
    id: 15, name: "Jordan 11 Retro Bred",
    brand: "Jordan", category: "jordan",
    price: 38000, oldPrice: null,
    badge: "Rare", badgeType: "exclusive",
    image: _img('o.png'),
    tags: ["jordan", "11", "bred", "retro", "rare"], sizes: [7,8,9,10,11],
    description: "The most iconic Jordan ever made. Black patent leather, carbon fibre plate."
  }
];
