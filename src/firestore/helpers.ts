import { WhereProps } from './types';

export const byUserId = (id: string): WhereProps => ['userId', '==', id];
export const byCategoryId = (id: string): WhereProps => [
  'categoryId',
  '==',
  id,
];
