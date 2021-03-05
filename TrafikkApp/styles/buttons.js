import ThemeVariables from './themeVariables';

export const small = {
    // paddingHorizontal: 5,
    width: ThemeVariables.BUTTON_WIDTH_SMALL,
};

export const medium = {
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    width: ThemeVariables.BUTTON_WIDTH_MEDIUM,
};

export const large = {
    width: ThemeVariables.BUTTON_WIDTH_LARGE,
    height: ThemeVariables.BUTTON_HEIGHT_LARGE,
};

export const rounded = {
    borderRadius: 25,
};

export const round = {
    borderRadius: 50,
};

export const smallRounded = {
    ...small,
    ...rounded,
};

export const mediumRounded = {
    ...medium,
    ...rounded,
};

export const largeRounded = {
    ...large,
    ...rounded,
};
