'use client';

import { use,useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchProduct, updateProduct } from '@/lib/api/fakestore';
import ProductForm from '@/components/products/ProductForm';
import useAuthStore from '@/store/authStore';
import { 
  Box, 
  Heading, 
  Text, 
  Link as ChakraLink, 
  Alert, 
 
  Container,
  Spinner
} from '@chakra-ui/react';
export default function EditProductPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); 
  const { id } = resolvedParams;
  const { isAuthenticated } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch product details');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      getProduct();
    }
  }, [id]);
  
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
   
    try {
      await updateProduct(id, data);
      alert("Product updated successfully!");
      router.push(`/products/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update product');
      setIsSubmitting(false);
      alert("Failed to update product");
   
    }
  };
  
  if (!isAuthenticated) {
    return (
      <Box as={Link} href="/login"  display="flex" 
      alignItems="center" 
      justifyContent="center" 
      height="50vh">
        <Text fontSize="lg" color="blue" textDecoration="underline">Please login to edit product</Text>
      </Box>
    );
  }
  
  if (isLoading) {
    return <div className="container mx-auto px-4 py-10 text-center">Loading product details...</div>;
  }
  
  if (error && !product) {
    return <div className="container mx-auto px-4 py-10 text-center text-red-500">{error}</div>;
  }
  
  return (
    <Container maxW="container.md" py={10}>
    <Box mb={6}>
      <ChakraLink as={Link} href="/products" color="blue.500" _hover={{ color: 'blue.700' }}>
        &larr; Back to Products
      </ChakraLink>
    </Box>
      
     
    <Box 
        maxW="xl" 
        mx="auto" 
        bg="white" 
        p={6} 
        rounded="lg" 
        shadow="md"
        borderWidth="1px"
        borderColor="gray.100"
      >
        <Heading as="h1" size="lg" mb={6}>
          Create New Product
        </Heading>
        
        {error && (
          <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>Erros</Alert.Title>
        <Alert.Description>
        {error}
        </Alert.Description>
      </Alert.Content>
    </Alert.Root>
        )}
        
        
        {product && (
          <ProductForm 
            product={product}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
        </Box>
        </Container>
  );
}