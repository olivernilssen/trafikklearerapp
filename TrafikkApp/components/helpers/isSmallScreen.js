import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

const isSmallScreen = () => {
    if (height < 900 && width < 600) {
        return true;
    } else {
        return false;
    }
};

export default isSmallScreen;
