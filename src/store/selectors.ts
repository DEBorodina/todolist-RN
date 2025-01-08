import { Store } from './types';

export const selectUserId = (state: Store) => state.userId;
export const selectSetUserId = (state: Store) => state.setUserId;
export const selectCategories = (state: Store) => state.categories;
export const selectSetCategories = (state: Store) => state.setCategories;
export const selectAddCategory = (state: Store) => state.addCategory;
export const selectTheme = (state: Store) => state.theme;
export const selectSwitchTheme = (state: Store) => state.switchTheme;
export const selectSetTheme = (state: Store) => state.setTheme;
