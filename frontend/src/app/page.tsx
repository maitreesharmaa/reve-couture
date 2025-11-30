import type { Metadata } from 'next';
import { AnimatedBackground } from '@/components/animated-background';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import Image from 'next/image';
import { CartCount } from '@/components/cart-count';

const brands = [
  { name: 'Gucci', slug: 'gucci', logo: '/logos/gucci.png', logoDark: '/logos/gucci-black.jpeg' },
  { name: 'Louis Vuitton', slug: 'louis-vuitton', logo: '/logos/louis-vuitton.png', logoDark: '/logos/louis-vuitton-black.jpeg' },
  { name: 'Dior', slug: 'dior', logo: '/logos/dior.png', logoDark: '/logos/dior-black.jpeg' },
  { name: 'Prada', slug: 'prada', logo: '/logos/prada.png', logoDark: '/logos/prada-black.png' },
  { name: 'Charlotte Tilbury', slug: 'charlotte-tilbury', logo: '/logos/charlotte-tilbury.svg', logoDark: '/logos/charlotte-tilbury-black.jpeg' },
  { name: 'Christian Louboutin', slug: 'christian-louboutin', logo: '/logos/christian-louboutin.svg', logoDark: '/logos/christian-louboutin-black.jpeg' },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <AnimatedBackground />
      
      <header className="fixed top-0 z-50 flex w-full items-center justify-between border-b border-accent/20 bg-background/80 px-6 py-3 backdrop-blur-sm">
        <Link href="/" className="text-2xl font-cursive text-gray-900 dark:text-white relative">
          <span className="relative z-10">Rêve Couture</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-gray-700 hover:text-accent dark:text-gray-300 relative group">
            Login
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-accent dark:text-gray-300 relative group">
            Sign Up
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/profile" className="text-gray-700 hover:text-accent dark:text-gray-300 relative group">
            Profile
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/cart" className="text-gray-700 hover:text-accent dark:text-gray-300 relative group">
            <CartCount />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      <section className="relative flex flex-col items-center justify-center py-32 text-center">
        {/* Decorative elements */}
        <div className="absolute top-8 left-8 w-16 h-16 border border-accent/60 rotate-45"></div>
        <div className="absolute top-16 right-12 w-8 h-8 bg-accent/50 rounded-full"></div>
        <div className="absolute bottom-16 left-16 w-12 h-12 border-2 border-accent/70 rounded-full"></div>
        <div className="absolute bottom-8 right-8 w-6 h-6 bg-accent/60 rotate-45"></div>
        
        {/* Main content */}
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent"></div>
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
          <h1 className="font-cursive text-6xl font-medium text-gray-900 dark:text-white">
            Define the Moment
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent"></div>
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
          <p className="mt-8 max-w-[42rem] text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
          For the ambitious, the audacious, and the unapologetically you. Discover pieces that are bold, brilliant, and unforgettable as the woman who wears them. 
          </p>
        </div>
      </section>

      <section className="grid w-full max-w-7xl grid-cols-1 gap-6 px-6 pb-32 sm:grid-cols-2 md:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brand/${brand.slug}`}
            className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-xl border border-accent/50 bg-muted p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm transition-all duration-500 hover:bg-accent/10 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 hover:border-accent/80"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-accent/60 group-hover:border-accent/90"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-accent/60 group-hover:border-accent/90"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-accent/60 group-hover:border-accent/90"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-accent/60 group-hover:border-accent/90"></div>
            
            <div className="flex flex-col items-center justify-center relative z-10 h-full">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={brand.slug === 'louis-vuitton' ? 180 : 220}
                height={brand.slug === 'louis-vuitton' ? 60 : 80}
                className="object-contain opacity-90 transition-transform duration-500 group-hover:scale-105 filter brightness-110 contrast-110 mix-blend-screen dark:hidden"
              />
              <Image
                src={brand.logoDark}
                alt={brand.name}
                width={brand.slug === 'louis-vuitton' ? 180 : 220}
                height={brand.slug === 'louis-vuitton' ? 60 : 80}
                className="object-contain opacity-90 transition-transform duration-500 group-hover:scale-105 hidden dark:block dark:filter dark:brightness-110 dark:contrast-110 dark:mix-blend-screen"
              />
              {(brand.slug === 'prada' || brand.slug === 'louis-vuitton' || brand.slug === 'christian-louboutin') && (
                <span className="mt-4 text-center text-sm font-medium tracking-wide text-gray-700 dark:text-white">{brand.name}</span>
              )}
            </div>
            
            {/* Brand names at bottom for Gucci, Dior, Charlotte Tilbury */}
            {(brand.slug === 'gucci' || brand.slug === 'dior' || brand.slug === 'charlotte-tilbury') && (
              <span className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium tracking-wide text-gray-700 dark:text-white z-10">{brand.name}</span>
            )}
            
            {/* Enhanced hover effects */}
            <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Link>
        ))}
      </section>
    </main>
  );
}