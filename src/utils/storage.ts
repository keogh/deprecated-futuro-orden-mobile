import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_KEY_PREFIX = '@tufuturo_';

async function storeData(key: string, value: string | object) {
  try {
    let strValue = typeof value === 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(`${BASE_KEY_PREFIX}${key}`, strValue);
  } catch (e) {
    throw new Error('Error while storing data.');
  }
}

async function getData<T>(key: string): Promise<T> {
  let value: string | null | object = null;
  try {
    value = await AsyncStorage.getItem(`${BASE_KEY_PREFIX}${key}`);
    if (value === null) {
      return null as T;
    }

    return JSON.parse(value) as T;
  } catch (e) {
    if (e instanceof SyntaxError) {
      return value as T;
    }
    throw new Error('Error while reading data.');
  }
}

async function removeData(key: string) {
  try {
    await AsyncStorage.removeItem(`${BASE_KEY_PREFIX}${key}`);
  } catch (e) {
    throw new Error('Error while removing data. Try again.');
  }
}

const Storage = {
  getData,
  storeData,
  removeData,
};

export default Storage;
