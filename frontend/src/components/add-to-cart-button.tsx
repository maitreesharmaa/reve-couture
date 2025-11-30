'use client';

import { useCart } from '@/components/providers/cart-provider';
import { useToast } from '@/components/providers/toast-provider';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  brand: string;
  price: number;
  image: string;
  className?: string;
}

export function AddToCartButton({
  productId,
  productName,
  brand,
  price,
  image,
  className = ''
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      className={`w-full bg-accent text-accent-foreground py-3 rounded-md hover:bg-accent/90 transition-colors ${className}`}
      onClick={() => {
        addToCart({
          id: productId,
          name: productName,
          brand,
          price,
          image
        });
      }}
    >
      Add to Cart
    </button>
  );
}