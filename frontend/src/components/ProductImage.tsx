'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallbackExtensions?: string[];
}

export default function ProductImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  fallbackExtensions = ['jpg', 'webp', 'jpeg']
}: ProductImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [currentExtensionIndex, setCurrentExtensionIndex] = useState(0);

  const handleError = () => {
    if (currentExtensionIndex < fallbackExtensions.length) {
      const baseSrc = src.replace(/\.[^/.]+$/, ''); // Remove current extension
      const newSrc = `${baseSrc}.${fallbackExtensions[currentExtensionIndex]}`;
      setCurrentSrc(newSrc);
      setCurrentExtensionIndex(prev => prev + 1);
    }
  };

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  );
}
