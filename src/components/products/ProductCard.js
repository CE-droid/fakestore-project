import Link from 'next/link';
import OptimizedImage from './OptimizedImage';


import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  Flex,
  Button
} from '@chakra-ui/react'
import { RiArrowRightLine} from "react-icons/ri"

export default function ProductCard({ product }) {
  return (
    <Box
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      h={'480px'}
      boxShadow={'lg'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      transition="all 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: '2xl'
      }}
      display="flex"
      flexDirection="column"
    >
      <Box 
        position="relative" 
        height="230px" 
        width="100%"
        overflow="hidden"
        borderRadius="lg"
      >
        <OptimizedImage
          src={product.image}
          alt={product.title}
        />
        <Badge 
          position="absolute" 
          top="4" 
          right="4" 
          colorScheme="teal" 
          borderRadius="full" 
          px="2"
        >
          {product.category}
        </Badge>
      </Box>

      <Stack 
        pt={6} 
        align={'center'} 
        spacing={4}
        flex="1"
        justifyContent="space-between"
      >
        <Box textAlign="center">
          <Text 
            color={'gray.500'} 
            fontSize={'sm'} 
            textTransform={'uppercase'}
            fontWeight="semibold"
            letterSpacing="wide"
            mb={2}
          >
            {product.title}
          </Text>
          
          <Text 
            fontWeight={700} 
            fontSize={'2xl'} 
            color={'gray.900'}
          >
            ${product.price.toFixed(2)}
          </Text>
        </Box>
        
        <Flex 
          w="100%" 
          justifyContent="center" 
          mt="auto"
        >
          <Link href={`/products/${product.id}`} style={{ width: '100%' }}>
         
            <Button 
           
                bg="black"
                color="white" 
              size="md"
              width="full"
              fontWeight="medium"
              justifyContent="space-between"
              variant="outline"
              _hover={{
                bg: "gray.800",
                transform: 'translateX(4px)'
              }}
              >
            View Details <RiArrowRightLine />
      </Button>
          </Link>
        </Flex>
      </Stack>
    </Box>
  );
}