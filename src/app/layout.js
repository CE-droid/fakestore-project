// app/layout.js
import { Inter } from 'next/font/google';
import MainLayout from '@/components/layout/MainLayout';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { Provider } from "@/components/ui/provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'FakeStore - Next.js Demo',
  description: 'A demo e-commerce store built with Next.js and fakestoreapi.com',
};

export default function RootLayout({ children }) {
  
  return (
    <html suppressHydrationWarning >
    <body  suppressHydrationWarning className={inter.className}>
      <ErrorBoundary>
      <Provider>
        <MainLayout>
         
          {children}
          
        </MainLayout>
        </Provider>
      </ErrorBoundary>
    </body>
  </html>
  );
}