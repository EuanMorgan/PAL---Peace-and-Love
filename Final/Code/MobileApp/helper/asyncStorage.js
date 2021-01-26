import AsyncStorage from "@react-native-community/async-storage";

/**
 * This is the helper wrapping up react-native-community/async-storage.
 * AsyncStorage library is An asynchronous, persistent, key-value storage system for React Native.
 * @tutorial https://github.com/react-native-community/async-storage
 * @param props
 */

const asyncStorage = (props) => {

  const KEY ={
    LAST_LOCATION_LATITUDE : "LAST_LOCATION_LATITUDE",
    LAST_LOCATION_LONGITUDE : "LAST_LOCATION_LONGITUDE"
  };

  /**
   * Store data into AsyncStorage
   * @param key
   * @param value
   * @returns {Promise<void>}
   */
  const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key,value);
    } catch (e) {
      // saving error
    }
  };

  /**
   * Get data from AsyncStorage
   * @param {KEY} key The key in key-value pair
   * @returns {Promise<void>}
   */
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
};

export default asyncStorage;

