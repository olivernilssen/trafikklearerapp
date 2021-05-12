import React from 'react';
import { StyleSheet, View } from 'react-native';
// import { RUtils } from 'react-native-responsive-component';
import { isSmallScreen } from '../helpers';
import { Colors } from '../../styles';

/**
 * Component for making the pencil size buttons in the sketchColorMenu.
 * @namespace PencilSizeButton
 * @category SketchHeaderComponents
 * @prop {number} pencilThickness Determines the height of the View used for making the "icons" for the pencil thickness buttons
 * @prop {number} buttonID assigned uniq number for the button
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
        height: 60,
        width: isSmallScreen() ? 120 : 160,
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
