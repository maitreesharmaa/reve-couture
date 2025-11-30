'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useOrderHistory } from '@/hooks/useOrderHistory';

export default function ProfilePage() {
  const { orders, getTotalSpent, getOrderCount } = useOrderHistory();
  const [user, setUser] = useState({
    name: 'Jane Doe',
    email: 'jane@example.com',
    profilePhoto: null as string | null,
  });

  const [isSaved, setIsSaved] = useState(false);

  // Load saved profile data on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUser(JSON.parse(savedProfile));
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedUser = { ...user, profilePhoto: e.target?.result as string };
        setUser(updatedUser);
        // Auto-save when photo is uploaded
        localStorage.setItem('userProfile', JSON.stringify(updatedUser));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = () => {
    localStorage.setItem('userProfile', JSON.stringify(user));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-6 py-24">
      <header className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-cursive text-accent">Profile</h1>
        <Link href="/" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Back to Home
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Profile Info */}
        <div className="rounded-xl border border-accent/50 bg-white/60 p-8 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
          <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">Account Information</h2>
          
          <div className="mb-6 flex items-center justify-center">
            <div className="relative">
              {user.profilePhoto ? (
                <Image
                  src={user.profilePhoto}
                  alt="Profile"
                  width={120}
                  height={120}
                  className="h-30 w-30 rounded-full object-cover"
                />
              ) : (
                <div className="h-30 w-30 flex items-center justify-center rounded-full bg-accent/20 text-4xl font-bold text-accent">
                  {user.name.charAt(0)}
                </div>
              )}
              <label className="absolute -bottom-2 -right-2 cursor-pointer rounded-full bg-accent p-2 text-white hover:bg-accent/80">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="mt-1 w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 text-gray-900 dark:text-white focus:border-accent"
              />
            </div>
            <button 
              onClick={handleSaveChanges}
              className={`w-full rounded-lg border border-accent/40 px-4 py-2 text-sm transition-colors ${
                isSaved 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-accent/10 text-accent hover:bg-accent hover:text-white'
              }`}
            >
              {isSaved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Order History */}
        <div className="rounded-xl border border-accent/50 bg-white/60 p-8 shadow-[0_0_0_1px_rgba(192,160,98,0.3)] backdrop-blur-sm dark:bg-gray-900/60">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Order History</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders: {getOrderCount()}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spent: ${getTotalSpent().toFixed(2)}</p>
            </div>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No orders yet</p>
              <Link 
                href="/" 
                className="inline-block rounded-lg bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent/80"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {orders.map((order) => (
                <div key={order.id} className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Order #{order.id.slice(-8)}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-accent font-semibold">${order.total.toFixed(2)}</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}: {order.items.map(item => item.name).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
