import { create } from 'zustand';

import { THEME } from '@constants';
import { Category } from '@firestore';
import { DARK, LIGHT } from '@theme';
import { setAsyncStorageItem } from '@utils';

import { Store } from './types';

export const useStore = create<Store>(set => ({
  categories: [],
  setUserId: (userId: string) => set({ userId }),
  setCategories: (categories: Category[]) => set({ categories }),
  addCategory: (category: Category) =>
    set(({ categories }) => ({ categories: [...categories, category] })),
  switchTheme: () =>
    set(({ theme }) => {
      const newTheme = theme === DARK ? LIGHT : DARK;
      setAsyncStorageItem(newTheme, THEME);
      return { theme: newTheme };
    }),
  setTheme: (theme: typeof LIGHT | typeof DARK) => set({ theme }),
}));
