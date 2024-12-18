import { Store } from './types';

export const selectUserId = (state: Store) => state.userId;
export const selectSetUserId = (state: Store) => state.setUserId;
