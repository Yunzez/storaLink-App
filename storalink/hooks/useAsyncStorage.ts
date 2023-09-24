import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the methods that will be returned by the hook
type StorageMethods<T> = {
  data: T | null;
  storeData: (value: T) => Promise<void>;
  retrieveData: () => Promise<void>;
  removeData: () => Promise<void>;
};

// Generic hook for using AsyncStorage
export const useAsyncStorage = <T>(key: string, initialValue: T | null = null): StorageMethods<T> => {
  // Local state to hold the data
  const [data, setData] = useState<T | null>(initialValue);

  // Retrieve data from AsyncStorage when the component mounts
  useEffect(() => {
    retrieveData();
  }, []);

  // Method to store data in AsyncStorage
  const storeData = async (value: T) => {
    try {
      // Convert the data to a JSON string and store it
      await AsyncStorage.setItem(key, JSON.stringify(value));
      // Update the local state
      setData(value);
    } catch (e) {
      console.error(`Error saving data to ${key}:`, e);
    }
  };

  // Method to retrieve data from AsyncStorage
  const retrieveData = async () => {
    try {
      // Fetch the data from AsyncStorage
      const value = await AsyncStorage.getItem(key);
      // If data exists, update the local state
      if (value !== null) {
        setData(JSON.parse(value));
      }
    } catch (e) {
      console.error(`Error reading data from ${key}:`, e);
    }
  };

  // Method to remove data from AsyncStorage
  const removeData = async () => {
    try {
      // Remove the data from AsyncStorage
      await AsyncStorage.removeItem(key);
      // Reset the local state
      setData(null);
    } catch (e) {
      console.error(`Error removing data from ${key}:`, e);
    }
  };

  // Return the local data and methods to interact with AsyncStorage
  return {
    data,
    storeData,
    retrieveData,
    removeData,
  };
};
