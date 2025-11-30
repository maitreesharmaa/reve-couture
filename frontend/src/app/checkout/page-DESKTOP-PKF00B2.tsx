'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useOrderHistory } from '@/hooks/useOrderHistory';

export default function CheckoutPage() {
  const { addOrder } = useOrderHistory();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Sample cart items - in a real app, this would come from a cart context
  const cartItems = [
    {
      name: 'GG Marmont Matelassé Shoulder Bag',
      brand: 'Gucci',
      price: 1290,
      quantity: 1,
    },
    {
      name: 'Alma BB',
      brand: 'Louis Vuitton',
      price: 1890,
      quantity: 1,
    },
    {
      name: 'Miss Dior Eau de Parfum',
      brand: 'Dior',
      price: 3900,
      quantity: 1,
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 25;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    // Add order to history
    addOrder({
      items: cartItems,
      total: total,
    });

    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="mx-4 max-w-md rounded-xl border border-accent/50 bg-white p-8 text-center shadow-xl dark:bg-gray-900">
          <div className="mb-4 text-6xl">🎉</div>
          <h2 className="mb-4 text-3xl font-cursive text-accent">Congratulations!</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">Your order has been placed successfully!</p>
          <div className="space-y-2">
            <Link
              href="/"
              className="block w-full rounded-lg bg-accent px-4 py-2 text-white transition-colors hover:bg-accent/80"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => setShowSuccess(false)}
              className="block w-full rounded-lg border border-accent/40 px-4 py-2 text-accent transition-colors hover:bg-accent/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-24">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-cursive text-accent">Checkout</h1>
        <Link href="/cart" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Back to Cart
        </Link>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Shipping Information */}
        <div className="rounded-xl border border-accent/50 bg-white/60 p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Shipping Information</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="rounded-xl border border-accent/50 bg-white/60 p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Payment Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                  className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                  className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                required
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl border border-accent/50 bg-white/60 p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-white">$4,180.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-gray-900 dark:text-white">$25.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-white">$336.40</span>
            </div>
            <div className="border-t border-accent/20 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-gray-900 dark:text-white">Total</span>
                <span className="text-2xl font-bold text-accent">$4,541.40</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full rounded-lg bg-accent px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-accent/80"
          >
            Place Order
          </button>
        </div>
      </form>
    </main>
  );
}
