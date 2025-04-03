'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import useAuthStore from '@/store/authStore';
import {
  Box,
  Flex,
  Text,
  Button,
  Container,
  Heading,
  HStack,
  VStack,
 
  Icon,
  ButtonGroup
} from '@chakra-ui/react';
import {
  
  useColorModeValue,
} from "@/components/ui/color-mode";
import { FiShoppingBag, FiLogOut, FiUser } from 'react-icons/fi';

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  // Chakra color mode values
  const headerBg = useColorModeValue("black", "gray.900");
  const headerHoverBg = useColorModeValue("gray.800", "gray.700");
  const activeBg = useColorModeValue("gray.700", "gray.600");
  const footerBg = useColorModeValue("gray.100", "gray.900");
  const footerText = useColorModeValue("gray.600", "gray.400");
  
  return (
    <Flex direction="column" minH="100vh">
      <Box bg={headerBg} color="white" py={4} boxShadow="md">
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Link href="/" passHref>
              <Heading size="lg" cursor="pointer">
                FakeStore
              </Heading>
            </Link>
            
            {isAuthenticated ? (
              <HStack spacing={6}>
                <Text fontSize="sm" display={{ base: 'none', md: 'block' }}>
                  Welcome, <Text as="span" fontWeight="medium">{user?.username}</Text>
                </Text>
                
                <ButtonGroup spacing={3} size="sm">
                  {/* <Link href="/products" passHref>
                    <Button
                      leftIcon={<FiShoppingBag />}
                      variant={pathname.startsWith('/products') ? 'solid' : 'ghost'}
                      bg={pathname.startsWith('/products') ? activeBg : 'transparent'}
                      _hover={{ bg: headerHoverBg }}
                    >
                      Products
                    </Button>
                  </Link> */}
                  <Link href="/login" passHref>
                  <Button
                    leftIcon={<FiLogOut />}
                    onClick={logout}
                    colorScheme="red"
                    variant="solid"
                    size="sm"
                  >
                    Logout
                  </Button>
                  </Link>
                </ButtonGroup>
              </HStack>
            ) : (
              <Link href="/login" passHref>
                <Button
                  leftIcon={<FiUser />}
                  bg={pathname === '/login' ? activeBg : 'transparent'}
                  _hover={{ bg: headerHoverBg }}
                  variant={pathname === '/login' ? 'solid' : 'ghost'}
                  size="sm"
                >
                  Login
                </Button>
              </Link>
            )}
          </Flex>
        </Container>
      </Box>
      
      <Box flex="1" py={8}>
        <Container maxW="container.xl">
          {children}
        </Container>
      </Box>
      
      <Box bg={footerBg} color={footerText} py={8} mt="auto">
        <Container maxW="container.xl">
          <VStack spacing={3}>
            <Text fontSize="sm">
              FakeStore Demo App By Gousmine Cerine &copy; {new Date().getFullYear()}
            </Text>
           
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}