import { create } from 'zustand';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '@/lib/api/fakestore';

const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  categories: [],
  searchTerm: '',
  selectedCategory: 'all',
  isLoading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const products = await fetchProducts();
      set({ 
        products,
        filteredProducts: products,
        isLoading: false
      });
    } catch (error) {
      set({ 
        error: error.message || 'Failed to fetch products',
        isLoading: false
      });
    }
  },
  
  fetchCategories: async () => {
    try {
      const categories = await fetchCategories();
      set({ categories });
    } catch (error) {
      set({ error: error.message || 'Failed to fetch categories' });
    }
  },
  
  setSearchTerm: (searchTerm) => {
    set({ searchTerm });
    get().filterProducts();
  },
  
  setCategory: async (category) => {
   
    if (get().selectedCategory === category) {
      set({ selectedCategory: "" });
    }
  
    set({ selectedCategory: category, isLoading: true });
  
    try {
      let filteredProducts;
      if (category === "all") {
        filteredProducts = get().products;
      } else {
        filteredProducts = await fetchProductsByCategory(category);
      }
  
      set({
        filteredProducts,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.message || "Failed to filter by category",
        isLoading: false,
      });
    }
  },
  
  
  filterProducts: () => {
    const { products, searchTerm, selectedCategory } = get();
    
    let filtered = products;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    set({ filteredProducts: filtered });
  }
}));

export default useProductStore;