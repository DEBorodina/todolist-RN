import { Category } from '@firestore';

export type Store = {
  userId?: string;
  setUserId: (userId: string) => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  addCategory: (category: Category) => void;
};
