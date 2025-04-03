'use client';

import { useEffect, useState } from 'react';
import { 
  Box, Button, Container, Flex, Grid, Heading, 
  Spinner, Stack, Text, Alert, 
} from '@chakra-ui/react';
import useProductStore from '@/store/productStore';
import useAuthStore from '@/store/authStore';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import ProductSearch from '@/components/products/ProductSearch';
import Link from 'next/link';
import { LuPlus } from "react-icons/lu";

const PRODUCTS_PER_PAGE = 8;

export default function ProductsPage() {
  const { 
    filteredProducts, 
    categories, 
    isLoading, 
    error, 
    fetchProducts, 
    fetchCategories 
  } = useProductStore();
  const { isAuthenticated, logout,user } = useAuthStore();
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  useEffect(() => {
    setPage(1);
    setVisibleProducts(filteredProducts.slice(0, PRODUCTS_PER_PAGE));
  }, [filteredProducts]);
  
  const loadMore = () => {
    const nextPage = page + 1;
    const nextProducts = filteredProducts.slice(0, nextPage * PRODUCTS_PER_PAGE);
    setVisibleProducts(nextProducts);
    setPage(nextPage);
  };

  if (!isAuthenticated) {
    return (
      <Box as={Link} href="/login"  display="flex" 
      alignItems="center" 
      justifyContent="center" 
      height="50vh">
        <Text fontSize="lg" color="blue" textDecoration="underline">Please login to view products</Text>
      </Box>
    );
  }
  
  const hasMoreProducts = visibleProducts.length < filteredProducts.length;
  const canAddProduct = user?.id === 1; // Check if user ID is 1
  // console.log("user id",user);
  return (
    <Container maxWidth="container.xl" py={8}>
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        mb={8}
        direction={{ base: "column", md: "row" }}
        gap={4}
      >
        <Heading size="xl">Products</Heading>
        <Stack direction="row" spacing={4}>
        {canAddProduct && ( // Only show Add Product button if user ID is 1
            <Box as={Link} href="/products/new">
              <Button colorScheme="green"><LuPlus /> Add Product</Button>
            </Box>
          )}
        
        </Stack>
      </Flex>
      
      <Box mb={6}>
        <Stack direction={{ base: "column", md: "row" }} spacing={4} mb={4}>
          <Box flex="1">
            <ProductSearch />
          </Box>
          <ProductFilter categories={['all', ...categories]} />
        </Stack>
      </Box>
      
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
      
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" height="300px">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      ) : (
        <>
          <Grid 
            templateColumns={{ 
              base: "repeat(1, 1fr)", 
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)", 
              lg: "repeat(4, 1fr)" 
            }} 
            gap={6}
          >
            {visibleProducts.map(product => (
              <Box key={product.id} height="100%">
                <ProductCard product={product} />
              </Box>
            ))}
            
            {visibleProducts.length === 0 && (
              <Box gridColumn={{ lg: "span 4", md: "span 3", sm: "span 2", base: "span 1" }} textAlign="center" py={10}>
                <Text color="gray.500" fontSize="lg">No products found</Text>
              </Box>
            )}
          </Grid>
          
          {hasMoreProducts && (
            <Box mt={8} textAlign="center">
              <Button colorScheme="blue" onClick={loadMore} size="lg" paddingX={8}>
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}