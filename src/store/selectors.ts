import { Store } from './types';

export const selectUserId = (state: Store) => state.userId;
export const selectSetUserId = (state: Store) => state.setUserId;
export const selectCategories = (state: Store) => state.categories;
export const selectSetCategories = (state: Store) => state.setCategories;
export const selectAddCategory = (state: Store) => state.addCategory;
