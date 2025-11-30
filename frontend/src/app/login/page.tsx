'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder – wire to backend later
    alert(`Logged in as ${email}`);
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-6 py-24">
      <div className="mb-4">
        <Link href="/" className="text-sm text-gray-600 hover:text-accent dark:text-gray-400">
          ← Back to Home
        </Link>
      </div>
      <h1 className="mb-8 text-center font-cursive text-4xl text-accent">Rêve Couture</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-accent/30 bg-white/60 p-6 shadow-[0_0_0_1px_rgba(192,160,98,0.15)] backdrop-blur-sm dark:bg-gray-900/60">
        <div>
          <label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 outline-none placeholder:text-gray-500 focus:border-accent"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm text-gray-600 dark:text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-lg border border-accent/30 bg-transparent px-3 py-2 outline-none placeholder:text-gray-500 focus:border-accent"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="w-full rounded-lg border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white">Sign in</button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          New here? <Link className="text-accent hover:underline" href="/signup">Create an account</Link>
        </p>
      </form>
    </main>
  );
}


