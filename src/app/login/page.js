'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Box, Container, Stack, Heading, Text, Input, Button } from '@chakra-ui/react';
import useAuthStore from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm();
  

  const onSubmit = async (data) => {
    const success = await login(data.username, data.password);
    if (success) {
      router.push('/products');
    }
  };
  
  return (
    <Box position={'relative'}>
      <Container maxW={'lg'} py={{ base: 12, md: 24 }} px={{ base: 4, md: 8 }}>
        <Stack bg={'gray.50'} rounded={'xl'} p={{ base: 6, md: 10 }} spacing={6}>
          <Stack spacing={4} align={'center'}>
            <Heading fontSize={{ base: '2xl', sm: '3xl' }} color={'gray.800'}>
              Welcome Back
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              Please sign in to your account
            </Text>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Input
                {...register('username', { required: true })}
                placeholder="Email Address"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{ color: 'gray.500' }}
              />
              {errors.username && <Text color="red.500">Email is required</Text>}
              <Input
                {...register('password', { required: true })}
                type="password"
                placeholder="Password"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{ color: 'gray.500' }}
              />
              {errors.password && <Text color="red.500">Password is required</Text>}
            </Stack>
            {error && <Text color="red.500">{error}</Text>}
            <Button
              w={'full'}
              mt={4}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{ bgGradient: 'linear(to-r, red.400,pink.400)', boxShadow: 'xl' }}
              type="submit"
              loading={isLoading}
              spinnerPlacement="end"
              >
              
               
              Sign In
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
}