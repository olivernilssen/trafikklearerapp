import React, { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    SectionList,
    Dimensions,
    Modal,
} from 'react-native';
import { fareSkilt, forbudsSkilt } from '../../assets/sign_descriptions';

const ImagePopup = ({ props }) => {
    const { selectedItem } = props;

    if (selectedItem !== null) {
        return (
            <Image
                key={itemKey}
                style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                }}
                source={fareSkilt[selectedItem].source}
            />
        );
    }
};

export default ImagePopup;
