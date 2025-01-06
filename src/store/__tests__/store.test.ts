import { THEME } from '@constants';
import { act, renderHook } from '@test-utils';
import { DARK, LIGHT } from '@theme';
import { setAsyncStorageItem } from '@utils';

import { useStore } from '../store';

jest.mock('@utils', () => ({
  setAsyncStorageItem: jest.fn(),
}));

describe('Zustand Store', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with the correct default state', () => {
    const { result } = renderHook(() => useStore());

    expect(result.current.categories).toEqual([]);
  });

  it('should update userId with setUserId', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setUserId('123');
    });

    expect(result.current.userId).toBe('123');
  });

  it('should update categories with setCategories', () => {
    const { result } = renderHook(() => useStore());

    const categories = [
      {
        id: '1',
        name: 'Work',
        tasksAmount: 5,
        color: '',
        iconName: '',
        userId: '',
      },
    ];

    act(() => {
      result.current.setCategories(categories);
    });

    expect(result.current.categories).toEqual(categories);
  });

  it('should add a new category with addCategory', () => {
    const { result } = renderHook(() => useStore());

    const initialCategory = {
      id: '1',
      name: 'Work',
      tasksAmount: 5,
      color: '',
      iconName: '',
      userId: '',
    };
    const newCategory = {
      id: '2',
      name: 'Play',
      tasksAmount: 5,
      color: '',
      iconName: '',
      userId: '',
    };

    act(() => {
      result.current.setCategories([initialCategory]);
      result.current.addCategory(newCategory);
    });

    expect(result.current.categories).toEqual([initialCategory, newCategory]);
  });

  it('should switch theme correctly and call setAsyncStorageItem', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setTheme(LIGHT);
    });

    act(() => {
      result.current.switchTheme();
    });

    expect(result.current.theme).toBe(DARK);
    expect(setAsyncStorageItem).toHaveBeenCalledWith(DARK, THEME);

    act(() => {
      result.current.switchTheme();
    });

    expect(result.current.theme).toBe(LIGHT);
    expect(setAsyncStorageItem).toHaveBeenCalledWith(LIGHT, THEME);
  });

  it('should set a specific theme with setTheme', () => {
    const { result } = renderHook(() => useStore());

    act(() => {
      result.current.setTheme(DARK);
    });

    expect(result.current.theme).toBe(DARK);

    act(() => {
      result.current.setTheme(LIGHT);
    });

    expect(result.current.theme).toBe(LIGHT);
  });
});
