import { addDoc, collection } from 'firebase/firestore';

import { TASKS } from './constants';
import { db } from './initialize';
import { BaseTask } from './types';

export const addFirestoreTask = async (task: BaseTask) => {
  const newTask = await addDoc(collection(db, TASKS), task);
  return newTask.id;
};
