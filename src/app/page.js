'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/products');
    } else {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to FakeStore</h1>
      <p className="text-xl">Redirecting...</p>
    </div>
  );
}