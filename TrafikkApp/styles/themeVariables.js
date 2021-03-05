import { RUtils } from 'react-native-responsive-component';

export default {
    // FONTS
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 18,
    FONT_SIZE_LARGE: RUtils.isSmallScreen() ? 20 : 30,

    // ICONS
    ICON_SIZE_SMALL: 25,
    ICON_SIZE_MEDIUM: 40,
    ICON_SIZE_LARGE: RUtils.isSmallScreen() ? 50 : 100,

    // BUTTONS
    BUTTON_WIDTH_SMALL: 80,
    BUTTON_HEIGHT_SMALL: 53,
    BUTTON_WIDTH_MEDIUM: 110,
    BUTTON_HEIGHT_MEDIUM: 80,
    BUTTON_WIDTH_LARGE: RUtils.isSmallScreen() ? 130 : 220,
    BUTTON_HEIGHT_LARGE: RUtils.isSmallScreen() ? 130 : 220,

    // SPACING
    PADDING_SMALL: 5,
    PADDING_MEDIUM: 10,
    PADDING_LARGE: 15,
    MARGIN_SMALL: 5,
    MARGIN_MEDIUM: 10,
    MARGIN_LARGE: 15,
};
