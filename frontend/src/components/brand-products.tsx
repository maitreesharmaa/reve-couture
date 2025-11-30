'use client';

import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { AddToCartButton } from '@/components/add-to-cart-button';

interface BrandProductsProps {
  slug: string;
  products: Array<{ name: string; description: string; price: number }>;
  title: string;
  blurb: string;
}

export function BrandProducts({ slug, products, title, blurb }: BrandProductsProps) {
  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-24">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-cursive text-accent">{title}</h1>
        <Link href="/" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Back to brands
        </Link>
      </header>

      <p className="mb-10 max-w-2xl text-gray-600 dark:text-gray-400">{blurb}</p>

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
                    brand={title}
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