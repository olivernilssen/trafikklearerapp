import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

/**
 * Function to check if the device is a phone (small screen) or a tablet (large screen).
 * @memberof Helpers
 * @returns {boolean} If the device has a small screen
 */
const isSmallScreen = () => {
    if (height < 900 && width < 600) {
        return true;
    } else {
        return false;
    }
};

export default isSmallScreen;
