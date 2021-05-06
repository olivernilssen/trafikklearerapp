import React from 'react';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

export const isSmallScreen = () => {
    if (height < 900 && width < 600) {
        return true;
    } else {
        return false;
    }
};
