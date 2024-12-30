import firestore from '@react-native-firebase/firestore';

import { CATEGORIES } from './constants';
import { BaseCategory } from './types';

export const addFirestoreCategories = async (categories: BaseCategory[]) => {
  await Promise.all(
    categories.map(async category => {
      addFirestoreCategory(category);
    }),
  );
};

export const addFirestoreCategory = async (category: BaseCategory) => {
  const newCategory = await firestore().collection(CATEGORIES).add(category);

  return newCategory.id;
};
