import { doc, updateDoc } from 'firebase/firestore';

import { TASKS } from './constants';
import { db } from './initialize.web';
import { Task } from './types';

export const updateFirestoreTask = async (task: Task) =>
  await updateDoc(doc(db, TASKS, task.id), task);
