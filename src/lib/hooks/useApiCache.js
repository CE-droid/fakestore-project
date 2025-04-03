import { useState, useEffect, useCallback } from 'react';

const cache = new Map();

export default function useApiCache(key, fetchFn, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    
    // Check cache first
    if (cache.has(key)) {
      setData(cache.get(key));
      setIsLoading(false);
      return;
    }
    
    try {
      const result = await fetchFn();
      setData(result);
      // Store in cache
      cache.set(key, result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn]);
  
  // Clear cache for specific key
  const invalidateCache = useCallback(() => {
    if (cache.has(key)) {
      cache.delete(key);
    }
  }, [key]);
  
  useEffect(() => {
    fetchData();
  }, [...dependencies, fetchData]);
  
  return { data, isLoading, error, refetch: fetchData, invalidateCache };
}