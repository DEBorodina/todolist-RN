import {
  addFirestoreCategories,
  addFirestoreCategory,
} from '../add-categories';

const categories = [
  {
    name: 'Category 1',
    color: 'red',
    iconName: 'icon-1',
    userId: 'user-id',
    tasksAmount: 0,
  },
  {
    name: 'Category 2',
    color: 'blue',
    iconName: 'icon-2',
    userId: 'user-id',
    tasksAmount: 0,
  },
];

const mockAdd = jest
  .fn()
  .mockReturnValue(Promise.resolve({ id: 'category-id' }));

jest.mock('@react-native-firebase/firestore', () => () => ({
  collection: jest.fn().mockReturnValue({ add: mockAdd }),
}));

describe('Firestore add category functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('addFirestoreCategories should add all categories', async () => {
    await addFirestoreCategories(categories);

    expect(mockAdd).toHaveBeenCalledTimes(categories.length);

    expect(mockAdd).toHaveBeenCalledWith(categories[0]);
    expect(mockAdd).toHaveBeenCalledWith(categories[1]);
  });

  it('addFirestoreCategory should add a single category and return the ID', async () => {
    const category = categories[0];
    const categoryId = await addFirestoreCategory(category);

    expect(mockAdd).toHaveBeenCalledWith(category);
    expect(categoryId).toBe('category-id');
  });
});
