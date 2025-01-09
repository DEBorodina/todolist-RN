import firestore from '@react-native-firebase/firestore';

import { WhereProps } from './types';

export const getFirestoreData = async <T>(
  collection: string,
  whereProps: WhereProps,
) => {
  const snapshots = await firestore()
    .collection(collection)
    .where(...whereProps)
    .get();

  return snapshots.docs.map(
    snapshot =>
      ({
        id: snapshot.id,
        ...snapshot.data(),
      } as T),
  );
};
