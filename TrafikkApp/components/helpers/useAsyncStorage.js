import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Use of async storage to store the app settings the user changes.
 * @namespace AsyncStorage
 * @category Helpers
 */

/**
 * Save data based on key and value to async storage.
 * @memberof AsyncStorage
 * @param {string} key The key that is stored in the asyncStorage to be updated
 * @param {string} value The value to be saved
 */
const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        // console.log('Data successfully saved to ', key, value);
    } catch (e) {
        console.warn('Failed to save the data to the storage for', key);
    }
};

/**
 * Read data from async storage and return
 * @memberof AsyncStorage
 * @param {string} key The key that is stored in the asyncStorage to be updated
 * @param {function} setValue The state set function for this key
 * @param {string} defaultValue The default value of this key
 */
const readData = async (key, setValue, defaultValue) => {
    try {
        const value = await AsyncStorage.getItem(key);

        if (value == null) {
            saveData(key, defaultValue);
            setValue(defaultValue);
        } else {
            setValue(value);
        }
    } catch (e) {
        console.warn('Failed to fetch the data from storage for key: ', key);
    }
};

/**
 * Clear the entire asyncStorage
 * @memberof AsyncStorage
 */
const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        alert('Storage successfully cleared!');
    } catch (e) {
        alert('Failed to clear the async storage.');
    }
};

export { saveData, readData, clearStorage };
