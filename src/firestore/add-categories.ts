import firestore from '@react-native-firebase/firestore';

import { CATEGORIES } from './constants';
import { BaseCategory } from './types';

export const addCategories = async (categories: BaseCategory[]) => {
  await Promise.all(
    categories.map(async category => {
      addCategory(category);
    }),
  );
};

export const addCategory = async (category: BaseCategory) => {
  const newCategory = await firestore().collection(CATEGORIES).add(category);

  return newCategory.id;
};
