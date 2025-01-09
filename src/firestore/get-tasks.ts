import { TASKS } from './constants';
import { getFirestoreData } from './get-data';
import { byUserId } from './helpers';
import { Task } from './types';

export const getFirestoreTasks = async (userId: string | undefined) => {
  if (!userId) {
    return [];
  }

  const tasks = await getFirestoreData<Task>(TASKS, byUserId(userId));

  return tasks;
};
