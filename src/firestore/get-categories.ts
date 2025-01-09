import { CATEGORIES, TASKS } from './constants';
import { getFirestoreData } from './get-data';
import { byCategoryId, byUserId } from './helpers';
import { Category } from './types';

export const getFirestoreCategories = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  const categories = await getFirestoreData<Category>(
    CATEGORIES,
    byUserId(userId),
  );

  await Promise.all(
    categories.map(async category => {
      const tasks = await getFirestoreData(TASKS, byCategoryId(category.id));
      category.tasksAmount = tasks.length;
    }),
  );

  return categories;
};
