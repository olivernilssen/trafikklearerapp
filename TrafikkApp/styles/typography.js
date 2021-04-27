import ThemeVariables from './themeVariables';
import { RUtils } from 'react-native-responsive-component';

export const body = {
    fontSize: ThemeVariables.FONT_SIZE_BODY,
    fontFamily: '',
};

export const button = {
    fontSize: ThemeVariables.FONT_SIZE_BODY,
    fontWeight: 'bold',
    fontFamily: '',
};

export const logoHeading = {
    fontSize: ThemeVariables.FONT_SIZE_HEADING + 3,
    fontFamily: 'Ubuntu-Regular',
};

export const heading = {
    fontSize: ThemeVariables.FONT_SIZE_HEADING,
    fontFamily: 'Ubuntu-Regular',
};

export const section = {
    fontSize: ThemeVariables.FONT_SIZE_SECTION,
    fontFamily: '',
};

export const label = {
    fontSize: ThemeVariables.FONT_SIZE_BODY,
    fontFamily: '',
};

export const startScreenLink = {
    fontSize: RUtils.isSmallScreen()
        ? ThemeVariables.FONT_SIZE_BODY
        : ThemeVariables.FONT_SIZE_SECTION,
};
