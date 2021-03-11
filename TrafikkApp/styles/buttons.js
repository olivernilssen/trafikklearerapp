import ThemeVariables from './themeVariables';

export const small = {
    width: ThemeVariables.BUTTON_WIDTH_SMALL,
};

export const medium = {
    width: ThemeVariables.BUTTON_WIDTH_MEDIUM,
};

export const large = {
    width: ThemeVariables.BUTTON_WIDTH_LARGE,
    height: ThemeVariables.BUTTON_HEIGHT_LARGE,
};

export const largeWidt = {
    height: ThemeVariables.BUTTON_HEIGHT_EXTRA_LARGE,
    width: ThemeVariables.BUTTON_WIDTH_LARGE,
};

export const rounded = {
    borderRadius: 15,
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

export const largeWidthRounded = {
    ...largeWidt,
    ...rounded,
};
