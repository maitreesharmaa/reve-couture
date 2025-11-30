import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { Inter, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import { CartProvider } from '@/components/providers/cart-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-cursive',
});

export const metadata: Metadata = {
  title: {
    default: 'Rêve Couture - Luxury Fashion',
    template: '%s | Rêve Couture',
  },
  description: 'Discover the finest in luxury fashion.',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Rêve Couture - Luxury Fashion',
    description: 'Discover the finest in luxury fashion.',
    url: 'http://localhost:3000',
    siteName: 'Rêve Couture',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rêve Couture - Luxury Fashion',
    description: 'Discover the finest in luxury fashion.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <ToastProvider>
              {children}
              <Analytics />
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

