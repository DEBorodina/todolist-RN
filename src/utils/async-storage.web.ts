export const setAsyncStorageItem = async (value: unknown, key: string) => {
  const jsonValue = JSON.stringify(value);
  await Promise.resolve(localStorage.setItem(key, jsonValue));
};

export const getAsyncStorageItem = async (key: string) => {
  const jsonValue = await Promise.resolve(localStorage.getItem(key));
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const removeAsyncStorageItem = async (key: string) => {
  await Promise.resolve(localStorage.removeItem(key));
};
