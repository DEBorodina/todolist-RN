import { Category } from '@firestore';
import { DARK, LIGHT } from '@theme';

export type Store = {
  userId?: string;
  setUserId: (userId: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
  theme?: typeof LIGHT | typeof DARK;
  switchTheme: () => void;
  setTheme: (theme: typeof LIGHT | typeof DARK) => void;
};
