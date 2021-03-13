import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

import { Colors } from '../../styles';

const PencilSizePopup = (props) => {
    // const pencilSizeButton = (pencilThickness) => {
    return (
        <View style={styles.iconPlacement}>
            <View
                style={{
                    width: 50,
                    height: props.pencilThickness,
                    backgroundColor: Colors.pencilThicknessBox,
                }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconPlacement: {
        height: 60,
        width: 135,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default PencilSizePopup;
