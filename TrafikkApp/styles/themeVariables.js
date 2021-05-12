import { Dimensions } from 'react-native';
import { isSmallScreen } from '../components/helpers';

const { height, width } = Dimensions.get('window');

export default {
    // FONTS
    FONT_SIZE_BODY: isSmallScreen() ? 15 : 18,
    FONT_SIZE_SECONDARY: 16,
    FONT_SIZE_HEADING: isSmallScreen() ? 23 : 30, // RUtils.isSmallScreen() ? 26 : 30,
    FONT_SIZE_SECTION: isSmallScreen() ? 18 : 22, // RUtils.isSmallScreen() ? 18 : 22,

    // ICONS
    ICON_SIZE_SMALL: isSmallScreen() ? 15 : 25,
    ICON_SIZE_MEDIUM: isSmallScreen() ? 20 : 30,
    ICON_SIZE_LARGE: isSmallScreen() ? 30 : 40,
    ICON_SIZE_LARGER: isSmallScreen() ? 40 : 50,
    ICON_SIZE_XLARGE: isSmallScreen() ? 50 : 60,

    // BUTTONS
    BUTTON_WIDTH_SMALL: 80,
    BUTTON_HEIGHT_SMALL: 53,
    BUTTON_WIDTH_MEDIUM: 110,
    BUTTON_HEIGHT_MEDIUM: (height - (isSmallScreen() ? 60 : 80)) / 10,
    BUTTON_WIDTH_LARGE: width / 3.9, // RUtils.isSmallScreen() ? 120 : 210,
    BUTTON_HEIGHT_LARGE: (height - (isSmallScreen() ? 60 : 80)) / 6, // RUtils.isSmallScreen() ? 100 : 190,
    BUTTON_WIDTH_EXTRA_LARGE: width / 2.8,
    BUTTON_HEIGHT_EXTRA_LARGE: height / 5,

    // SPACING
    PADDING_SMALL: 5,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 15,
    MARGIN_SMALL: 5,
    MARGIN_MEDIUM: 10,
    MARGIN_LARGE: 15,
};
