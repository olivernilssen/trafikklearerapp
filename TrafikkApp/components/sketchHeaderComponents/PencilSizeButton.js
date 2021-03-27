import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../styles';

/** Component for making the pencil size buttons in the sketchColorMenu
 * @namespace PencilSizeButton
 * @memberof sketchHeaderComponents
 * @prop {number} pencilThickness Determines the height of the View used for making the "icons" for the pencil thickness buttons
 * @prop {number} buttonID assigned uniq number for the button
 * @prop {number} pencilThicknessID The state pencilThicknessID
 */
const PencilSizeButton = (props) => {
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
                    width: 60,
                    height: pencilThickness,
                    backgroundColor: Colors.pencilThicknessBox,
                }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconPlacement: {
        height: 60,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        margin: -5,
    },
});

export default PencilSizeButton;
