import { deleteDoc, doc } from 'firebase/firestore';

import { TASKS } from './constants';
import { db } from './initialize.web';

export const deleteTask = async (taskId: string) =>
  await deleteDoc(doc(db, TASKS, taskId));
