'use client';

import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import { useCart } from '@/components/providers/cart-provider';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 py-24">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-cursive text-accent">Shopping Cart</h1>
        <Link href="/" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Continue Shopping
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-accent/50 bg-white/60 p-4 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60"
              >
                <div className="h-24 w-24 overflow-hidden rounded-lg">
                  <ProductImage
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                    fallbackExtensions={['jpg', 'webp', 'jpeg']}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.brand}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id.toString(), item.quantity - 1)}
                        className="h-8 w-8 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id.toString(), item.quantity + 1)}
                        className="h-8 w-8 rounded-full border border-accent/30 flex items-center justify-center hover:bg-accent/10"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id.toString())}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-accent">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-accent/50 bg-white/60 p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                <span className="text-gray-900 dark:text-white">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-accent/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-accent">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-lg bg-accent px-6 py-3 text-center text-lg font-semibold text-white transition-colors hover:bg-accent/80"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}