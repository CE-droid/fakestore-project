import axios from 'axios';
import useAuthStore from '@/store/authStore';

const baseURL = 'https://fakestoreapi.com';
const api = axios.create({ baseURL });

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await api.get('/products/categories');
  return response.data;
};

export const fetchProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
};

export const login = async (username, password) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const createProduct = async (productData) => {
  const user = useAuthStore.getState().user;
  
  // Check if user is admin (ID 1)
  if (user?.id !== 1) {
    throw new Error('Only admin users can create products');
  }
  const response = await api.post('/products', productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const user = useAuthStore.getState().user;
  
  // Check if user is admin (ID 1)
  if (user?.id !== 1) {
    throw new Error('Only admin users can update a product');
  }
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const user = useAuthStore.getState().user;
  
  // Check if user is admin (ID 1)
  if (user?.id !== 1) {
    throw new Error('Only admin users can delete a product');
  }
  const response = await api.delete(`/products/${id}`);
  return response.data;
};