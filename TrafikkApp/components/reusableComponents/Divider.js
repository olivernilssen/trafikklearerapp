import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../styles';

/**
 * Component that displays a divider.
 * @namespace Divider
 * @category ReusableComponents
 * @prop {stylesheetObject} [style] Style of the divider
 * @prop {color} [borderColor] Color of the divider. Default color is black.
 */
const Divider = React.memo((props) => {
    const { style, borderColor } = props;

    return (
        <View style={style}>
            <View style={[styles.divider, { borderColor: borderColor }]}></View>
        </View>
    );
});

const styles = StyleSheet.create({
    divider: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.dividerSecondary,
    },
});

export default Divider;
