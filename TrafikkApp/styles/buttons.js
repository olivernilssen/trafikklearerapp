import ThemeVariables from './themeVariables';
import { isSmallScreen } from '../components/helpers/';

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

export const sketchHeaderButton = {
    height: isSmallScreen() ? 43 : 60,
    width: isSmallScreen() ? 43 : 60,
    ...round,
};

export const sketchHeaderButtonSmall = {
    height: isSmallScreen() ? 26 : 32,
    width: isSmallScreen() ? 26 : 32,
    ...round,
};

export const largeWidthRounded = {
    ...largeWidt,
    ...rounded,
};
