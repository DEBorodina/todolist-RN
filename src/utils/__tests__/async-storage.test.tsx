import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getAsyncStorageItem,
  removeAsyncStorageItem,
  setAsyncStorageItem,
} from '../async-storage';

describe('Async Storage Utils', () => {
  const key = 'testKey';
  const value = { test: 'data' };
  const jsonValue = JSON.stringify(value);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('setAsyncStorageItem should store data in AsyncStorage', async () => {
    await setAsyncStorageItem(value, key);

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, jsonValue);
  });

  test('getAsyncStorageItem should retrieve data from AsyncStorage', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(jsonValue);

    const result = await getAsyncStorageItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toEqual(value);
  });

  test('getAsyncStorageItem should return null if no value found', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const result = await getAsyncStorageItem(key);

    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
    expect(result).toBeNull();
  });

  test('removeAsyncStorageItem should remove item from AsyncStorage', async () => {
    await removeAsyncStorageItem(key);

    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });
});
