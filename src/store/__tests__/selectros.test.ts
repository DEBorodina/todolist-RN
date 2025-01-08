import {
  selectAddCategory,
  selectCategories,
  selectSetCategories,
  selectSetTheme,
  selectSetUserId,
  selectSwitchTheme,
  selectTheme,
  selectUserId,
} from '../selectors';
import { Store } from '../types';

const mockStore: Store = {
  userId: '123',
  setUserId: jest.fn(),
  categories: [
    {
      id: '1',
      name: 'Work',
      tasksAmount: 5,
      color: '',
      iconName: '',
      userId: '',
    },
  ],
  setCategories: jest.fn(),
  addCategory: jest.fn(),
  theme: 'LIGHT',
  switchTheme: jest.fn(),
  setTheme: jest.fn(),
};

describe('Zustand Selectors', () => {
  it('selects userId correctly', () => {
    const result = selectUserId(mockStore);
    expect(result).toBe('123');
  });

  it('selects setUserId correctly', () => {
    const result = selectSetUserId(mockStore);
    expect(result).toBe(mockStore.setUserId);
  });

  it('selects categories correctly', () => {
    const result = selectCategories(mockStore);
    expect(result).toEqual([
      {
        id: '1',
        name: 'Work',
        tasksAmount: 5,
        color: '',
        iconName: '',
        userId: '',
      },
    ]);
  });

  it('selects setCategories correctly', () => {
    const result = selectSetCategories(mockStore);
    expect(result).toBe(mockStore.setCategories);
  });

  it('selects addCategory correctly', () => {
    const result = selectAddCategory(mockStore);
    expect(result).toBe(mockStore.addCategory);
  });

  it('selects theme correctly', () => {
    const result = selectTheme(mockStore);
    expect(result).toBe('LIGHT');
  });

  it('selects switchTheme correctly', () => {
    const result = selectSwitchTheme(mockStore);
    expect(result).toBe(mockStore.switchTheme);
  });

  it('selects setTheme correctly', () => {
    const result = selectSetTheme(mockStore);
    expect(result).toBe(mockStore.setTheme);
  });
});
