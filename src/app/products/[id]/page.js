"use client";

import {use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchProduct, deleteProduct } from "@/lib/api/fakestore";
import useAuthStore from "@/store/authStore";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  Badge,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

export default function ProductDetail({ params }) {
  const router = useRouter();
  const resolvedParams = use(params); 
  const { id } = resolvedParams;
  const { isAuthenticated,user } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to fetch product details");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setIsDeleting(true);
    try {
      await deleteProduct(id);
      alert('The product has been successfully removed.');
      toaster.create({
        description: "The product has been successfully removed.",
        type: "success",
      });
      router.push("/products");
    } catch (err) {
      setError(err.message || "Failed to delete product");
      setIsDeleting(false);
    }
  };

  if (!isAuthenticated) {
       return (
      <Box as={Link} href="/login"  display="flex" 
      alignItems="center" 
      justifyContent="center" 
      height="50vh">
        <Text fontSize="lg" color="blue" textDecoration="underline">Please login to view product</Text>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return <Text color="red.500" textAlign="center" py={10}>{error}</Text>;
  }

  if (!product) {
    return <Text textAlign="center" py={10}>Product not found</Text>;
  }
  const isAdmin = user?.id === 1;
  return (
    <Box maxW="6xl" mx="auto" py={10} px={6}>
      <Button as={Link} href="/products" variant="link" colorScheme="blue" mb={4}>
        &larr; Back to Products
      </Button>

      <Box bg="white" borderRadius="lg" shadow="lg" overflow="hidden">
        <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
          {/* Product Image */}
          <Flex align="center" justify="center" p={6}>
            <Box position="relative" w="full" h="300px">
              <Image src={product.image} alt={product.title} fill className="object-contain" />
            </Box>
          </Flex>

          {/* Product Details */}
          <Box p={6}>
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="lg">{product.title}</Heading>
              <Badge colorScheme="purple" fontSize="lg">{product.category}</Badge>
            </Flex>

            {/* Ratings */}
            <Flex align="center" mb={4}>
              {[...Array(5)].map((_, i) => (
                <Box key={i} color={i < Math.round(product.rating.rate) ? "yellow.400" : "gray.300"}>
                  ★
                </Box>
              ))}
              <Text ml={2} color="gray.600">
                {product.rating.rate} ({product.rating.count} reviews)
              </Text>
            </Flex>

            {/* Price */}
            <Text fontSize="2xl" fontWeight="bold" color="blue.500" mb={4}>
              ${product.price.toFixed(2)}
            </Text>

            {/* Description */}
            <Box mb={6}>
              <Heading size="md" mb={2}>Description</Heading>
              <Text color="gray.700">{product.description}</Text>
            </Box>

            {/* Action Buttons */}
            {isAdmin && (
            <Flex gap={4}>
              <Button as={Link} href={`/products/${id}/edit`} colorScheme="blue">
                Edit Product
              </Button>
              <Button
                onClick={handleDelete}
                colorScheme="red"
                loading={isDeleting}
                loadingText="Deleting..."
                
          spinnerPlacement="end"
              >
                Delete Product
              </Button>
            </Flex>
          )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
