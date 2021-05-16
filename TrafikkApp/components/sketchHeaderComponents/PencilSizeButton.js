import React from 'react';
import { StyleSheet, View } from 'react-native';
import { isSmallScreen } from '../helpers';
import { Colors } from '../../styles';

/**
 * Component that displays a pencil size button. The button(s) is displayed in the menu to change between pencolor and pencil size in the sketch screens.
 * @namespace PencilSizeButton
 * @category SketchHeaderComponents
 * @prop {number} pencilThickness Determines the height of the View used for making the "icons" for the pencil thickness buttons
 * @prop {number} buttonID Assigned unique number for the button
 * @prop {number} pencilThicknessID The state pencilThicknessID
 */
const PencilSizeButton = React.memo((props) => {
    const { pencilThickness, buttonID, pencilThicknessID } = props;

    return (
        <View
            style={
                buttonID === pencilThicknessID
                    ? [
                          styles.iconPlacement,
                          { backgroundColor: Colors.headerBg },
                      ]
                    : styles.iconPlacement
            }>
            <View
                style={[styles.sizeIcons, { height: pencilThickness }]}></View>
        </View>
    );
});

const styles = StyleSheet.create({
    iconPlacement: {
        height: isSmallScreen() ? 50 : 60,
        width: isSmallScreen() ? 106 : 160,
        justifyContent: 'center',
        alignItems: 'center',
        margin: -5,
    },
    sizeIcons: {
        width: 60,
        backgroundColor: Colors.pencilThicknessBox,
    },
});

export default PencilSizeButton;
