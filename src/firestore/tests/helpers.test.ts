import { getFirestoreData } from '../get-data';
import { byCategoryId, byUserId } from '../helpers';
import { WhereProps } from '../types';

const mockUserId = 'testUserId';
const mockData = [
  { id: 'doc1', userId: mockUserId, data: 'value1' },
  { id: 'doc2', userId: 'differentUserId', data: 'value2' },
];
const expectedWhereProps = ['userId', '==', mockUserId] as WhereProps;

const mockGet = jest.fn(() =>
  Promise.resolve({ docs: [{ data: () => mockData[0], id: 'doc1' }] }),
);
const mockWhere = jest.fn(() => ({
  get: mockGet,
}));

jest.mock('@react-native-firebase/firestore', () => () => {
  return {
    collection: jest.fn(() => ({
      where: mockWhere,
    })),
  };
});

describe('getFirestoreData', () => {
  it('should retrieve data from a collection with a filter', async () => {
    const results = await getFirestoreData<(typeof mockData)[0]>(
      'users',
      expectedWhereProps,
    );

    expect(mockWhere).toHaveBeenCalledWith(...expectedWhereProps);
    expect(results).toEqual([
      { id: 'doc1', userId: mockUserId, data: 'value1' },
    ]);
  });
});

describe('byUserId and byCategoryId', () => {
  it('should create correct whereProps for userId', () => {
    const userId = 'testUserId';

    expect(byUserId(userId)).toEqual(['userId', '==', userId]);
  });

  it('should create correct whereProps for categoryId', () => {
    const categoryId = 'testCategoryId';

    expect(byCategoryId(categoryId)).toEqual(['categoryId', '==', categoryId]);
  });
});
