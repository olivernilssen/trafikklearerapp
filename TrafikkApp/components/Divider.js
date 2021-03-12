import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = React.memo((props) => (
    <View style={props.style}>
        <View
            style={[styles.divider, { borderColor: props.borderColor }]}></View>
    </View>
));

const styles = StyleSheet.create({
    divider: {
        flex: 1,
        borderWidth: 1,
    },
});

export default Divider;
