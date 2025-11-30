'use client';

import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/add-to-cart-button';

const brandCopy: Record<string, { title: string; blurb: string }> = {
  'gucci': {
    title: 'Gucci',
    blurb: 'Follow trends? We prefer to invent them. Welcome to the House of Gucci.',
  },
  'louis-vuitton': {
    title: 'Louis Vuitton',
    blurb: 'Your journey deserves a legendary companion. Carry an icon, become a legend.',
  },
  'dior': { 
    title: 'Dior', 
    blurb: 'This isn\'t just couture, mon chéri. It\'s the art of making every day a fairytale.' 
  },
  'prada': { 
    title: 'Prada', 
    blurb: 'They say the devil wears Prada for a reason. It\'s because she has impeccable taste and a point to prove.' 
  },
  'charlotte-tilbury': {
    title: 'Charlotte Tilbury',
    blurb: 'Darlings, it\'s not makeup. It\'s red-carpet magic in a bottle.',
  },
  'christian-louboutin': {
    title: 'Christian Louboutin',
    blurb: 'Our philosophy? Keep your heels high, and your standards higher.',
  },
};

const productData: Record<string, Array<{ name: string; description: string; price: number }>> = {
  'gucci': [
    { name: 'GG Marmont Matelassé Shoulder Bag', description: 'The iconic chevron leather bag that announces your arrival before you do.', price: 1290 },
    { name: 'Ophidia GG Shoulder Bag', description: 'A timeless tribute to the House\'s heritage, remixed for today\'s icon.', price: 650 },
    { name: 'Gucci Horsebit 1995 Mini Bag', description: 'The classic Horsebit, electrified with a daring chain for a rebellious edge.', price: 1890 },
    { name: 'Loafers with Horsebit', description: 'The legendary loafer, redefined with a feminine edge for the woman who walks her own path.', price: 890 },
    { name: 'G-Timeless Watch, 29mm', description: 'Adorn your wrist with sparkling diamonds and a touch of iconic Gucci magic.', price: 980 },
    { name: 'Flora Gorgeous Gardenia Eau de Parfum', description: 'A delicious potion of joy that makes every day a walk in a secret garden.', price: 450 }
  ],
  'louis-vuitton': [
    { name: 'Alma BB', description: 'The quintessential Parisian chic, this compact icon carries a legacy of elegance in its unmistakable shape.', price: 1890 },
    { name: 'Nano Speedy', description: 'A miniature masterpiece, this tiny Speedy packs a powerful punch of feminine charm and iconic style.', price: 1290 },
    { name: 'Neverfull MM', description: 'The legendary carry-all, reborn in supple embossed leather for a look of audacious, understated luxury.', price: 1890 },
    { name: 'Tambour Street Diver Watch ', description: 'A fusion of high fashion and high function, this is the timepiece for the adventurer who never compromises on style.', price: 1090 },
    { name: 'Idylle Blossom Twist Bracelet', description: ' An eternal bloom for your wrist, this delicate bracelet intertwines iconic Monogram Flowers with dazzling diamonds.', price: 1890 },
    { name: 'Idylle Blossom Sautoir Necklace', description: 'Adorn yourself in a cascade of diamond-pavé Monogram Flowers for an unforgettable statement of modern femininity.', price: 2890 }
  ],
  'dior': [
    { name: 'Miss Dior Eau de Parfum', description: 'A declaration of love in a bottle—a vibrant, modern floral scent wrapped in a couture bow.', price: 3900 },
    { name: 'Dior Backstage Glow Face Palette', description: 'The secret of runway makeup artists, designed to give your skin an instant, buildable, red-carpet glow.', price: 3200 },
    { name: 'Dior Addict Shine Lipstick', description: 'A flash of sensational color and hydra-shine that dresses your lips in pure, couture elegance.', price: 890 },
    { name: 'Diorshow 5 Couleurs Eyeshadow Palette', description: 'Dress your eyes in a wardrobe of high-pigment, long-wearing shades inspired by the iconic Miss Dior.', price: 2700 },
    { name: 'Rouge Blush', description: 'The ultimate couture touch—a buildable, ultra-pigmented blush that gives cheeks a bold, long-lasting flush.', price: 2400 },
    { name: 'Dior Forever Skin Correct', description: 'Your all-in-one secret weapon for a flawless complexion that lasts from morning to midnight.', price: 650 }
  ],
  'prada': [
    { name: 'Galleria Saffiano Leather Bag', description: 'The ultimate power accessory, this bag\'s timeless silhouette in iconic Saffiano leather means business.', price: 1290 },
    { name: 'Paradoxe Eau de Parfum', description: 'A celebration of the multi-dimensional woman—a timeless floral fragrance, redefined by an avant-garde edge.', price: 1890 },
    { name: 'Hyper Matte Lipstick', description: 'Dress your lips in a single, powerful swipe of rich, comfortable, and undeniably Prada color.', price: 890 },
    { name: 'Satin Mini-Bag with Crystals', description: 'A jewel for your shoulder—sumptuous satin and a crystal-adorned logo make this the star of any evening.', price: 2200 },
    { name: 'Buckle Leather Handbag', description: 'A modern masterpiece of soft nappa leather and bold buckle details, designed for the woman who sets the trends.', price: 1090 },
    { name: 'Suede Platform Sandals', description: 'Elevate your perspective with these lush suede platforms, blending 70s glamour with modern Prada sophistication.', price: 1890 }
  ],
  'charlotte-tilbury': [
    { name: 'Matte Revolution-Wedding Belles', description: 'A collector\'s jewel that bestows a dreamy, rose-bud pink kiss of confidence for your most unforgettable moments.', price: 65 },
    { name: 'Matte Revolution-Pillow Talk', description: 'The legendary nude-pink that started it all, giving your lips an instantly fuller, wider, and more irresistible look.', price: 38 },
    { name: 'Pillow Talk Multi-Glow Highlighter', description: ' A divine, diamond-like highlighter that catches the light for an ethereal, red-carpet glow.', price: 55 },
    { name: 'Airbrush Flawless Finish Powder', description: 'The celebrity secret for poreless, flawless-looking skin, this powder feels like cashmere and acts like a filter.', price: 58 },
    { name: 'The Rebel Luxury Palette', description: 'A divine wardrobe of 9 dreamy, super-pigmented shades to create a mesmerizing gaze for any occasion, from daytime chic to evening glamour.', price: 45 },
    { name: 'Airbrush Flawless Setting Spray', description: ' Lock in your look with a legend. This weightless spray ensures your makeup stays flawless from dusk \'til dawn.', price: 49 }
  ],
  'christian-louboutin': [
    { name: 'Kate Pump - 100 mm', description: ' The quintessential power pump, engineered with a dramatic arch to lengthen your legs and elevate your entire attitude.', price: 995 },
    { name: 'Movida Jane - 130 mm', description: 'A bold statement of retro glamour and modern confidence, designed to lift you far above the crowd.', price: 645 },
    { name: 'Condora Slipper', description: ' Channel your inner ballerina with these exquisite satin pumps, wrapped in a delicate ribbon for a touch of romantic drama.', price: 795 },
    { name: 'Follies Strass Pump - 100 mm', description: 'A true fairytale shoe, hand-adorned with sparkling crystals for a dazzling, unforgettable entrance', price: 695 },
    { name: 'Loubi54 Clutch', description: 'Sophistication in your grasp—this sleek clutch, crowned with the iconic CL monogram, is the perfect evening companion.', price: 595 },
    { name: 'Cabarock Small Tote Bag', description: 'A blend of soft elegance and audacious signature details, this tote is for the woman who is both polished and powerful.', price: 845 }
  ]
};

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const copy = brandCopy[slug];
  if (!copy) return notFound();

  const products = productData[slug] || [];

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-24">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-cursive text-accent">{copy.title}</h1>
        <Link href="/" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Back to brands
        </Link>
      </header>

      <p className="mb-10 max-w-2xl text-gray-600 dark:text-gray-400">{copy.blurb}</p>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product, index) => (
          <div
            key={`${slug}-${index + 1}`}
            className="flip-card h-80 cursor-pointer"
          >
            <div className="flip-card-inner">
              {/* Front of card */}
              <div className="flip-card-front border border-accent/50 bg-white/60 p-5 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
                <div className="mb-4 aspect-[4/3] w-full rounded-lg overflow-hidden">
                  <ProductImage
                    src={`/products/${slug}/product${index + 1}.png`}
                    alt={product.name}
                    width={300}
                    height={225}
                    className={`h-full w-full ${
                      slug === 'charlotte-tilbury' && index === 0 ? 'object-contain scale-125' :
                      slug === 'charlotte-tilbury' ? 'object-contain scale-110' :
                      slug === 'prada' && (index === 1 || index === 2) ? 'object-contain scale-110' :
                      slug === 'christian-louboutin' && index === 2 ? 'object-contain scale-115' :
                      slug === 'christian-louboutin' ? 'object-contain scale-105' :
                      slug === 'gucci' && index === 1 ? 'object-contain scale-105' :
                      slug === 'gucci' && index === 0 ? 'object-left object-cover' :
                      slug === 'louis-vuitton' && (index === 0 || index === 2) ? 'object-contain scale-105' :
                      slug === 'louis-vuitton' && index === 5 ? 'object-cover' :
                      'object-cover'
                    }`}
                    fallbackExtensions={['jpg', 'webp', 'jpeg']}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 dark:text-white">{product.name}</h3>
                  <span className="text-accent font-semibold">${product.price}</span>
                </div>
              </div>

              {/* Back of card */}
              <div className="flip-card-back border border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5 p-5 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm">
                <div className="flex h-full flex-col justify-center text-center">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="mb-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                  <div className="text-accent font-bold text-lg">${product.price}</div>
                  <AddToCartButton
                    productId={`${slug}-${index + 1}`}
                    productName={product.name}
                    brand={copy.title}
                    price={product.price}
                    image={`/products/${slug}/product${index + 1}.png`}
                    className="mt-4 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}


