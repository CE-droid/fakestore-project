import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="bg-indigo-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Page Not Found</h2>
          <p className="text-indigo-600 mb-4">
            The page you are looking for does not exist.
          </p>
          <Link
            href="/products"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Go Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}