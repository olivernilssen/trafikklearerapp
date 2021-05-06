import ThemeVariables from './themeVariables';
import { RUtils } from 'react-native-responsive-component';

import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

const isSmallScreen = () => {
    if (height < 900 && width < 600) {
        return true;
    } else {
        return false;
    }
};

export const small = {
    width: ThemeVariables.BUTTON_WIDTH_SMALL,
};

export const medium = {
    height: ThemeVariables.BUTTON_HEIGTH_MEDIUM,
    width: ThemeVariables.BUTTON_WIDTH_MEDIUM,
};

export const largeWidt = {
    height: ThemeVariables.BUTTON_HEIGHT_EXTRA_LARGE,
    width: ThemeVariables.BUTTON_WIDTH_LARGE,
};

export const rounded = {
    borderRadius: 10,
};

export const round = {
    borderRadius: 50,
};

export const startScreen = {
    width: isSmallScreen()
        ? ThemeVariables.BUTTON_WIDTH_EXTRA_LARGE
        : ThemeVariables.BUTTON_WIDTH_LARGE,
    height: isSmallScreen()
        ? ThemeVariables.BUTTON_HEIGHT_MEDIUM
        : ThemeVariables.BUTTON_HEIGHT_LARGE,
    ...rounded,
};

export const smallRounded = {
    ...small,
    ...rounded,
};

export const mediumRounded = {
    ...medium,
    ...rounded,
};

export const largeWidthRounded = {
    ...largeWidt,
    ...rounded,
};

export const sketchHeaderButton = {
    height: isSmallScreen() ? 45 : 62,
    width: isSmallScreen() ? 45 : 62,
    ...round,
};

export const sketchHeaderButtonSmall = {
    height: isSmallScreen() ? 26 : 32,
    width: isSmallScreen() ? 26 : 32,
    ...round,
};
