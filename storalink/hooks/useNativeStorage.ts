import { NativeModules } from 'react-native';

const useNativeStorage = () => {
    const SharedUserDefaults = NativeModules.SharedUserDefaults;
    const appGroup = "group.com.storalink.app";
  // Save data
  const saveNativeData = (key: string, value: string) => {
    SharedUserDefaults.set(appGroup, key, value);
  };

  // Get data
  const getNativeData = async (key: string) => {
    try{
        const ret =  await SharedUserDefaults.get(appGroup, key);
        return ret
    } catch(e) {
        console.log(e)
    }
  };

  return { saveNativeData, getNativeData };
};

export default useNativeStorage;
