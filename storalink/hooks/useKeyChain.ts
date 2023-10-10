import * as Keychain from "react-native-keychain";

const useKeyChain =  () => {
  // Store the credentials
  const storeGenericCredentials = async (key: string, value: string) => {
    await Keychain.setGenericPassword(key, value);
  };

  const loadGenericCredentials = async () => {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        console.log(
          "Credentials successfully loaded for user " + credentials.username
        );
      } else {
        console.log("No credentials stored");
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  const resetCredentials = async () => {
    await Keychain.resetGenericPassword();
  }

  return { storeGenericCredentials, loadGenericCredentials, resetCredentials}
};

export default useKeyChain;