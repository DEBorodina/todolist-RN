import firestore from '@react-native-firebase/firestore';

import { TASKS } from './constants';
import { BaseTask } from './types';

export const addTask = async (task: BaseTask) => {
  const newTask = await firestore().collection(TASKS).add(task);

  return newTask.id;
};
