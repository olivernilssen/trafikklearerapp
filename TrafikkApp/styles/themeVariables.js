import { Dimensions } from 'react-native';
import { RUtils } from 'react-native-responsive-component';

const { height, width } = Dimensions.get('window');

export default {
    // FONTS
    FONT_SIZE_SMALL: 14,
    FONT_SIZE_MEDIUM: 18,
    FONT_SIZE_LARGE: RUtils.isSmallScreen() ? 20 : 30,

    // ICONS
    ICON_SIZE_SMALL: RUtils.isSmallScreen() ? 20 : 30,
    ICON_SIZE_MEDIUM: RUtils.isSmallScreen() ? 30 : 40,
    ICON_SIZE_LARGE: RUtils.isSmallScreen() ? 50 : 100,

    // BUTTONS
    BUTTON_WIDTH_SMALL: 80,
    BUTTON_HEIGHT_SMALL: 53,
    BUTTON_WIDTH_MEDIUM: 110,
    BUTTON_HEIGHT_MEDIUM: 80,
    BUTTON_WIDTH_LARGE: width / 4, // RUtils.isSmallScreen() ? 120 : 210,
    BUTTON_HEIGHT_LARGE: height / 6.9, // RUtils.isSmallScreen() ? 100 : 190,
    BUTTON_HEIGHT_EXTRA_LARGE: height / 5,

    // SPACING
    PADDING_SMALL: 5,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 15,
    MARGIN_SMALL: 5,
    MARGIN_MEDIUM: 10,
    MARGIN_LARGE: 15,
};
