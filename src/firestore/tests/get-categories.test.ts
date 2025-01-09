import { getFirestoreCategories } from '../get-categories';
import { getFirestoreData } from '../get-data';

jest.mock('../get-data');

jest.mock('@react-native-firebase/firestore', () => () => ({}));

describe('Firestore get categories functions', () => {
  it('should return an empty array when no userId is provided', async () => {
    const result = await getFirestoreCategories(undefined);
    expect(result).toEqual([]);
  });

  it('should return categories with the correct task count', async () => {
    const mockCategories = [
      { id: 'cat1', name: 'Category 1' },
      { id: 'cat2', name: 'Category 2' },
    ];

    const mockTasks1 = [{ categoryId: 'cat1' }, { categoryId: 'cat1' }];
    const mockTasks2 = [{ categoryId: 'cat2' }];

    (getFirestoreData as jest.MockedFunction<typeof getFirestoreData>)
      .mockResolvedValueOnce(mockCategories)
      .mockResolvedValueOnce(mockTasks1)
      .mockResolvedValueOnce(mockTasks2);

    const result = await getFirestoreCategories('validUserId');
    expect(result).toEqual([
      { id: 'cat1', name: 'Category 1', tasksAmount: 2 },
      { id: 'cat2', name: 'Category 2', tasksAmount: 1 },
    ]);
  });
});
