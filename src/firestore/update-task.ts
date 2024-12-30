import firestore from '@react-native-firebase/firestore';

import { TASKS } from './constants';
import { Task } from './types';

export const updateTask = async (task: Task) =>
  await firestore().collection(TASKS).doc(task.id).update(task);
