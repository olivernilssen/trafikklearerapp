import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../styles';

const PencilSizePopup = (props) => {
    // const pencilSizeButton = (pencilThickness) => {
    const { pencilThickness, buttonID, pencilThicknessID } = props;

    return (
        <View
            style={
                buttonID === pencilThicknessID
                    ? [styles.iconPlacement, { backgroundColor: Colors.header }]
                    : styles.iconPlacement
            }>
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
