'use client';

import { useCart } from '@/components/providers/cart-provider';

export function CartCount() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <span className="relative">
      Cart
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {cartCount}
        </span>
      )}
    </span>
  );
}
