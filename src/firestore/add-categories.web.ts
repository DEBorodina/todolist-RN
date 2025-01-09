import { addDoc, collection } from 'firebase/firestore';

import { CATEGORIES } from './constants';
import { db } from './initialize.web';
import { BaseCategory } from './types';

export async function addFirestoreCategoryWeb(category: BaseCategory) {
  const citySnapshot = await addDoc(collection(db, CATEGORIES), category);
  return citySnapshot.id;
}

export const addFirestoreCategoriesWeb = async (categories: BaseCategory[]) => {
  await Promise.all(
    categories.map(async category => {
      addFirestoreCategoryWeb(category);
    }),
  );
};
