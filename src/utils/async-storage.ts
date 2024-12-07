import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageItem = async (value: unknown, key: string) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const getAsyncStorageItem = async (key: string) => {
  const jsonValue = await AsyncStorage.getItem(key);
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeAsyncStorageItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};
