import { create } from 'zustand';

import { Category } from '@firestore';

import { Store } from './types';

export const useStore = create<Store>(set => ({
  categories: [],
  setUserId: (userId: string) => set({ userId }),
  setCategories: (categories: Category[]) => set({ categories }),
  addCategory(category: Category) {
    return set({ categories: [...this.categories, category] });
  },
}));
