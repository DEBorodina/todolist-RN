import firestore from '@react-native-firebase/firestore';

import { TASKS } from './constants';

export const deleteTask = async (taskId: string) =>
  await firestore().collection(TASKS).doc(taskId).delete();
