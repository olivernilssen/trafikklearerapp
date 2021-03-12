import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';

// import { Colors } from '../../styles';

const PencilSizePopup = (props) => {
    // const pencilSizeButton = (pencilThickness) => {
    return (
        <View style={styles.iconPlacement}>
            <View
                style={{
                    width: 50,
                    height: props.pencilThickness,
                    backgroundColor: 'black',
                }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconPlacement: {
        height: 60,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconSmall: {
        height: 5,
        width: 32,
        backgroundColor: 'black',
    },
    iconMedium: {
        height: 8,
        width: 32,
        backgroundColor: 'black',
    },
    iconBig: {
        height: 11,
        width: 32,
        backgroundColor: 'black',
    },
});

export default PencilSizePopup;
