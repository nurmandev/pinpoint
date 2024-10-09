import AsyncStorage from "@react-native-async-storage/async-storage";

const isObject = (value: any): value is Record<string, any> => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export const storeData = async (
  key: string,
  value: string | object
): Promise<void> => {
  try {
    let valueToStore: string;

    if (isObject(value)) {
      valueToStore = JSON.stringify(value);
    } else if (typeof value === "string") {
      valueToStore = value;
    } else {
      throw new Error("Unsupported value type");
    }

    await AsyncStorage.setItem(key, valueToStore);
  } catch (e) {
    // Handle saving error
    console.error("Error saving data:", e);
  }
};

export const getData = async <T = string>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      if (isJsonString(value)) {
        return JSON.parse(value) as T;
      } else {
        return value as T;
      }
    }

    return null;
  } catch (e) {
    console.error("Error reading data:", e);
    return null;
  }
};

export const removeValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing data:", e);
  }

  console.log("Done.");
};
