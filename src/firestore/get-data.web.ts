import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from './initialize';
import { WhereProps } from './types';

export const getFirestoreData = async <T>(
  collectionName: string,
  whereProps: WhereProps,
) => {
  const dataQuery = query(collection(db, collectionName), where(...whereProps));
  const snapshots = await getDocs(dataQuery);

  return snapshots.docs.map(
    snapshot =>
      ({
        id: snapshot.id,
        ...snapshot.data(),
      } as T),
  );
};
