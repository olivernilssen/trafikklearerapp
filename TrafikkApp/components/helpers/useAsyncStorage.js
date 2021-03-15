import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data based on key and value to async storage
 * @param {string} key
 * @param {string} value
 */
const saveData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Data successfully saved to ', key, value);
    } catch (e) {
        console.warn('Failed to save the data to the storage to ', key);
    }
};

/**
 * Read data from async storage and return
 * @param {string} key
 * @returns value from Asyncstorage
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
