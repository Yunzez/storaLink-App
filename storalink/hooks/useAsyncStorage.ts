
import AsyncStorage from '@react-native-async-storage/async-storage';


export const useAsyncStorage = () => {
     const storeData = async (key: string, value: string) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          // saving error
        }
      };
      const storeDataObject = async (value: any) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('my-key', jsonValue);
        } catch (e) {
          // saving error
        }
      };
    
      const getData = async (key: string) => {
        try {
          const value = await AsyncStorage.getItem(key);
          if (value !== null) {
            // value previously stored
          }
        } catch (e) {
          // error reading value
        }
      };

      const getDataObject = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('my-key');
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
          // error reading value
        }
      };

    return {storeData, getData, getDataObject, storeDataObject}
}

export default useAsyncStorage
