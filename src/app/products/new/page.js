'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createProduct } from '@/lib/api/fakestore';
import ProductForm from '@/components/products/ProductForm';
import { 
  Box, 
  Heading, 
  Text, 
  Link as ChakraLink, 
  Alert, 
 
  Container,
  Spinner
} from '@chakra-ui/react';
import { toaster } from '@/components/ui/toaster';

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await createProduct(data);
      alert("Product created successfully!");
      // toaster.create({
      //   description: 'Your product has been successfully created.',
      //   type: 'success',
      // });
      router.push('/products');
    } catch (err) {
      // toaster.create({
      //   description: 'Failed to create product',
      //   type: 'error',
      // });
      alert("Product not created");
      setError(err.message || 'Failed to create product');
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return (
      <Container maxW="container.md" py={10} display="flex" justifyContent="center">
        <Spinner size="xl" />
      </Container>
    );
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
        
        <ProductForm 
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </Box>
    </Container>
  );
}