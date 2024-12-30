import firestore from '@react-native-firebase/firestore';

import { TASKS } from './constants';
import { Task } from './types';

export const updateFirestoreTask = async (task: Task) => {
  try {
    await firestore().collection(TASKS).doc(task.id).update(task);
  } catch (e) {
    console.log(task, e);
  }
};
