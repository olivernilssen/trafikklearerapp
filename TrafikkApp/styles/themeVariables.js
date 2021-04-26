import { Dimensions } from 'react-native';
import { RUtils } from 'react-native-responsive-component';

const { height, width } = Dimensions.get('window');

export default {
    // FONTS
    FONT_SIZE_BODY: 18,
    FONT_SIZE_SECONDARY: 16,
    FONT_SIZE_HEADING: 30, // RUtils.isSmallScreen() ? 26 : 30,
    FONT_SIZE_SECTION: 22, // RUtils.isSmallScreen() ? 18 : 22,

    // ICONS
    ICON_SIZE_SMALL: RUtils.isSmallScreen() ? 15 : 25,
    ICON_SIZE_MEDIUM: RUtils.isSmallScreen() ? 20 : 30,
    ICON_SIZE_LARGE: RUtils.isSmallScreen() ? 30 : 40,

    // BUTTONS
    BUTTON_WIDTH_SMALL: 80,
    BUTTON_HEIGHT_SMALL: 53,
    BUTTON_WIDTH_MEDIUM: 110,
    BUTTON_HEIGHT_MEDIUM: 80,
    BUTTON_WIDTH_LARGE: width / 3.9, // RUtils.isSmallScreen() ? 120 : 210,
    BUTTON_HEIGHT_LARGE: (height - 80) / 6, // RUtils.isSmallScreen() ? 100 : 190,
    BUTTON_WIDTH_EXTRA_LARGE: width / 2.6,
    BUTTON_HEIGHT_EXTRA_LARGE: height / 5,

    // SPACING
    PADDING_SMALL: 5,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 15,
    MARGIN_SMALL: 5,
    MARGIN_MEDIUM: 10,
    MARGIN_LARGE: 15,
};
