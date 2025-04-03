import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login } from '@/lib/api/fakestore';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const data = await login(username, password);
          set({ 
            token: data.token,
            user: { 
              username,
              id: username === 'johnd' ? 1 : 2 // Assign ID based on username
            },
            isAuthenticated: true,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ 
            error: error.message || 'Login failed',
            isLoading: false
          });
          return false;
        }
      },
      
      logout: () => {
        set({ 
          token: null,
          user: null,
          isAuthenticated: false
        });
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);

export default useAuthStore;